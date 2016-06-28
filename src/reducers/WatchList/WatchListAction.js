'use strict';


const {
    LOADING_WATCH_LIST,
    RESPONSE_WATCH_LIST,
    REALTIME_WATCH_LIST,
    BROADCAST_PRICE
} = require('../../lib/constants').default;

const Global = require('./../../lib/enum/Global');
const QuantEdge = require('../../lib/QuantEdge').default;

import {
    Actions
}
from 'react-native-router-flux';
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

const RealtimeKey = require('../../lib/enum/RealtimeKey');
let dispatchGlobalWatchList;
let dicSymbolSub;

import {
    createStore
} from 'redux';

import {
    Map
} from 'immutable';
const _ = require('underscore');
const BroadcastKey = require('../../lib/enum/BroadcastKey');

if (!Global.Operator)
    Global.Operator = new QuantEdge();


export function onBroadcastReceived(dataKey, message) {
    try {
        if (dataKey === BroadcastKey.UpdateCurrentPrice) {
            if (dispatchGlobalWatchList) {
              console.warn("YYYYYYYY");
                let listDisplay = [];
                console.warn(JSON.stringify(message));
                for (var currentPrice of message.CurrentPrice) {
                  console.warn("FOR");
                  let itemWapper = getDataWapper(currentPrice);
                  if (itemWapper==null)continue;
                  listDisplay.push(itemWapper);
                }
                if (listDisplay.length>0) {
                  console.warn("co gia changed");
                  return dispatchGlobalWatchList(broadcastCurentPrice(listDisplay));
                }
                console.warn("YYYYYYYY1");
            }
        }
    } catch (ex) {
        console.error(ex);
    }
}


export function responsePriceSub(payload) {
    return {
        type: RESPONSE_WATCH_LIST,
        payload: payload
    };
}
export function broadcastCurentPrice(payload) {
    return {
        type: BROADCAST_PRICE,
        payload: payload
    };
}

export function actionBuySellClick(isBuy, datarow) {
    return dispatch => {
      if (Actions.OrderDetail) {
        Actions.OrderDetail({
            isBuy: isBuy,
            OrderData: datarow
        });
      }
    }
}


export function callBackPriceSubscribeRequest(msg) {
    if (dispatchGlobalWatchList) {
        let listDisplay = [];
        let dicPrice={};

        for (var currentPrice of msg.ListCurrentPrice) {
          dicPrice[currentPrice.SymbolId]=currentPrice;
        }

        if (Global.UserLayout!=null) {
          let currentLayout=Global.UserLayout.CurrentLayout;
          currentLayout=getJsonObject(currentLayout);
          if (currentLayout!=null) {
            let listSymbolId=currentLayout.ListSymbolId;
            if (listSymbolId==null)
              listSymbolId=[];
            for (let symbolId of listSymbolId) {
              let itemPrice=dicPrice[symbolId.toString()];
              let itemReturn1=getDataWapper(itemPrice);
              if (itemReturn1==null)continue;
              listDisplay.push(itemReturn1);
            }
          }
        }

        return dispatchGlobalWatchList(responsePriceSub(listDisplay));
    }
}

export function getDataWapper(currentPrice) {
  if (currentPrice==null) {
    return null;
  }
    let itemReturn={};
    const symbolMemory=Global.DicSymbol[currentPrice.SymbolId.toString()];
    if (symbolMemory==null)
      {
        return null;
      }
    if (dicSymbolSub[currentPrice.SymbolId.toString()]==null)
      {
        return null;
      }
    itemReturn.SymbolId = currentPrice.SymbolId;
    itemReturn.Symbol = symbolMemory.ContractName;
    itemReturn.SymbolId = symbolMemory.SymbolId;
    itemReturn.companyName = symbolMemory.ContractName;
    let lastUpdate = convertToDatetime(currentPrice.LastUpdate);
    itemReturn.OpenPrice = formatNumber(currentPrice.OpenPrice, 2, true);
    itemReturn.HighPrice = formatNumber(currentPrice.HighPrice, 2, true);
    itemReturn.LowPrice = formatNumber(currentPrice.LowPrice, 2, true);
    itemReturn.ClosePrie = formatNumber(currentPrice.YesterdayClose, 2, true);
    itemReturn.VolmPrice = formatNumber(currentPrice.TotalVolume, 2, true);
    itemReturn.LastTime = getDateTimeFullString(lastUpdate, 2, true);
    itemReturn.AsizePrice = formatNumber(currentPrice.VolAsk, 2, true);
    itemReturn.SellPrice = formatNumber(currentPrice.Ask, 2, true);
    itemReturn.BsizePrice = formatNumber(currentPrice.VolBid, 2, true);
    itemReturn.BuyPrice = formatNumber(currentPrice.Bid, 2, true);
    itemReturn.Chg = formatNumber(currentPrice.NetChg, 2, true);
    itemReturn.Trade = formatNumber(currentPrice.LastTrade, 2, true);
    itemReturn.tradeLimit = formatNumber(currentPrice.VolLastTrade, 2, true);
    itemReturn.chgLimit = formatNumber(currentPrice.NetChgPercent, 2, true);
    return itemReturn;
}

export function loadingState() {
    return {
        type: LOADING_WATCH_LIST
    };
}

export function subcribePrice(list, isSub,dicSub) {
  dicSymbolSub=dicSub;
  Global.DataManager.clearReciveDataDic();
  Global.DataManager.regisBroadcastHandler(BroadcastKey.UpdateCurrentPrice, onBroadcastReceived);

  if (list!=null&&list.length>0) {
    return dispatch => {
        dispatchGlobalWatchList = dispatch;
        Global.Operator.requestPriceSubscribeRequest(callBackPriceSubscribeRequest, list, isSub);
        return dispatch(loadingState());
    };
  }else {
    return dispatch => {
        dispatchGlobalWatchList = dispatch;
        return dispatch(responsePriceSub([]));
    };
  }
}
