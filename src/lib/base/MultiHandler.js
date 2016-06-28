'use strict';
import _ from 'underscore';

import {
    firstOrDefault
} from './FunctionUtils';

let that = null;

export default class MultiHandler {

    constructor(key) {
        if (_.isNull(key))
            throw 'No key';
        that = this;
        this.Key = key;
        this.Handlers = new Array();
    }

    addHandler(callback) {
        if ( callback != null && typeof callback === "function"){
            var result = firstOrDefault(this.Handlers, function(h) {
                return h === callback;
            });
            if (result == null) {
                this.Handlers.push(callback);
            } else {
                console.error('exist callback');
            }
        } else {
            console.error('invalid callback');
        }
    }

    removeHandler(callback) {
        var result = firstOrDefault(this.Handlers, function(h) {
            return h === callback;
        });
        if (result != null) {
            this.Handlers.splice(this.Handlers.indexOf(result), 1);
        } else{
            console.info('not exist callback');
        }
    }

    sendMessage(dataKey, message) {
        if (this.Handlers == null || this.Handlers.length<=0)
            return;
        var len = this.Handlers.length;
        for (var i = 0; i < len; i++) {
            try {
                var handler = this.Handlers[i];
                handler(dataKey, message);
            } catch (e) {
                console.error(e);
            }
        }
    }

    sendMessageListDataCommand(listDataCommand, realtimeKey) {
        if (this.Handlers == null|| this.Handlers.length<=0)
            return;
        var len = this.Handlers.length;
        for (var i = 0; i < len; i++) {
            try {
                var handler = this.Handlers[i];
                handler(listDataCommand, realtimeKey);
            } catch (e) {
                console.error(e);
            }
        }
    }
}
