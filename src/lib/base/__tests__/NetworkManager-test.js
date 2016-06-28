
'use strict';

jest.autoMockOff();

var NetworkManager  = require ('../NetworkManager').default;

describe('NetworkManager', () => {
    it('contructor', () => {
        var obj1 = new NetworkManager();
        expect(obj1).not.toBeNull();
    });
    
    var obj = new NetworkManager();

    it('isConnecting', () => {
        expect(obj.isConnecting()).not.toBeNull();
    });
    it('connectMe', () => {
        expect(obj.connectMe('test',{MessageType:''})).not.toBeNull();
    });
    it('logoutMe', () => {
        expect(obj.logoutMe(false)).not.toBeNull();
    });
    it('reconnectMe', () => {
        expect(obj.reconnectMe(10)).not.toBeNull();
    });
    it('disconnectMe', () => {
        expect(obj.disconnectMe()).not.toBeNull();
    });
    it('updateDefaultQueue', () => {
        expect(obj.updateDefaultQueue()).not.toBeNull();
    });
    it('receiveTopic', () => {
        expect(obj.receiveTopic()).not.toBeNull();
    });
    it('sendRequestMessage', () => {
        expect(obj.sendRequestMessage('test',{})).not.toBeNull();
    });
    it('doSendMessage', () => {
        expect(obj.doSendMessage('test',{})).not.toBeNull();
    });
    it('onConnected', () => {
        expect(obj.onConnected()).not.toBeNull();
    });
    it('onDisConnected', () => {
        expect(obj.onDisConnected()).not.toBeNull();
    });
    it('onConnectError', () => {
        expect(obj.onConnectError('error')).not.toBeNull();
    });
    it('onReceiveMessage', () => {
        expect(obj.onReceiveMessage('test')).not.toBeNull();
    });
    it('S4', () => {
        expect(obj.S4()).not.toBeNull();
    });
    it('newGUID', () => {
        expect(obj.newGUID()).not.toBeNull();
    });
    it('genarateKey', () => {
        expect(obj.genarateKey()).not.toBeNull();
    });
    it('getRequestType', () => {
        expect(obj.getRequestType()).not.toBeNull();
    });
    it('routingMessage', () => {
        expect(obj.routingMessage()).not.toBeNull();
    });
});