'use strict';

const {
    LOADING_ORDER_DETAIL,
    RESPONSE_ORDER_DETAIL,
    RESPONSE_NEW_ORDER_ORDER_DETAIL,
    RESPONSE_ACCOUNT_ORDER_DETAIL,
    BROADCAST_PRICE_ORDER_DETAIL
} = require('../../lib/constants').default;

import {
    Actions
}
from 'react-native-router-flux';
const Global = require('./../../lib/enum/Global');
const QuantEdge = require('../../lib/QuantEdge').default;
import {
    StringFormat,
    formatNumber,
    getJsonObject
}
from './../../lib/base/FunctionUtils';
const BroadcastKey = require('../../lib/enum/BroadcastKey');
const ResourcesKeyEnum = require('../../lib/enum/ResourcesKeyEnum');
let dispatchGlobalOrderListDetail;
let symbolIdGlobal;

export function getTextOrderType(ordttype) {
    return dispatch => {
        if (ordttype == 'MKT')
            return 'Markert Order';
        if (ordttype == 'LMT')
            return 'Limit Order';
        if (ordttype == 'SMP')
            return 'Stop Order';
        if (ordttype == 'STL')
            return 'Stop Limit Order';

        return '';
    }
}

export function responsePriceSub(payload) {
    return {
        type: RESPONSE_ORDER_DETAIL,
        payload: payload
    };
}
export function responseAccount(payload) {
    return {
        type: RESPONSE_ACCOUNT_ORDER_DETAIL,
        payload: payload
    };
}
export function broadcastCurentPrice(payload) {
    return {
        type: BROADCAST_PRICE_ORDER_DETAIL,
        payload: payload
    };
}
export function onBroadcastReceived(dataKey, message) {
    try {
        if (dataKey === BroadcastKey.UpdateCurrentPrice) {
            if (dispatchGlobalOrderListDetail) {
              let itemReturn=null;

                for (var currentPrice of message.CurrentPrice) {
                  if (symbolIdGlobal!=currentPrice.SymbolId)
                    continue;
                  itemReturn = getDataWapper(currentPrice);
                  break;
                }
                if (itemReturn==null) return false;
                return dispatchGlobalOrderListDetail(broadcastCurentPrice(itemReturn));
            }
        }
    } catch (ex) {
        console.error(ex);
    }
}
export function callBackPriceSubscribeRequest(msg) {
    if (dispatchGlobalOrderListDetail) {
        let itemReturn={
          BuyPrice:0,
          BsizePrice:0,
          SellPrice:0,
          AsizePrice:0,
        };
        for (var currentPrice of msg.ListCurrentPrice) {
          itemReturn=getDataWapper(currentPrice);
        }
        return dispatchGlobalOrderListDetail(responsePriceSub(itemReturn));
    }
}
export function callBackGetListAccountRequest(msg) {

    if (dispatchGlobalOrderListDetail) {
        let itemReturn={
          Amount:'0',
        };

        for (var currentPrice of msg.ListAccount) {
          itemReturn.Amount=formatNumber(currentPrice.Amount);
        }
        return dispatchGlobalOrderListDetail(responseAccount(itemReturn));
    }
}

export function getDataWapper(currentPrice) {
  let itemReturn={
    BuyPrice:0,
    BsizePrice:0,
    SellPrice:0,
    AsizePrice:0,
  };
  itemReturn.AsizePrice = formatNumber(currentPrice.VolAsk, 2, true);
  itemReturn.SellPrice = formatNumber(currentPrice.Ask, 2, true);
  itemReturn.BsizePrice = formatNumber(currentPrice.VolBid, 2, true);
  itemReturn.BuyPrice = formatNumber(currentPrice.Bid, 2, true);
  return itemReturn;
}
export function loadingState() {
    return {
        type: LOADING_ORDER_DETAIL
    };
}

export function unsubcribePrice() {
  Global.DataManager.unregisBroadcastHandler(BroadcastKey.UpdateCurrentPrice, onBroadcastReceived);
}

export function subcribePrice(symbolId, isSub) {
  Global.DataManager.clearReciveDataDic();
  symbolIdGlobal=symbolId;
  Global.DataManager.regisBroadcastHandler(BroadcastKey.UpdateCurrentPrice, onBroadcastReceived);
  let list=[symbolId];
  if (list!=null&&list.length>0&&symbolId>0) {
    return dispatch => {
        dispatchGlobalOrderListDetail = dispatch;
        Global.Operator.requestPriceSubscribeRequest(callBackPriceSubscribeRequest, list, isSub);
        Global.Operator.requestGetListAccount(callBackGetListAccountRequest);
        return dispatch(loadingState());
    };
  } else {
    return dispatch => {
        dispatchGlobalOrderListDetail = dispatch;
        return dispatch(responsePriceSub([]));
    };
  }
}

export function requestNewOrderSingle(newOrderSingleObject) {

    return dispatch => {
        dispatchGlobalOrderListDetail = dispatch;
        Global.Operator.requestNewOrderSingle(callbackNewOrderSingle, newOrderSingleObject);
        return dispatch(loadingState());
    };

}

export function callbackNewOrderSingle(msg) {
    if (dispatchGlobalOrderListDetail) {
      return dispatchGlobalOrderListDetail(responseNewOrderSingle(msg.ResourcesKeyEnum));
    }
}

export function responseNewOrderSingle(payload) {
    return {
        type: RESPONSE_NEW_ORDER_ORDER_DETAIL,
        payload: payload
    };
}
