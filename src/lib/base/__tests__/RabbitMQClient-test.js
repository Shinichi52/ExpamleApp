
'use strict';

jest.autoMockOff();

var RabbitMQClient  = require ('../RabbitMQClient').default;

describe('RabbitMQClient', () => {
    it('contructor', () => {
        var obj1 = new RabbitMQClient();
        expect(obj1).not.toBeNull();
    });
    
    var obj = new RabbitMQClient();

    it('connect', () => {
        expect(obj.connect({UserName:'',Password:''})).not.toBeNull();
    });
    it('isNotLogedOn', () => {
        expect(obj.isNotLogedOn()).not.toBeNull();
    });
    it('updateQueue', () => {
        expect(obj.updateQueue()).not.toBeNull();
    });
    it('disconnect', () => {
        expect(obj.disconnect()).not.toBeNull();
    });
    it('clientOnConnect', () => {
        expect(obj.clientOnConnect()).not.toBeNull();
    });
    it('clientOnError', () => {
        expect(obj.clientOnError()).not.toBeNull();
    });
    it('clientOnReceved', () => {
        expect(obj.clientOnReceved()).not.toBeNull();
    });
    it('sendMessage', () => {
        expect(obj.sendMessage()).not.toBeNull();
    });
    it('genarateQueue', () => {
        expect(obj.genarateQueue()).not.toBeNull();
    });
    it('getConnected', () => {
        expect(obj.getConnected()).not.toBeNull();
    });
    it('getChangedQueue', () => {
        expect(obj.getChangedQueue()).not.toBeNull();
    });
    it('getExchange', () => {
        expect(obj.getExchange()).not.toBeNull();
    });
    it('getReceiveTopic', () => {
        expect(obj.getReceiveTopic()).not.toBeNull();
    });
});