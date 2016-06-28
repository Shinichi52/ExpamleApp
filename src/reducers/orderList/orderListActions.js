'use strict';

const {
    RESPONSE_ORDER_LIST,
    LOADING_ORDER_LIST,
    RESPONSE_CANCEL_ORDER_LIST,
    REALTIME_ORDER_LIST
} = require('../../lib/constants').default;

import {
    StringFormat,
    formatNumber,
    clone
}
from './../../lib/base/FunctionUtils';
import {
    convertToDatetime,
    getDateTimeFullString
}
from './../../lib/base/DateTime';
const Global = require('./../../lib/enum/Global');
const StateOrderEnum = require('./../../lib/enum/StateOrderEnum');
const QuantEdge = require('../../lib/QuantEdge').default;
import {
    Actions
}
from 'react-native-router-flux';
const RealtimeKey = require('../../lib/enum/RealtimeKey');
let dispatchGlobal;

const _ = require('underscore');
if (!Global.Operator)
    Global.Operator = new QuantEdge();


export function onRealTimeReceived(realTimeKey, message) {
    try {
        if (realTimeKey === RealtimeKey.TradingDeal) {
            let itemWapper = getDataWapper(message.BaseEntity);
            if (dispatchGlobal) {
                dispatchGlobal(realTimeState(itemWapper));
            }
        }
        if (realTimeKey === RealtimeKey.OrderTransaction) {
            // if (dispatchGlobal) {
            //     dispatchGlobal(realTimeState(message.BaseEntity));
            // }
        }
    } catch (ex) {
        console.error(ex);
    }
}

export function loadingState() {
    return {
        type: LOADING_ORDER_LIST
    };
}
export function responseState(payload) {
    return {
        type: RESPONSE_ORDER_LIST,
        payload: payload
    };
}
export function responseCancelOrderState(payload) {
    return {
        type: RESPONSE_CANCEL_ORDER_LIST,
        payload: payload
    };
}
export function realTimeState(payload) {
    return {
        type: REALTIME_ORDER_LIST,
        payload: payload
    };
}
export function getListTradingDealRequest(fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll, listCurrentState,memberId) {

  Global.DataManager.clearReciveDataDic();
  Global.DataManager.regisRealtimeHandler(RealtimeKey.TradingDeal, onRealTimeReceived);
  Global.DataManager.regisRealtimeHandler(RealtimeKey.OrderTransaction, onRealTimeReceived);

    return dispatch => {
        dispatchGlobal = dispatch;
        Global.Operator.getListTradingDeal(callBackGetListTradingDealRequest, {
            fromTime: fromTime,
            toTime: toTime,
            requestType: requestType,
            clientOrderId: clientOrderId,
            listOrderTypeEnum: listOrderTypeEnum,
            isRequestAll: isRequestAll,
            listCurrentState: listCurrentState,
            memberId:memberId
        });
        return dispatch(loadingState());

    };
}
let formType = {
    'Fill': 'Fill',
    'Cancel': 'Cancel',
    'Working': 'Working'
};

export function getDataWapper(itemData, listOt) {
    let itemWapper = {};
    let initTime=convertToDatetime(itemData.InitTime);
    itemWapper.symbolName = itemData.SymbolName;
    itemWapper.ID = itemData.ChainOrderId;
    itemWapper.entryTime = getDateTimeFullString(initTime);
    itemWapper.orderType = itemData.OrderType;
    itemWapper.fillPrice = formatNumber(itemData.AvgPx);
    itemWapper.duration = itemData.TimeInForce;
    itemWapper.side = itemData.IsBuy ? "Buy" : "Sell";
    itemWapper.size = formatNumber(itemData.CumQty) + "/" + formatNumber(itemData.Quantity);
    itemWapper.limitPrice = formatNumber(itemData.Price);
    itemWapper.stopPrice = formatNumber(itemData.StopPx);
    itemWapper.TradingDeal=clone(itemData);
    if (listOt != null) {
      let listItem = [];
      for (let ot of listOt) {
        let doneTime=convertToDatetime(ot.DoneTime);
          let itemTemp = {
              'dateTime': getDateTimeFullString(doneTime),
              "fillInfo": StringFormat("Fill {0} @ {1}", formatNumber(ot.Quantity), formatNumber(ot.Price))
          };
          listItem.push(itemTemp);
      }
      itemWapper.listData = listItem;
    }

    if (itemData.CurrentState === StateOrderEnum.FILLED) {
        itemWapper.typeForm = formType.Fill;
    } else if (itemData.CurrentState === StateOrderEnum.CANCELED||
                itemData.CurrentState === StateOrderEnum.REJECTED) {
        itemWapper.typeForm = formType.Cancel;
    } else {
        itemWapper.typeForm = formType.Working;
    }
    return itemWapper;
}
export function callBackGetListTradingDealRequest(msg) {

    let listReturn = [];
    let listReturnFill = [];
    let listReturnCancel = [];
    let dicOrderTransaction = {};
    if (msg.ListOrderTransaction==null) {
      msg.ListOrderTransaction=[];
    }
    if (msg.ListTradingDeal==null) {
      msg.ListTradingDeal=[];
    }
    //console.warn("CO HANG");
    for (let ot of msg.ListOrderTransaction) {
        let listOt = dicOrderTransaction[ot.ClientOrderId];
        if (listOt == null) {
            listOt = [];
        }
        listOt.push(ot);
        dicOrderTransaction[ot.ClientOrderId] = listOt;
    }

    for (let itemData of msg.ListTradingDeal) {
      let listOt=dicOrderTransaction[itemData.ClientOrderId];
      if (listOt==null) {
        listOt=[];
      }
        let itemWapper = getDataWapper(itemData, listOt);

        if (itemData.CurrentState === StateOrderEnum.FILLED) {
            listReturnFill.push(itemWapper);
        } else if (itemData.CurrentState === StateOrderEnum.CANCELED
                  ||itemData.CurrentState === StateOrderEnum.REJECTED) {
            listReturnCancel.push(itemWapper);
        } else {
            listReturn.push(itemWapper);
        }
    }

    let objectReturn = {
        'ListReturn': listReturn,
        'ListReturnFill': listReturnFill,
        'ListReturnCancel': listReturnCancel,
    };

    if (dispatchGlobal) {
        return dispatchGlobal(responseState(objectReturn));
    }
}



export function callbackCancelOrderRequest(msg) {
    if (dispatchGlobal) {
        return dispatchGlobal(responseCancelOrderState(msg.ResourcesKeyEnum));
    }
}


//requestCancelOrder
export function requestCancelOrder(tradingDeal) {
    return dispatch => {
        dispatchGlobal = dispatch;
        Global.Operator.requestCancelOrder(callbackCancelOrderRequest, tradingDeal);
        return dispatch(responseCancelOrderState());
    };
}

export function actionModifyClick(datarow) {
    return dispatch => {
      if (Actions.OrderModify) {
        Actions.OrderModify({
            isBuy: datarow.TradingDeal.IsBuy,
            OrderDeatailData: datarow
        });
      }
    }
}
