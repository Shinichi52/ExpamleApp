
'use strict';

jest.autoMockOff();

var PartialMessageStorage  = require ('../PartialMessageStorage').default;

describe('PartialMessageStorage', () => {
    it('contructor with params', () => {
    	var obj = new PartialMessageStorage(1);
        expect(obj).not.toBeNull();
    });
    it('get default data', () => {
    	var obj = new PartialMessageStorage(1);
        expect(obj.getMessageData()).toBe('');
    });
    it('appendMessage valid', () => {
    	var obj = new PartialMessageStorage(1);
        expect(obj.appendMessage('',0,1)).toBe(true);
    });
    it('appendMessage invalid count', () => {
    	var count = 1;
    	var obj = new PartialMessageStorage(count);
        expect(obj.appendMessage('',0,0)).toBe(null);
    });
    it('appendMessage invalid index nagative', () => {
    	var count = 1;
    	var index =-2;
    	var obj = new PartialMessageStorage(count);
        expect(obj.appendMessage('',index,count)).toBe(null);
    });
    it('appendMessage invalid index over count', () => {
    	var count = 1;
    	var index =2;
    	var obj = new PartialMessageStorage(count);
        expect(obj.appendMessage('',index,count)).toBe(null);
    });
    it('appendMessage duff message', () => {
    	var count = 1;
    	var index =0;
    	var obj = new PartialMessageStorage(count);
    	obj.appendMessage('',index,count);// for first time
        expect(obj.appendMessage('',index,count)).toBe(false);
    });
});