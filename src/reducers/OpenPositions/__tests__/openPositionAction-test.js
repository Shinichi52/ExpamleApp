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
var actions = require('../openPositionAction');

const Global = require('./../../../lib/enum/Global');


const {
    LOADING_OPEN_POSITION_INFO,
    RESPONSE_OPEN_POSITION_INFO,
    REALTIME_OPEN_POSITION_INFO,
    } = require('../../../lib/constants').default;


describe('openPositionAction',() =>{
    it('Test callBackUpdateUserInfoRequest', () => {
       Global.LoggedInMemberInfo = {MemberId : 45};        
        const expectedActions = [];
       const store = mockStore({}, expectedActions);
       store.dispatch(actions.GetListBussinessInfo());
       let msg={
         ListOpenPositionInfo:[
           {
             OpenPositionInfoKeys:{
                 MemberId : Global.LoggedInMemberInfo.MemberId,
            }
           }
         ],
         ListAccountAmountInfo : [
             {
                 AccountAmountInfoKeys : {
                     MemberId : Global.LoggedInMemberInfo.MemberId,
                 }
             }
         ]
       };

       expect(actions.callBackUpdateUserInfoRequest(msg)).toEqual({
           type : RESPONSE_OPEN_POSITION_INFO,
           payload : {
               'ListReturn': msg.ListOpenPositionInfo,
               'listAccAmountInfoReturn' : msg.ListAccountAmountInfo
            }
       });

    });
    it('Test responseState' , () => {
        let value = 'value';
        expect(actions.responseState(value)).toEqual(
            {
                type : RESPONSE_OPEN_POSITION_INFO,
                payload : value
            });
    });
    it('Test realTimeState' , () => {
        let value = 'value';
        expect(actions.realTimeState(value)).toEqual(
            {
                type : REALTIME_OPEN_POSITION_INFO,
                payload : value
            });
    });
    it('Test loadingState' , () => {
        expect(actions.loadingState()).toEqual(
            {
                type : LOADING_OPEN_POSITION_INFO,
            });
    });

    it('Test GetListBussinessInfo' , () => {
        const expectedActions = [];
       const store = mockStore({}, expectedActions);
       let res = store.dispatch(actions.GetListBussinessInfo());
       expect(res).toEqual({
            type: LOADING_OPEN_POSITION_INFO
        });
    });

});