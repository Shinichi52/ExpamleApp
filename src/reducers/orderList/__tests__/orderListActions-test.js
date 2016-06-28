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
var actions = require('../orderListActions');

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
  LOADING_ORDER_LIST,
  RESPONSE_ORDER_LIST,
  REALTIME_ORDER_LIST
} = require('../../../lib/constants').default;


function createDispatch() {
    const expectedActions = [];
   const store = mockStore({}, expectedActions);
   store.dispatch(actions.login('a','v'));
}

/**
 * ## Tests
 *
 * authActions
 */
describe('authActions', () => {

    it('Test loadingState', () => {
        expect(actions.loadingState()).toEqual({
             type: LOADING_ORDER_LIST
         });
    });

    it('Test responseState', () => {
      let value = 'value';
        expect(actions.responseState(value)).toEqual({
             type: RESPONSE_ORDER_LIST,
             payload:value
         });
    });
    it('Test realTimeState', () => {
      let value = 'value';
        expect(actions.realTimeState(value)).toEqual({
             type: REALTIME_ORDER_LIST,
             payload:value
         });
    });



    it('Test getListTradingDealRequest', () => {
      const expectedActions = [];
       const store = mockStore({}, expectedActions);
       let res = store.dispatch(actions.getListTradingDealRequest());
       expect(res).toEqual({
            type: LOADING_ORDER_LIST
        });

    });

    it('Test getDataWapper', () => {
      const initTime=new Date();
      const itemData = {
        InitTime:initTime,
        SymbolName:'SymbolName',
        ChainOrderId:'ChainOrderId',
        OrderType:'OrderType',
        AvgPx:0,
        TimeInForce:'TimeInForce',
        IsBuy:false,
        CumQty:0,
        Quantity:0,
        Price:0,
        StopPx:0,
      };
      const listOt=[
        {
          DoneTime:initTime,
          Quantity:0,
          Price:0,
        }
      ];

      let itemReturn=actions.getDataWapper(itemData,listOt);
        expect(itemReturn.symbolName).toEqual(itemData.SymbolName);
        expect(itemReturn.ID).toEqual(itemData.ChainOrderId);
        expect(itemReturn.orderType).toEqual(itemData.OrderType);
        expect(itemReturn.duration).toEqual(itemData.TimeInForce);
    });

    it('Test callBackGetListTradingDealRequest', () => {
        const expectedActions = [];
       const store = mockStore({}, expectedActions);
       store.dispatch(actions.getListTradingDealRequest());
       let msg={
         ListOrderTransaction:[
           {
             ClientOrderId:'ClientOrderId'
           }
         ],
         ListTradingDeal:[
           {
             ClientOrderId:'ClientOrderId',
             CurrentState:'FILLED'
           },
           {
             ClientOrderId:'ClientOrderId',
             CurrentState:'CANCELED'
           },
           {
             ClientOrderId:'ClientOrderId',
             CurrentState:'PENDING_CANCELED'
           }
         ]
       };

       expect(actions.callBackGetListTradingDealRequest(msg).type).toEqual(RESPONSE_ORDER_LIST);

    });
    it('Test callBackGetListTradingDealRequest NULL', () => {
        const expectedActions = [];
       const store = mockStore({}, expectedActions);
       store.dispatch(actions.getListTradingDealRequest());
       let msg={
         ListOrderTransaction:null,
         ListTradingDeal:null
       };

       expect(actions.callBackGetListTradingDealRequest(msg).type).toEqual(RESPONSE_ORDER_LIST);

    });
    it('Test callBackGetListTradingDealRequest OrderTran = Null TradingDeal != Null', () => {
        const expectedActions = [];
       const store = mockStore({}, expectedActions);
       store.dispatch(actions.getListTradingDealRequest());
       let msg={
         ListOrderTransaction:null,
         ListTradingDeal:[
           {
             ClientOrderId:'ClientOrderId',
             CurrentState:'FILLED'
           }
         ]
       };

       expect(actions.callBackGetListTradingDealRequest(msg).type).toEqual(RESPONSE_ORDER_LIST);

    });
    it('Test callBackGetListTradingDealRequest OrderTran != Null TradingDeal = Null', () => {
        const expectedActions = [];
       const store = mockStore({}, expectedActions);
       store.dispatch(actions.getListTradingDealRequest());
       let msg={
         ListOrderTransaction:[
           {
             ClientOrderId:'ClientOrderId'
           }
         ],
         ListTradingDeal:null
       };

       expect(actions.callBackGetListTradingDealRequest(msg).type).toEqual(RESPONSE_ORDER_LIST);

    });

});
