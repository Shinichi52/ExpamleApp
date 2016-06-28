
'use strict';

jest.autoMockOff();

var QuantEdge = require('../QuantEdge').default;
const Global = require('../enum/Global');

describe('QuantEdge', () => {
    it('contructor default', () => {
        var obj0 = new QuantEdge();
        expect(obj0).not.toBeNull();
    }); 
    it('contructor default with data', () => {
        Global = {RequestManager:{}};
        var obj1 = new QuantEdge();
        expect(obj1).not.toBeNull();
    });
    
    Global = null;
    var obj = new QuantEdge();
    it('login', () => {
        var data = {username:'test',password:'test'};
    	expect(obj.login(null,data)).not.toBeNull();
    }); 
    it('secondLogin', () => {
        var data = {username:'test',password:'test',otp:'123'};
        expect(obj.secondLogin(null,data)).not.toBeNull();
    }); 
    it('resendOtpPassword', () => {
        var data = {username:'test',password:'test'};
        expect(obj.resendOtpPassword(null,data)).not.toBeNull();
    });
    it('initializeEnvironmentsWork', () => {
        expect(obj.initializeEnvironmentsWork(null)).not.toBeNull();
    }); 
    it('getListTradingDeal', () => {
        var data = {fromTime:'test',toTime:'test',requestType:'test',
                    clientOrderId:'test',listOrderTypeEnum:[],
                    isRequestAll: true,listCurrentState:[]};
        expect(obj.getListTradingDeal(null,data)).not.toBeNull();
    });
    it('requestGetListMemberSymbolMapping', () => {
        var data = {requestType:'test'};
        expect(obj.requestGetListMemberSymbolMapping(null,data)).not.toBeNull();
    });
    it('requestGetUserLayout', () => {
        expect(obj.requestGetUserLayout(null)).not.toBeNull();
    });
    it('requestUpdateUserLayout', () => {
        expect(obj.requestUpdateUserLayout(null, 'layout')).not.toBeNull();
    });
    it('requestPriceSubscribeRequest', () => {
        expect(obj.requestPriceSubscribeRequest(null, [], true)).not.toBeNull();
    });
    it('requestUpdateUserInfo', () => {
        expect(obj.requestUpdateUserInfo(null, 'test', {})).not.toBeNull();
    });
    it('requestGetListSymbol', () => {
        expect(obj.requestGetListSymbol(null)).not.toBeNull();
    });


    //last call
    it('logout', () => {
        expect(obj.logout(null)).not.toBeNull();
    }); 
});