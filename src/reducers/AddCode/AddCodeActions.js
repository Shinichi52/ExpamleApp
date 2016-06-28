'use strict';

const {
    LOADING_ADD_CODE,
    RESPONSE_ADD_CODE,
    RESPONSE_UPDATE_USERLAYOUT,
    REALTIME_ADD_CODE
} = require('../../lib/constants').default;

import {
    StringFormat,
    formatNumber,
    getJsonObject
}
from './../../lib/base/FunctionUtils';
import {
    convertToDatetime,
    getDateTimeFullString
}
from './../../lib/base/DateTime';
const Global = require('./../../lib/enum/Global');
const ResourcesKeyEnum = require('./../../lib/enum/ResourcesKeyEnum');
const QuantEdge = require('../../lib/QuantEdge').default;
import {
    Actions
}
from 'react-native-router-flux';
const RealtimeKey = require('../../lib/enum/RealtimeKey');
let dispatchGlobal;
let userLayoutTemp;

const _ = require('underscore');
if (!Global.Operator)
    Global.Operator = new QuantEdge();

export function loadingState() {
    return {
        type: LOADING_ADD_CODE
    };
}
export function responseState(payload) {
    return {
        type: RESPONSE_ADD_CODE,
        payload: payload
    };
}
export function responseUpdateUserLayoutState(payload) {
    return {
        type: RESPONSE_UPDATE_USERLAYOUT,
        payload: payload
    };

}
export function realTimeState(payload) {
    return {
        type: REALTIME_ADD_CODE,
        payload: payload
    };
}
export function onRealTimeReceived()
{
  
}
export function getListSymbolRequest() {
  Global.DataManager.clearReciveDataDic();
  Global.DataManager.regisRealtimeHandler(RealtimeKey.Symbol, onRealTimeReceived);

    return dispatch => {
        dispatchGlobal = dispatch;
        Global.Operator.requestGetListSymbol(callBackGetListSymbolRequest);
        return dispatch(loadingState());
    };
}

export function updateUserLayoutRequest(userLayout) {
    return dispatch => {
        dispatchGlobal = dispatch;
        userLayoutTemp=userLayout;
        Global.Operator.requestUpdateUserLayout(callBackUpdateUserLayoutRequest,userLayout);
        return dispatch(loadingState());
    };
}

export function callBackUpdateUserLayoutRequest(msg) {
  Global.UserLayout=userLayoutTemp;
  if (Actions.WatchList!=null) {
    Actions.WatchList();
  }
  if (dispatchGlobal) {
      return dispatchGlobal(responseUpdateUserLayoutState(msg.ResourcesKeyEnum));
  }
}


export function callBackGetListSymbolRequest(msg) {
    let listReturn = msg.ListSymbol;
    if (listReturn==null) {
      listReturn=[];
    }

    let itemDic={};
    if (Global.UserLayout!=null) {
      let currentLayout=Global.UserLayout.CurrentLayout;
      currentLayout=getJsonObject(currentLayout);
      if (currentLayout!=null) {
        let listSymbolId=currentLayout.ListSymbolId;
        if (listSymbolId==null)
          listSymbolId=[];
        for (let symbolId of listSymbolId) {
          itemDic[symbolId]=symbolId;
        }
      }
    }

    for (let symbol of listReturn) {
      if (itemDic[symbol.SymbolId.toString()]==null)
        continue;
      symbol.IsSelected=true;
    }
    if (dispatchGlobal) {
        return dispatchGlobal(responseState(listReturn));
    }
}
