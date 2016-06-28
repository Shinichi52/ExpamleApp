'use strict';


const {
    LOADING_OPEN_POSITION_INFO,
    RESPONSE_OPEN_POSITION_INFO,
    REALTIME_OPEN_POSITION_INFO,
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
    let memID = Global.LoggedInMemberInfo.MemberId;
    let listReturn = [];
    let listAccAmountInfoReturn = [];
    for (let position of msg.ListOpenPositionInfo){
        if(position.OpenPositionInfoKeys.MemberId === memID) //=== memID
            listReturn.push(position);
    }
    for(let item of msg.ListAccountAmountInfo){
        if(item.AccountAmountInfoKeys.MemberId === memID) //=== memID
            listAccAmountInfoReturn.push(item);        
    }
    let objectReturn = {
        'ListReturn': listReturn,
        'listAccAmountInfoReturn' : listAccAmountInfoReturn,
    };
    if (dispatchGlobal) {
        return dispatchGlobal(responseState(objectReturn));
    }
}

export function realTimeState(payload) {
    return {
        type: REALTIME_OPEN_POSITION_INFO,
        payload: payload
    };
}

export function onRealTimeReceived(realTimeKey, message) {
     try {
        if (realTimeKey === RealtimeKey.OpenPositionInfo) {
            let itemWapper = getDataWapper(message.BaseEntity);
            if (dispatchGlobal) {
                dispatchGlobal(realTimeState(itemWapper));
            }
        }
    } catch (ex) {
        console.error(ex);
    }
}


export function loadingState() {
    return {
        type: LOADING_OPEN_POSITION_INFO
    };
}

export function responseState(payload) {
    return {
        type: RESPONSE_OPEN_POSITION_INFO,
        payload: payload
    };
}

export function GetListBussinessInfo() {
    Global.DataManager.clearReciveDataDic();
    Global.DataManager.regisRealtimeHandler(RealtimeKey.OpenPositionInfo, onRealTimeReceived);

    return dispatch => {
        dispatchGlobal = dispatch;
        Global.Operator.requestGetListBussinessInfo(callBackUpdateUserInfoRequest);
    return dispatch(loadingState());
    };
}
