'use strict';
require('regenerator/runtime');

import NetworkClient from './RabbitMQClient';
import PartialMessageStorage from './PartialMessageStorage';
import {
    log,
    toNetworkMessage,
    fromNetworkMessage,
    StringFormat,
    getJsonMsg,
    getJsonObject
}
from './FunctionUtils';
import * as Message from './MessageDef';

const MsgResponse = require('./../enum/MsgResponse');
const RoutingType = require('./../enum/RoutingType');
const BroadcastKey = require('./../enum/BroadcastKey');
const MessageType = require('./../enum/MessageType');
const Global = require('./../enum/Global');

let network = null,
    that = null,
    PendingRequest = {},
    RetryCount = 0,
    ListPartial = {},
    IsForceLogout = false,
    LastReceiveTime = new Date(),
    CheckNetworkStatus = null,
    IsTimeOut = false,
    networkTimeout = 30 * 1000;

export default class NetworkManager {

    constructor() {
        that = this;
        network = new NetworkClient();
        network.onConnectError = that.onConnectError;
        network.onConnected = that.onConnected;
        network.onReceiveMessage = that.onReceiveMessage;
    }

    isConnecting() {
        return network.isConnected;
    }

    connectMe(requestKey, loginMessage) {
        try {
            loginMessage.SendingTopic = that.routingMessage(loginMessage.MessageType);
            loginMessage.RequestKey = requestKey;
            network.connect(loginMessage);
        } catch (e) {
            console.error(e);
        }
    }

    logoutMe(forceLogout) {
        try {
            IsForceLogout = forceLogout;
            if (network != null)
                network.disconnect();
            if (CheckNetworkStatus != null) {
                clearInterval(CheckNetworkStatus);
                CheckNetworkStatus = null;
            }
        } catch (e) {
            console.error(e);
        }
    }

    reconnectMe(timeout) {
        try {
            if (IsForceLogout === true) return;
            RetryCount += 1;
            log('Ket noi lai do mat ket noi');
            if (timeout && timeout > 0) {
                setTimeout(function() {
                    if (network)
                        network.reconnect();
                }, timeout);
            } else {
                if (network)
                    network.reconnect();
            }

        } catch (e) {
            console.error(e);
        }
    }

    disconnectMe() {
        try {
            if (network != null)
                network.disconnect();
            if (CheckNetworkStatus != null) {
                clearInterval(CheckNetworkStatus);
                CheckNetworkStatus = null;
            }
        } catch (e) {
            console.error(e);
        }
    }

