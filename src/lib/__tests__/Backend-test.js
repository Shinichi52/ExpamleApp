
'use strict';

jest.autoMockOff();

var Backend = require('../__mocks__/Backend').default;

describe('Backend', () => {
    it('contructor default', () => {
        var obj0 = new Backend();
        expect(obj0).not.toBeNull();
    }); 
    var obj = new Backend();
    it('logout', () => {
        expect(obj.logout()).not.toBeNull();
    });
    it('login', () => {
        expect(obj.login()).not.toBeNull();
    });
    it('signup', () => {
        expect(obj.signup()).not.toBeNull();
    });
    it('resetPassword', () => {
        expect(obj.resetPassword()).not.toBeNull();
    });
    it('getProfile', () => {
        expect(obj.getProfile()).not.toBeNull();
    });
    it('updateProfile', () => {
        expect(obj.updateProfile()).not.toBeNull();
    });
});