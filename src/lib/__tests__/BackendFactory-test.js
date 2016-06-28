
'use strict';

jest.autoMockOff();

var BackendFactory = require('../__mocks__/BackendFactory').default;
var CONFIG =require('../config');

describe('BackendFactory', () => {
    it('contructor default', () => {
        var obj0 = new BackendFactory();
        expect(obj0).not.toBeNull();
    }); 
    it('contructor with token', () => {
        var obj1 = new BackendFactory('token');
        expect(obj1).not.toBeNull();
    });
    
    it('create parse', () => {
        CONFIG.backend.parse = true;
        var obj2 = new BackendFactory();
        expect(obj2).not.toBeNull();
    });
    CONFIG.HAPI = {local:{url :'https://link'},remote:{url :'https://link'}};
    it('create hapiLocal', () => {
        CONFIG.backend.parse = false;
        CONFIG.backend.hapiLocal = true;
        CONFIG.backend.hapiRemote = false;
        var obj3 = new BackendFactory();
        expect(obj3).not.toBeNull();
    }); 
    it('create hapiRemote', () => {
        CONFIG.backend.parse = false;
        CONFIG.backend.hapiLocal = false;
        CONFIG.backend.hapiRemote = true;
        var obj4 = new BackendFactory();
        expect(obj4).not.toBeNull();
    }); 
});