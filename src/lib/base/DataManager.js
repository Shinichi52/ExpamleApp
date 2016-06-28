'use strict';
require('regenerator/runtime');

import * as Message from './MessageDef';
import {
    getRealtimeKey,
    getJsonObject
}
from './FunctionUtils';
const RoutingType = require('./../enum/RoutingType');
const MsgBroadcast = require('./../enum/MsgBroadcast');
const BroadcastKey = require('./../enum/BroadcastKey');
const MsgResponse = require('./../enum/MsgResponse');
const MsgEntity = require('./../enum/MsgEntity');
const RealtimeKey = require('./../enum/RealtimeKey');
const MultiHandler = require('./../base/MultiHandler').default;

const Global = require('./../enum/Global');

let that = null,
    responseEventHandlers = {},
    realtimeEventHandlers = {},
    realtimeListDataEventHandlers = {},
    broadcastEventHandlers = {},
    realtimeEventHandlersHist = {};

export default class DataManager {

    constructor() {
        that = this;
    }

    processReceiveMsg(objectData) {
        try {
            //check if is entity broadcast
            if (objectData.$type === MsgBroadcast.UpdateEntityBroadcast) {

                let dicDataRealTime = {};

                //mesage changed entity
                for (let j = 0; j < objectData.ListEntityChanged.length; j++) {
                    const objData = objectData.ListEntityChanged[j];
                    if (!objData) continue;
                    const entity = objData.BaseEntity;

                    that.updateMemmoryEntity(objData);
                    const realtimeKey = getRealtimeKey(entity.$type);

                    let listData = dicDataRealTime[realtimeKey];
                    if (listData == null) {
                        listData = [];
                    }
                    listData.push(objData);
                    dicDataRealTime[realtimeKey] = listData;

                    const realtimeData = new Message.RealtimeEntity(entity, objData.EntityAction, objData.Actor, objData.LastUpdate);
                    that.processRealtime(realtimeKey, realtimeData);
                }

                for (let keyInDic in dicDataRealTime) {
                    that.processListDataRealtime(dicDataRealTime[keyInDic], keyInDic);
                }

            } else {
                //check is broadcast or response message
                const dataKey = objectData.RequestKey;
                const reqType = Global.NetworkManager.getRequestType(dataKey);
                if (reqType === RoutingType.Broadcast) {
                    that.updateMemmoryBroadcast(objectData);
                } else {
                    //check response need to update memory or not
                    if (reqType === RoutingType.Memory) {
                        that.updateMemmoryResponse(objectData);
                    }
                    //check request need to update memory or not
                    if (reqType === RoutingType.Request) {
                        that.updateMemmoryResponse(objectData);
                    }
                    that.processResponse(dataKey, objectData);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    regisResponseHandler(callback, isUpdateMemory) {
        const requestKey = that.getRequestKey(isUpdateMemory);
        responseEventHandlers[requestKey] = callback;
        return requestKey;
    }

    clearReciveDataDic(){
      // clear dic truoc khi register cai gi do vi tren mobile
      realtimeEventHandlersHist = {};
      broadcastEventHandlers = {};
      realtimeEventHandlers = {};
    }

    regisRealtimeHandler(requestKey, callback) {
        try {
            if (requestKey == null || requestKey.length <= 0)
                return;
            // that.unregisRealtimeHandler();
            if (Array.isArray(requestKey)) {
                let listSubcribe1 = new Array();
                for (let i = 0; i < requestKey.length; i++) {
                    let entityName = requestKey[i];
                    let isHistory1 = that.isHistory(entityName);
                    if (isHistory1) {
                        let histResult1 = realtimeEventHandlersHist[entityName];
                        if (histResult1 == null) {
                            realtimeEventHandlersHist[entityName] = 1;
                            listSubcribe1.push(entityName);
                        } else {
                            let count1 = realtimeEventHandlersHist[entityName]++;
                            count1++;
                            realtimeEventHandlersHist[entityName] = count1;
                        }
                    }
                    let result1 = realtimeEventHandlers[entityName];
                    if (result1 == null) {
                        let multiHandler1 = new MultiHandler(entityName);
                        multiHandler1.addHandler(callback);
                        realtimeEventHandlers[entityName] = multiHandler1;
                    } else {
                        realtimeEventHandlers[entityName].addHandler(callback);
                    }
                }
                // if (listSubcribe1.length > 0)
                //     Global.RequestManager.requestSubcribeHistoryEntity(listSubcribe1, true);
            } else {
                let isHistory = that.isHistory(requestKey);
                ////Neu la entity hist thi add vao dic de subcribe entity
                if (isHistory) {
                    let histResult = realtimeEventHandlersHist[requestKey];
                    if (histResult == null) {
                        //trong truong hop chua duoc subcript thi subscript da subscript thi tang bien dem len
                        realtimeEventHandlersHist[requestKey] = 1;
                        let listSubcribe = new Array();
                        listSubcribe.push(requestKey);
                        // Global.RequestManager.requestSubcribeHistoryEntity(listSubcribe, true);
                    } else {
                        let count = realtimeEventHandlersHist[requestKey];
                        count++;
                        realtimeEventHandlersHist[requestKey] = count;
                    }
                }
                let result = realtimeEventHandlers[requestKey];
                if (result == null) {
                    let multiHandler = new MultiHandler(requestKey);
                    multiHandler.addHandler(callback);
                    realtimeEventHandlers[requestKey] = multiHandler;
                } else {
                    realtimeEventHandlers[requestKey].addHandler(callback);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    regisFunction(requestKey, callback) {
        let result = realtimeListDataEventHandlers[requestKey];
        if (result == null) {
            let multiHandler = new MultiHandler(requestKey);
            multiHandler.addHandler(callback);
            realtimeListDataEventHandlers[requestKey] = multiHandler;
        } else {
            realtimeListDataEventHandlers[requestKey].addHandler(callback);
        }
    }

    unregisFunction(requestKey, callback) {
        const result = realtimeEventHandlers[requestKey];
        if (result != null) {
            realtimeEventHandlers[requestKey].removeHandler(callback);
        }
    }

    regisListDataRealtimeHandler(requestKey, callback) {
        try {
            if (Array.isArray(requestKey)) {
                for (let i = 0; i < requestKey.length; i++) {
                    const realTimeKey = requestKey[i];
                    that.regisFunction(realTimeKey, callback);
                }
            } else {
                that.regisFunction(requestKey, callback);
            }

        } catch (e) {
            console.error(e);
        }
    }

    unregisListDataRealtimeHandler(requestKey, callback) {
        try {
            if (Array.isArray(requestKey)) {
                for (let i = 0; i < requestKey.length; i++) {
                    const realTimeKey = requestKey[i];
                    that.unregisFunction(realTimeKey, callback);
                }
            } else {
                that.unregisFunction(requestKey, callback);
            }
        } catch (e) {
            console.error(e);
        }
    }

    regisBroadcastHandler(requestKey, callback) {
        try {
            if (requestKey == null || requestKey === undefined || requestKey.length <= 0)
                return;
            const result = broadcastEventHandlers[requestKey];
            if (result == null) {
                let multiHandler = new MultiHandler(requestKey);
                multiHandler.addHandler(callback);
                broadcastEventHandlers[requestKey] = multiHandler;
            } else {
                broadcastEventHandlers[requestKey].addHandler(callback);
            }
        } catch (e) {
            console.error(e);
        }
    }


    unregisBroadcastHandler(requestKey, callback) {
        try {
            if (requestKey == null || requestKey.length <= 0)
                return;
            let result = broadcastEventHandlers[requestKey];
            if (result != null) {
                broadcastEventHandlers[requestKey].removeHandler(callback);
            }
        } catch (e) {
            console.error(e);
        }
    }

    processResponse(requestKey, message) {
        try {
            let callback = responseEventHandlers[requestKey];
            if (message != null && callback != null) {
                callback(message);

                responseEventHandlers[requestKey] = null;
                delete responseEventHandlers[requestKey];
            }
        } catch (e) {
            console.error(e);
        }
    }

    reProcessResponse(requestKey, message) {
        try {
            let callback = responseEventHandlers[requestKey];
            if (message != null && callback != null) {
                if (typeof message === 'string') {
                    console.error(message);
                } else
                    callback(message);
                responseEventHandlers[requestKey] = null;
                delete responseEventHandlers[requestKey];
            }
        } catch (e) {
            console.error(e);
        }
    }

    processRealtime(requestKey, message) {
        try {
            if (requestKey == null || requestKey.length <= 0 || message == null)
                return;
            let result = realtimeEventHandlers[requestKey];
            if (result != null) {
                result.sendMessage(requestKey, message);
            }
        } catch (e) {
            console.error(e);
        }
    }

    processListDataRealtime(listEntityCommand, realtimeKey) {
        try {
            if (listEntityCommand == null || listEntityCommand.length <= 0) {
                return;
            }
            let result = realtimeListDataEventHandlers[realtimeKey];
            if (result != null) {
                result.sendMessageListDataCommand(listEntityCommand, realtimeKey);
            }
        } catch (e) {
            console.error(e);
        }
    }

    processBroadcast(requestKey, message) {
        try {
            if (requestKey == null || requestKey.length <= 0 || message == null)
                return;
            let result = broadcastEventHandlers[requestKey];
            if (result != null) {
                result.sendMessage(requestKey, message);
            }
        } catch (e) {
            console.error(e);
        }
    }

    getRequestKey(isUpdateMemory) {
        let requestKey = Global.NetworkManager.genarateKey(isUpdateMemory === true ? RoutingType.Memory : RoutingType.Request);
        return requestKey;
    }

    updateMemmoryBroadcast(objectData) {
        try {
            let broadcastKey = '';
            switch (objectData.$type) {
                case MsgBroadcast.ClientEnvironmentReadyBroadcast:
                    broadcastKey = BroadcastKey.ClientEnvironmentReadyBroadcast;
                    that.processProadcastDone(broadcastKey, objectData);
                    break;

                case MsgBroadcast.UpdateServerTimeBroadcast:
                    Global.TimerServer = objectData.TimeServer;
                    broadcastKey = BroadcastKey.UpdateServerTime;
                    that.processProadcastDone(broadcastKey, objectData);
                    break;

                case MsgBroadcast.UpdateCurrentPriceBroadcast:
                    broadcastKey = BroadcastKey.UpdateCurrentPrice;
                    that.processProadcastDone(broadcastKey, objectData);
                    break;
                default:
            }
        } catch (e) {
            console.error(e);
        }
    }

    updateMemmoryResponse(objectData) {
        try {
            switch (objectData.$type) {
                case MsgResponse.SecondLoginResponse:
                    if (objectData.IsSuccess) {
                        //luu du lieu vao memmory
                        Global.LoggedInMemberInfo = objectData.MemberInfo;
                        Global.LoggedInUserInfo = objectData.UserInfo;
                        Global.WorkingQueue = objectData.WorkingQueue;
                        Global.SessionKey = objectData.SessionKey;
                        Global.TimerServer = objectData.TimeServer;
                    }
                    break;
                default:
            }
        } catch (e) {
            console.error(e);
        }
    }

    updateMemmoryEntity(objectData) {
        try {
            if (objectData.EntityChanged == null || objectData.EntityChanged.BaseEntity == null)
                return;
            var entity = objectData.EntityChanged.BaseEntity;
            var action = objectData.EntityChanged.EntityAction;
            switch (entity.$type) {

                case MsgEntity.EmailConfig:

                    break;
                default:
            }
        } catch (e) {
            console.error(e);
        }
    }

    isHistory(requestKey) {
      return true;
    }

    processProadcastDone(broadcastKey, objectData) {
        that.processBroadcast(broadcastKey, objectData);
    }
}
