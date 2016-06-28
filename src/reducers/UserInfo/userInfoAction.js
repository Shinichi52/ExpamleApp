'use strict';


const {
    LOADING,
    RESPONSE,
    REALTIME
} = require('../../lib/constants').default;

const {UPDATEUSERINFO} = require('../../lib/constants').default;


const Global = require('./../../lib/enum/Global');
const QuantEdge = require('../../lib/QuantEdge').default;


const RequestType = require('../../lib/enum/RequestType');



import {
    Actions
}
from 'react-native-router-flux';
const RealtimeKey = require('../../lib/enum/RealtimeKey');
let dispatchGlobal;

const _ = require('underscore');
if (!Global.Operator)
    Global.Operator = new QuantEdge();

export function callBackUpdateUserInfoRequest(msg) {
    console.warn(msg)
        if(msg.ResourcesKeyEnum === 'Success')
        return ("success");
        else
        return ("failure");
}

export function UpdatingUserInfo() {
    return {
        type : UPDATEUSERINFO,
    }
}


export function UpdateUserInfoRequest(userInfo) {
    return dispatch => {
        dispatchGlobal = dispatch;
        Global.Operator.requestUpdateUserInfo(callBackUpdateUserInfoRequest, RequestType.Update, userInfo);
    return dispatch(UpdatingUserInfo());
    };
}