    updateDefaultQueue() {
        try {
            if (Global.WorkingQueue == null || Global.WorkingQueue.length <= 0) {
                return false;
            }
            network.updateQueue(Global.WorkingQueue);
            return network.getChangedQueue();
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    receiveTopic() {
        return network.receiveTopic;
    }

    sendRequestMessage(requestKey, objRequest) {
        try {
            if (requestKey == null || requestKey.length <= 0) {
                console.error('Invalid request key');
                return;
            }
            //update msg info
            objRequest.RequestKey = requestKey;
            if (Global.LoggedInUserInfo)
                objRequest.SenderUserId = Global.LoggedInUserInfo.UserId;
            if (Global.LoggedInMemberInfo)
                objRequest.SenderMemberId = Global.LoggedInMemberInfo.MemberId;
            const topic = that.routingMessage(objRequest.MessageType);
            if (topic == null || topic.length <= 0) return;
            objRequest.SendingTopic = topic;
            if (!network.getChangedQueue())
                objRequest.TemporaryTopic = network.getReceiveTopic();

            const isOk = that.doSendMessage(topic, objRequest, objRequest.Ttl);
            if (!isOk && that.reProcessResponse) {
                that.reProcessResponse(requestKey, 'The connection is disconnected - Fail to send message: ' + objRequest.$type);
            }
        } catch (e) {
            console.error(e);
        }
    }

    doSendMessage(topic, message, ttl) {
        const body = toNetworkMessage(message);
        return network.sendMessage(topic, body, ttl);
    }

    onConnected() {
        try {
            if (!that.processBroadcast) return;
            RetryCount = 0;
            that.processBroadcast(BroadcastKey.NetworkStatus, new Message.NetworkStatusBroadcast(true));
            if (CheckNetworkStatus != null) {
                clearInterval(CheckNetworkStatus);
                CheckNetworkStatus = null;
            }
            //thuc hien gui lai yeu cau khi ket noi tro lai
            if (PendingRequest != null) {
                for (let item in PendingRequest) {
                    let req = PendingRequest[item].Request;
                    that.doSendMessage(req.SendingTopic, req, req.Ttl);
                }
            }
            return;
            CheckNetworkStatus = setInterval(function() {
                if (!network.getConnected()) {
                    clearInterval(CheckNetworkStatus);
                    return;
                }
                const diff = DateTime.timeDiff(new Date(), LastReceiveTime);
                if (diff > networkTimeout) {
                    if (!IsTimeOut) {
                        that.processBroadcast(BroadcastKey.NetworkStatus, new Message.NetworkStatusBroadcast(false));
                    }
                    IsTimeOut = true;
                    that.reconnectMe();
                } else {
                    if (IsTimeOut) {
                        that.processBroadcast(BroadcastKey.NetworkStatus, new Message.NetworkStatusBroadcast(true));
                    }
                    IsTimeOut = false;
                }
            }, networkTimeout);
        } catch (e) {
            console.error(e);
        }
    }

    onDisConnected() {
        try {
            if (!that.processBroadcast) return;
            const networkerStatus = new Message.NetworkStatusBroadcast(false);
            that.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
        } catch (e) {
            console.error(e);
        }
    }

    onConnectError(msg) {
        try {
            if (!that.processBroadcast) return;
            const networkerStatus = new Message.NetworkStatusBroadcast(false);
            networkerStatus.Reason = '';
            if (typeof msg === 'string') {
                if (msg.indexOf('Lost connection to') >= 0) {
                    networkerStatus.Reason = BroadcastKey.ErrorConnect;
                    networkerStatus.RetryCount = RetryCount;
                    that.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
                }
                if (network.isNotLogedOn()) {
                    return; //khong tu dong connect lai trong truong hop nay
                }
            } else {
                if (msg.body.indexOf('Access refused for user') >= 0 || msg.body.indexOf('ACCESS_REFUSED - access to queue') >= 0) {
                    networkerStatus.Reason = BroadcastKey.ErrorUserPassword;
                    that.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
                    return;
                } else if (msg.body.indexOf('connection_closing') >= 0 //connection bi close
                    || msg.body.indexOf('The server has canceled a subscription') >= 0 //queue bi xoa khi dang lam viec
                ) {
                    networkerStatus.Reason = BroadcastKey.ForceUserLogout; //-> day nguoi dung ra
                    that.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
                    return;
                } else if (msg.body.indexOf('NOT_FOUND - no queue') >= 0 // khong co queue temporary hay queue lam viec
                    || msg.body.indexOf('NS_ERROR_') >= 0 //loi cua firefox khong the tao duoc moi truong theo cau tinh
                ) {
                    networkerStatus.Reason = BroadcastKey.ForceUserLogoutWithoutConfirm; //-> day nguoi dung ra
                    that.processBroadcast(BroadcastKey.NetworkStatus, networkerStatus);
                    return;
                }
            }
            if (CheckNetworkStatus != null) {
                clearInterval(CheckNetworkStatus);
                CheckNetworkStatus = null;
            }
            that.reconnectMe(networkTimeout / 10); // 1 phan 10 khoang thoi gian cho timeout
        } catch (e) {
            console.error(e);
        }
    }

    onReceiveMessage(recvMessage) {
        try {
            LastReceiveTime = new Date();
            let objectData = fromNetworkMessage(recvMessage);
            if (objectData == null) {
                console.error('Can not parse message: ' + recvMessage);
                return;
            }
            if (objectData.$type === MsgResponse.PartialMessage) {
                //check if is PartialMessage then process joiner
                let storage = ListPartial[objectData.MainRequestKey];
                if (storage == null) {
                    storage = new PartialMessageStorage(objectData.Count);
                }
                const isFull = storage.appendMessage(objectData.RawMessage, objectData.Index, objectData.Count);
                if (isFull === true) {
                  let mainRequestKey=objectData.MainRequestKey;
                    objectData = getJsonObject(storage.getMessageData());
                    delete ListPartial[mainRequestKey];
                } else if (isFull === false) {
                    ListPartial[objectData.MainRequestKey] = storage;
                    return;
                } else if (isFull == null) {
                    delete ListPartial[objectData.MainRequestKey];
                    return;
                } else {
                    return;
                }
            }
            if (objectData == null || !that.processMessage) return;
            that.processMessage(objectData);
        } catch (e) {
            console.error(e);
        }
    }

    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    newGUID() {
        // then to call it, plus stitch in '4' in the third group
        const guid = (that.S4() + that.S4() + that.S4() + '4' + that.S4().substr(0, 3) + that.S4() + that.S4() + that.S4() + that.S4()).toLowerCase();
        return guid;
    }

    genarateKey(reqType) {
        let head = 'req';
        if (reqType === RoutingType.Memory)
            head = 'mem';
        else if (reqType === RoutingType.Broadcast)
            head = 'brd';
        const guid = that.newGUID();
        return StringFormat('{0}_{1}', head, guid);
    }

    getRequestType(dataKey) {
        if (dataKey == null || dataKey.length < 20)
            return RoutingType.Broadcast;
        const head = dataKey.substr(0, 3);
        if (head === 'req')
            return RoutingType.Request;
        if (head === 'mem')
            return RoutingType.Memory;
        return RoutingType.Broadcast;
    }

    routingMessage(msgType) {
        const exchange = network.getExchange();
        var workerType='';
        switch (msgType) {
          case MessageType.User:
            workerType='user';
            break;
          case MessageType.Database:
            workerType='database';
            break;
          case MessageType.System:
            workerType='system';
            break;
          case MessageType.AccountManager:
            workerType='account';
            break;
          case MessageType.PreTrade:
            workerType='pre-trade';
            break;
          case MessageType.Session:
            workerType='session';
            break;
          case MessageType.Risk:
            workerType='risk';
            break;
          case MessageType.DealingManager:
            workerType='dealing';
            break;
          case MessageType.DataProvider:
            workerType='data-provider';
            break;
          case MessageType.Dealing:
            workerType='dealing';
            break;
          case MessageType.LocalExchange:
            workerType='exchange';
            break;
          case MessageType.PostTradeManager:
            workerType='post-trade';
            break;
          case MessageType.LocalExchange:
            workerType='exchange';
            break;
          case MessageType.TaskManager:
            workerType='task';
            break;
          case MessageType.Pricing:
            workerType='pricing';
            break;
          case MessageType.Report:
            workerType='pricing';
            break;
          case MessageType.Trading:
          case MessageType.Margin:
            workerType='business';
            break;
          case MessageType.Authentication:
            workerType='authentication';
            break;
          default:
            workerType=msgType;
        }
        const topic = '/exchange/' + exchange + '/' + exchange + '.service.' + workerType;
        return topic.toLowerCase();
    }

}
