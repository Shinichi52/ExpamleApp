'use strict';

require('regenerator/runtime');

import RequestManager from './base/RequestManager';
const Global = require('./enum/Global');
const RequestType = require('./enum/RequestType');

export default class QuantEdge {

    constructor() {
        if (Global.RequestManager === null)
            Global.RequestManager = new RequestManager();
        else
            console.info('ready');
    }

    login(callback, data) {
        const user = data.username.trim().toLowerCase();
        const pass = data.password.trim().toLowerCase();
        return Global.RequestManager.requestFirstLogin(callback, user, pass);
    }

    secondLogin(callback, data) {
        const user = data.username.trim().toLowerCase();
        const pass = data.password.trim().toLowerCase();
        const otp = data.otp.trim().toLowerCase();
        return Global.RequestManager.requestSecondLogin(callback, user, pass, otp);
    }

    logout(callback) {
        return Global.RequestManager.requestLogout(callback);
    }

    resendOtpPassword(callback, data) {
        const user = data.username.trim().toLowerCase();
        const pass = data.password.trim().toLowerCase();
        return Global.RequestManager.requestResendOtpPassword(callback, user, pass);
    }

    initializeEnvironmentsWork(callback) {
        return Global.RequestManager.requestInitializeEnvironmentsWork(callback);
    }

    getListTradingDeal(callback, data) {
        const fromTime = data.fromTime;
        const toTime = data.toTime;
        const requestType = data.requestType;
        const clientOrderId = data.clientOrderId;
        const listOrderTypeEnum = data.listOrderTypeEnum;
        const isRequestAll = data.isRequestAll;
        const listCurrentState = data.listCurrentState;
        const memberId = data.memberId;
        return Global.RequestManager.requestGetListTradingDeal(callback, fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll, listCurrentState,memberId);
    }
    requestGetListMemberSymbolMapping(callback, data) {
        const requestType = data.requestType;
        return Global.RequestManager.requestGetListMemberSymbolMapping(callback,  requestType);
    }
    requestGetUserLayout(callback,userId) {
        return Global.RequestManager.requestGetUserLayout(callback,userId);
    }
    requestUpdateUserLayout(callback, userlayout){
        return Global.RequestManager.requestUpdateUserLayout(callback,userlayout);
    }
    requestPriceSubscribeRequest(callback, list,issubscribe){
        return Global.RequestManager.requestPriceSubscribeRequest(callback,list,issubscribe);
    }
    requestUpdateUserInfo(callback, requestType, userInfo){
        return Global.RequestManager.requestUpdateUserInfo(callback , requestType , userInfo);
    }
    requestGetListBussinessInfo(callback){
        return Global.RequestManager.requestGetListBussinessInfo(callback);
    }
    requestGetListAccount(callback){
        return Global.RequestManager.requestGetListAccount(callback,Global.LoggedInMemberInfo.MemberId,RequestType.GetListByMemberId);
    }
    requestGetListSymbol(callback){
        return Global.RequestManager.requestGetListSymbol(callback);
    }
    requestNewOrderSingle(callback,newOrderSingleObject){
        return Global.RequestManager.requestNewOrderSingle(callback,newOrderSingleObject);
    }
    requestCancelOrder(callback,tradingDeal){
        return Global.RequestManager.requestCancelOrder(callback,tradingDeal);
    }
    requestUpdateOrder(callback,tradingDeal){
        return Global.RequestManager.requestUpdateOrder(callback,tradingDeal);
    }
}
