
'use strict';

jest.autoMockOff();

var Message  = require ('../MessageDef');

describe('MessageDef', () => {
    it('RealtimeEntity', () => {
    	var obj = new Message.RealtimeEntity();
        expect(obj).toBeDefined();
    });
    it('NetworkStatusBroadcast', () => {
        var obj = new Message.NetworkStatusBroadcast();
        expect(obj).toBeDefined();
    });
    it('PartialMessage', () => {
        var obj = new Message.PartialMessage();
        expect(obj).toBeDefined();
    });
    it('PingRequest', () => {
        var obj = new Message.PingRequest();
        expect(obj).toBeDefined();
    });
    it('CompressedMessage', () => {
        var obj = new Message.CompressedMessage();
        expect(obj).toBeDefined();
    });
    it('SubscribeEntityRequest', () => {
        var obj = new Message.SubscribeEntityRequest();
        expect(obj).toBeDefined();
    });
    it('FirstLoginRequest', () => {
        var obj = new Message.FirstLoginRequest();
        expect(obj).toBeDefined();
    }); 
    it('SecondLoginRequest', () => {
        var obj = new Message.SecondLoginRequest();
        expect(obj).toBeDefined();
    });
    it('UserLogoutRequest', () => {
        var obj = new Message.UserLogoutRequest();
        expect(obj).toBeDefined();
    });
    it('GetUserLayoutRequest', () => {
        var obj = new Message.GetUserLayoutRequest();
        expect(obj).toBeDefined();
    });
    it('ResendOtpPassRequest', () => {
        var obj = new Message.ResendOtpPassRequest();
        expect(obj).toBeDefined();
    });
    it('CreateTerminalEnvironmentRequest', () => {
        var obj = new Message.CreateTerminalEnvironmentRequest();
        expect(obj).toBeDefined();
    });
    it('GetListTradingDealRequest', () => {
        var obj = new Message.GetListTradingDealRequest();
        expect(obj).toBeDefined();
    });
    it('PriceSubscribeRequest', () => {
        var obj = new Message.PriceSubscribeRequest();
        expect(obj).toBeDefined();
    });
    it('GetListSymbolRequest', () => {
        var obj = new Message.GetListSymbolRequest();
        expect(obj).toBeDefined();
    });
    it('UpdateUserInfoRequest', () => {
        var obj = new Message.UpdateUserInfoRequest();
        expect(obj).toBeDefined();
    });
    it('GetListMemberSymbolMappingRequest', () => {
        var obj = new Message.GetListMemberSymbolMappingRequest();
        expect(obj).toBeDefined();
    }); 
    it('UpdateUserLayoutRequest', () => {
        var obj = new Message.UpdateUserLayoutRequest();
        expect(obj).toBeDefined();
    });
});