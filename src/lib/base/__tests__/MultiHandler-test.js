
'use strict';

jest.autoMockOff();

var MultiHandler  = require ('../MultiHandler').default;

describe('MultiHandler', () => {
    it('contructor with params', () => {
    	var obj0 = new MultiHandler('test');
        expect(obj0).not.toBeNull();
    });
    it('contructor without params', () => {
        var obj1 = new MultiHandler();
        expect(obj1).not.toBeNull();
    });
    it('contructor with null key', () => {
        var obj2 = null;
        try{
            obj2 = new MultiHandler(null);
        }catch (e) {
                console.error(e);
        }
        expect(obj2).toBeNull();
    });
    var obj = new MultiHandler('test');
    var test = function(key,data){
        console.info(key);
    };
    it('addHandler', () => {
    	expect(obj.addHandler(test)).not.toBeNull();
    });
    it('addHandler again', () => {
    	expect(obj.addHandler(test)).not.toBeNull();
    });
    it('removeHandler', () => {
        expect(obj.removeHandler(test)).not.toBeNull();
    });
    it('removeHandler again', () => {
        expect(obj.removeHandler(test)).not.toBeNull();
    });

    it('sendMessage no handler', () => {
        expect(obj.sendMessage('test',{data:''})).not.toBeNull();
    });
    it('sendMessageListDataCommand no handler', () => {
        expect(obj.sendMessageListDataCommand([''],'test')).not.toBeNull();
    });
    it('sendMessage has callback', () => {
        obj.addHandler(test);
        expect(obj.sendMessage('test',{data:''})).not.toBeNull();
    });
    it('sendMessage has fail callback', () => {
        obj.addHandler('test');
        expect(obj.sendMessage('test',{data:''})).not.toBeNull();
    });
     it('sendMessage has null callback', () => {
        obj.addHandler(null);
        expect(obj.sendMessage('test',{data:''})).not.toBeNull();
    });
    it('sendMessageListDataCommand', () => {
        obj.addHandler(test);
        expect(obj.sendMessageListDataCommand([''],'test')).not.toBeNull();
    });
    it('sendMessageListDataCommand has fail callback', () => {
        obj.addHandler('test');
        expect(obj.sendMessageListDataCommand([''],'test')).not.toBeNull();
    });
    it('sendMessageListDataCommand has null callback', () => {
        obj.addHandler(null);
        expect(obj.sendMessageListDataCommand([''],'test')).not.toBeNull();
    });
});