
'use strict';

jest.autoMockOff();

var FunctionUtils  = require ('../FunctionUtils');

describe('FunctionUtils', () => {
    it('formatNumber null', () => {
        var obj = FunctionUtils.formatNumber(null);
        expect(obj).toBe(null);
    });
    it('formatNumber string text', () => {
        var obj = FunctionUtils.formatNumber('null');
        expect(obj).toBe('null');
    });
    it('formatNumber normal', () => {
        var obj = FunctionUtils.formatNumber('123.456',2);
        expect(obj).toBe('123.46');
    });
    it('formatNumber normal isFixedFormat', () => {
        var obj = FunctionUtils.formatNumber('123456.789',2,true);
        expect(obj).toBe('123,456.79');
    });
    it('getRealtimeKey', () => {
        var obj = FunctionUtils.getRealtimeKey('123456.789');
        expect(obj).toBe('123456.');
    });

});
