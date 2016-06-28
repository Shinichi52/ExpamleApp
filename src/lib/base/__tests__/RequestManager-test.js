
'use strict';

jest.autoMockOff();

var RequestManager = require('../RequestManager').default;

describe('RequestManager', () => {
	var obj = new RequestManager();
   it('contructor default', () => {
        expect(obj).not.toBeNull();
    }); 
   var obj = new RequestManager();
   it('requestFirstLogin', () => {
    	expect(obj.requestFirstLogin(null,'test','test')).not.toBeNull();
    }); 
    it('requestSecondLogin', () => {
    	expect(obj.requestSecondLogin(null,'test','test','test')).not.toBeNull();
    }); 
    it('requestResendOtpPassword', () => {
    	expect(obj.requestResendOtpPassword(null,'test','test')).not.toBeNull();
    }); 
    it('requestInitializeEnvironmentsWork', () => {
    	expect(obj.requestInitializeEnvironmentsWork(null)).not.toBeNull();
    }); 
    it('requestGetListTradingDeal', () => {
    	expect(obj.requestGetListTradingDeal(null)).not.toBeNull();
    }); 
    it('requestGetListMemberSymbolMapping', () => {
    	expect(obj.requestGetListMemberSymbolMapping(null,'test')).not.toBeNull();
    }); 
    it('requestGetUserLayout', () => {
    	expect(obj.requestGetUserLayout(null)).not.toBeNull();
    }); 
    it('requestUpdateUserLayout', () => {
    	expect(obj.requestUpdateUserLayout(null,'test')).not.toBeNull();
    }); 
    it('requestPriceSubscribeRequest', () => {
    	expect(obj.requestPriceSubscribeRequest(null,[1], true)).not.toBeNull();
    });
    it('requestGetListSymbol', () => {
    	expect(obj.requestGetListSymbol(null,'test')).not.toBeNull();
    });
    it('requestUpdateUserInfo', () => {
    	expect(obj.requestUpdateUserInfo(null,'test',{})).not.toBeNull();
    });

    
    //end with this
    it('requestLogout', () => {
    	expect(obj.requestLogout(null)).not.toBeNull();
    }); 
});