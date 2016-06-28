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
var actions = require('../OrderDetailAction');

const BroadcastKey = require('./../../../lib/enum/BroadcastKey');
import RNRF, {
  Route,
  Scene,
  TabBar} from 'react-native-router-flux';

  import {
      convertToDatetime,
      getDateTimeFullString
  }
  from './../../../lib/base/DateTime';
  import {
      StringFormat,
      formatNumber
  }
  from './../../../lib/base/FunctionUtils';
/**
 * ## Imports
 *
 * actions under test
 */
const {
  LOADING_ORDER_DETAIL,
  RESPONSE_ORDER_DETAIL,
  RESPONSE_NEW_ORDER_ORDER_DETAIL,
  RESPONSE_ACCOUNT_ORDER_DETAIL,
  BROADCAST_PRICE_ORDER_DETAIL
} = require('../../../lib/constants').default;

const Global = require('./../../../lib/enum/Global');
import DataManager from './../../../lib/base/DataManager';
const QuantEdge = require('./../../../lib/QuantEdge').default;

if (!Global.DataManager)
    Global.DataManager = new DataManager();

if (!Global.Operator)
    Global.Operator = new QuantEdge();
Global.LoggedInMemberInfo={};
Global.LoggedInUserInfo={};
function createDispatch() {
    const expectedActions = [];
   const store = mockStore({}, expectedActions);
   store.dispatch(actions.subcribePrice([1],true));
}

/**
 * ## Tests
 *
 * authActions
 */
const expectedActions = [];
const store = mockStore({}, expectedActions);
describe('OrderDetailAction', () => {

    it('Test getTextOrderType MKT', () => {

        expect(store.dispatch(actions.getTextOrderType('MKT'))).toEqual('Markert Order');
    });
    it('Test getTextOrderType LMT', () => {
        expect(store.dispatch(actions.getTextOrderType('LMT'))).toEqual('Limit Order');
    });
    it('Test getTextOrderType SMP', () => {
        expect(store.dispatch(actions.getTextOrderType('SMP'))).toEqual('Stop Order');
    });
    it('Test getTextOrderType STL', () => {
        expect(store.dispatch(actions.getTextOrderType('STL'))).toEqual('Stop Limit Order');
    });
    it('Test getTextOrderType null', () => {
        expect(store.dispatch(actions.getTextOrderType(''))).toEqual('');
    });

    it('Test responsePriceSub', () => {
      let value = 'value';
        expect(actions.responsePriceSub(value)).toEqual({
             type: RESPONSE_ORDER_DETAIL,
             payload:value
         });
    });
    it('Test responseAccount', () => {
      let value = 'value';
        expect(actions.responseAccount(value)).toEqual({
             type: RESPONSE_ACCOUNT_ORDER_DETAIL,
             payload:value
         });
    });
    it('Test broadcastCurentPrice', () => {
      let value = 'value';
        expect(actions.broadcastCurentPrice(value)).toEqual({
             type: BROADCAST_PRICE_ORDER_DETAIL,
             payload:value
         });
    });


    it('Test onBroadcastReceived', () => {
      createDispatch();
      let value = {
        CurrentPrice:[
          {
            SymbolId:1,
          }
        ]
      };
        expect(actions.onBroadcastReceived(BroadcastKey.UpdateCurrentPrice,value).type).toEqual(BROADCAST_PRICE_ORDER_DETAIL);
    });
    it('Test onBroadcastReceived', () => {
      console.warn("PPPQQQQQQQQ");
      createDispatch();
      let value = {
        CurrentPrice:[]
      };
        expect(actions.onBroadcastReceived(BroadcastKey.UpdateCurrentPrice,value)).toEqual(false);
    });
    it('Test callBackPriceSubscribeRequest', () => {
      createDispatch();
      let value = {
        ListCurrentPrice:[{
          SymbolId:1,
        }]
      };
        expect(actions.callBackPriceSubscribeRequest(value).type).toEqual(RESPONSE_ORDER_DETAIL);
    });
    it('Test callBackGetListAccountRequest', () => {
      createDispatch();
      let value = {
        ListAccount:[{
          Amount:1,
        }]
      };
        expect(actions.callBackGetListAccountRequest(value).type).toEqual(RESPONSE_ACCOUNT_ORDER_DETAIL);
    });
    it('Test getDataWapper', () => {
      createDispatch();
      let currentPrice = {
        VolAsk:123,
        Ask:123,
        VolBid:123,
        Bid:123,
      };
      let itemReturn={
        AsizePrice : '123',
        SellPrice : '123',
        BsizePrice :'123',
        BuyPrice : '123'
      };
      let itemData=actions.getDataWapper(currentPrice);
        expect(itemData).toEqual(itemReturn);
    });


    it('Test loadingState', () => {
        expect(actions.loadingState()).toEqual({
             type: LOADING_ORDER_DETAIL
         });
    });
    it('Test unsubcribePrice', () => {
        expect(actions.unsubcribePrice()).not.toBeNull();
    });

    it('Test subcribePrice symbolId>0', () => {
      const expectedActions = [];
       const store = mockStore({}, expectedActions);
       let res = store.dispatch(actions.subcribePrice(1,true));
       expect(res).toEqual({
           type: LOADING_ORDER_DETAIL
       });

    });
    it('Test subcribePrice symbolId=0', () => {
      const expectedActions = [];
       const store = mockStore({}, expectedActions);
       let res = store.dispatch(actions.subcribePrice(0,true));
       expect(res.type).toEqual(RESPONSE_ORDER_DETAIL);

    });
    it('Test requestNewOrderSingle', () => {
      const expectedActions = [];
       const store = mockStore({}, expectedActions);
       let res = store.dispatch(actions.requestNewOrderSingle({}));
       expect(res).toEqual({
           type: LOADING_ORDER_DETAIL
       });

    });

    it('Test callbackNewOrderSingle', () => {
      createDispatch();
      let value = {
        ResourcesKeyEnum:'ResourcesKeyEnum'
      };
        expect(actions.callbackNewOrderSingle(value)).toEqual({
            type: RESPONSE_NEW_ORDER_ORDER_DETAIL,
            payload: value.ResourcesKeyEnum
        });
    });

    it('Test responseNewOrderSingle', () => {
      let payload='payload';
        expect(actions.responseNewOrderSingle(payload)).toEqual({
            type: RESPONSE_NEW_ORDER_ORDER_DETAIL,
            payload: payload
        });
    });

});
