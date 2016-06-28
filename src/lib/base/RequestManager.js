'use strict';
require('regenerator/runtime');

import DataManager from './DataManager';
import NetworkManager from './NetworkManager';
import * as Message from './MessageDef';

const Global = require('./../enum/Global');

export default class RequestManager {
    constructor() {
        if (!Global.NetworkManager)
            Global.NetworkManager = new NetworkManager();
        if (!Global.DataManager)
            Global.DataManager = new DataManager();
        Global.NetworkManager.processMessage = Global.DataManager.processReceiveMsg;
        Global.NetworkManager.processBroadcast = Global.DataManager.processBroadcast;
        Global.NetworkManager.reProcessResponse = Global.DataManager.reProcessResponse;
    }

    requestFirstLogin(callback, user, pass) {
        const requestKey = Global.DataManager.regisResponseHandler(callback);
        const req = new Message.FirstLoginRequest();
        req.UserName = user;
        req.Password = pass;
        Global.NetworkManager.connectMe(requestKey, req);
    }

    requestSecondLogin(callback, user, pass, otp) {
        const requestKey = Global.DataManager.regisResponseHandler(callback);
        const req = new Message.SecondLoginRequest();
        req.UserName = user;
        req.Password = pass;
        req.OtpPass = otp;
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }

    requestResendOtpPassword(callback, user, pass) {
        const requestKey = Global.DataManager.regisResponseHandler(callback);
        const req = new Message.ResendOtpPassRequest();
        req.UserName = user;
        req.Password = pass;
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }

    requestLogout(callback) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        Global.NetworkManager.sendRequestMessage(requestKey, new Message.UserLogoutRequest());
    }

    requestInitializeEnvironmentsWork(callback) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.CreateTerminalEnvironmentRequest();
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }

    requestGetListTradingDeal(callback, fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll, listCurrentState,memberId) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.GetListTradingDealRequest(fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll,  listCurrentState,memberId);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
    requestGetListMemberSymbolMapping(callback, requesttype) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.GetListMemberSymbolMappingRequest(requesttype);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
    requestGetUserLayout(callback, userId) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.GetUserLayoutRequest();
        req.UserId = userId;
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
    requestUpdateUserLayout(callback, userlayout) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.UpdateUserLayoutRequest(userlayout);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
    requestPriceSubscribeRequest(callback, list, issubscribe) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.PriceSubscribeRequest(list, issubscribe);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
    requestGetListSymbol(callback, requestType) {
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.GetListSymbolRequest();
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }

    requestUpdateUserInfo(callback,requestType,userInfo){
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.UpdateUserInfoRequest(userInfo, requestType);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }

    requestNewOrderSingle(callback,newOrderSingleObject){
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.NewOrderSingleRequest(newOrderSingleObject);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }

    requestGetListAccount(callback,memberId,requestType){
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.GetListAccountRequest(memberId,requestType);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }


    requestGetListBussinessInfo(callback){
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.GetListBussinessInfo();
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
    requestCancelOrder(callback,tradingDeal){
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.CancelOrderRequest(tradingDeal);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
    requestUpdateOrder(callback,tradingDeal){
        const requestKey = Global.DataManager.regisResponseHandler(callback, true);
        const req = new Message.UpdateOrderRequest(tradingDeal);
        Global.NetworkManager.sendRequestMessage(requestKey, req);
    }
}
