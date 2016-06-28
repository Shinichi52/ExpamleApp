'use strict';

import CONFIG from './../config';
import _ from 'underscore';
import {getStompUrl,
        toNetworkMessage
}
from './FunctionUtils';

const Stomp = require('stompjs');
const SockJS = require('sockjs-client');
let url = getStompUrl(CONFIG.quantEdgeConfig.urlStomp),
    queuePrefix = '/amq/queue/',
    queue = null,
    subscription = null,
    isConnected = false,
    changedQueue = false,
    isFirstConnect = true,
    authenHeaders = null,
    firstLoginMsg = null,
    client = {},
    that = null;

export default class RabbitMQClient {

    constructor() {
        if (_.isNull(CONFIG.quantEdgeConfig))
            throw 'No quantEdgeConfig node';
        that = this;
    }

    connect(message) {
        firstLoginMsg = message;
        if (isConnected === true) {
            that.disconnect();
        }
        if (isConnected === false) {
            authenHeaders = {
                login: firstLoginMsg.UserName,
                passcode: firstLoginMsg.Password,
                'host': CONFIG.quantEdgeConfig.vhost
            };
            queue = that.genarateQueue(CONFIG.quantEdgeConfig.exchange, firstLoginMsg.UserName);
            //thiet lap lai connection moi
            Stomp.WebSocketClass = SockJS;
            client = Stomp.client(url);
            client.heartbeat.outgoing = 0; //thiet lap nay ko tuong thich voi RabbitMQ
            client.heartbeat.incoming = 0; //thiet lap nay ko tuong thich voi RabbitMQ
            client.connect(authenHeaders, that.clientOnConnect, that.clientOnError);
        }
    }

    reconnect() {
        if (client != null)
            client.disconnect();
        client = null;
        //thiet lap lai connection moi
        Stomp.WebSocketClass = SockJS;
        client = Stomp.client(url);
        client.heartbeat.outgoing = 0; //thiet lap nay ko tuong thich voi RabbitMQ
        client.heartbeat.incoming = 0; //thiet lap nay ko tuong thich voi RabbitMQ
        client.connect(authenHeaders, that.clientOnConnect, that.clientOnError);
    }

    isNotLogedOn() {
        return isFirstConnect;
    }

    updateQueue(workQueue) {
        if (subscription != null) {
            subscription.unsubscribe();
            subscription = null;
        }
        if (isConnected === true) {
            subscription = client.subscribe(queuePrefix + workQueue, that.clientOnReceved);
            queue = workQueue;
            changedQueue = true;
        }
    }

    disconnect() {
        if (client == null) return;
        if (isConnected === true) {
            if (subscription != null) {
                subscription.unsubscribe();
                subscription = null;
            }
            client.disconnect();
            isConnected = false;
            isFirstConnect = true;
            changedQueue = false;
        }
    }

    clientOnConnect() {
        try {
            isConnected = true;
            if (subscription != null) {
                subscription.unsubscribe();
                subscription = null;
            }
            subscription = client.subscribe(queuePrefix + queue, that.clientOnReceved);
            if (isFirstConnect === true && firstLoginMsg != null) {
                firstLoginMsg.ReceiveTopic = queue;
                firstLoginMsg.TemporaryTopic = queue;
                that.sendMessage(firstLoginMsg.SendingTopic, toNetworkMessage(firstLoginMsg), firstLoginMsg.Ttl);
                firstLoginMsg = null;
            }
            if (that.onConnected)
                that.onConnected();
        } catch (e) {
            console.error(e);
        }
    }

    clientOnError(error) {
        //khoi tao lai ket noi
        isConnected = false;
        if (that.onConnectError)
            that.onConnectError(error);
    }

    clientOnReceved(message) {
        isFirstConnect = false; //dam bao nhan duoc toi thieu 1 msg thi moi thoi
        if (that.onReceiveMessage)
            that.onReceiveMessage(message.body);
    }

    sendMessage(sendingTopic, message, ttl) {
        try {
            if (!isConnected) return false;
            if (ttl) {
                const ttlValue = 1000 * ttl;
                client.send(sendingTopic, {
                    expiration: ttlValue,
                    persistent: 0
                }, message);
            } else
                client.send(sendingTopic, null, message);
            return true;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    genarateQueue(exc, user) {
        const queueVal = exc + '.temporary.' + user;
        return queueVal;
    }

    getConnected() {
        return isConnected;
    }

    getChangedQueue() {
        return changedQueue;
    }

    getExchange() {
        return CONFIG.quantEdgeConfig.exchange;
    }

    getReceiveTopic() {
        return queue;
    }
}