
/**
 * # authActions-test.js
 *
 * This test is for authActions
 *
 */
'use strict';
jest.autoMockOff();

/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call Parse.com
 */
jest.mock('../../../lib/AppAuthToken');
jest.mock('../../../lib/BackendFactory');

/**
 * ## Mock Store
 *
 * The ```mockStore``` confirms the all the actions are dispatched and
 * in the correct order
 *
 */
var mockStore = require('../../mocks/Store');

/**
 * ## Class under test
 *
 */
var actions = require('../userInfoAction');


const {UPDATEUSERINFO} = require('../../../lib/constants').default;


describe('userInfoAction',() =>{
    it('Test callBackUpdateUserInfoRequest_Suc' , () =>{
        let msg = {
            ResourcesKeyEnum : "Success",
        }
        expect(actions.callBackUpdateUserInfoRequest(msg)).toEqual("success");
    });

    it('Test callBackUpdateUserInfoRequest_Err' , () =>{
        let msg = {
            ResourcesKeyEnum : null
        }
        expect(actions.callBackUpdateUserInfoRequest(msg)).toEqual("failure");
    });

    it('Test UpdatingUserInfo' , () => {
        expect(actions.UpdatingUserInfo()).toEqual({type : UPDATEUSERINFO});
    });

    it('Test UpdateUserInfoRequest' , () => {
        const expectedActions = [];
       const store = mockStore({}, expectedActions);
       let res = store.dispatch(actions.UpdateUserInfoRequest());
       expect(res).toEqual({
            type: UPDATEUSERINFO
        });
    });

});