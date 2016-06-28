
'use strict';

jest.autoMockOff();

var AppAuthToken = require('../__mocks__/AppAuthToken').default;

describe('AppAuthToken', () => {
    it('contructor default', () => {
        var obj0 = new AppAuthToken();
        expect(obj0).not.toBeNull();
    });
    var obj = new AppAuthToken();
    it('getSessionToken', () => {
        expect(obj.getSessionToken()).not.toBeNull();
    });
    it('storeSessionToken', () => {
        expect(obj.storeSessionToken('test')).not.toBeNull();
    });
    it('deleteSessionToken', () => {
        expect(obj.deleteSessionToken('test')).not.toBeNull();
    });
});