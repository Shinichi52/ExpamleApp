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
var actions = require('../WatchListAction');

const BroadcastKey = require('./../../../lib/enum/BroadcastKey');
import RNRF, {
  Route,
  Scene,
  TabBar} from 'react-native-router-flux';

  import {
      convertToDatetime,
      getDateTimeFullString,

  }
  from './../../../lib/base/DateTime';
  import {
      StringFormat,
      formatNumber,
      getJsonMsg
  }
  from './../../../lib/base/FunctionUtils';
/**
 * ## Imports
 *
 * actions under test
 */
const {
  LOADING_WATCH_LIST,
  RESPONSE_WATCH_LIST,
  REALTIME_WATCH_LIST,
  BROADCAST_PRICE
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
Global.DicSymbol={};
Global.DicSymbol[1]={SymbolId:1};
let currentLayout={
  ListSymbolId:[1,2]
};
let currentLayoutString=getJsonMsg(currentLayout);
Global.UserLayout={
  CurrentLayout:currentLayoutString
};

function createDispatch() {
    const expectedActions = [];
   const store = mockStore({}, expectedActions);
   store.dispatch(actions.subcribePrice([1],true,{1:{}}));
}

/**
 * ## Tests
 *
 * authActions
 */
const expectedActions = [];
const store = mockStore({}, expectedActions);
describe('WatchListAction', () => {
  it('Test subcribePrice ListsymbolId.length>0', () => {
    const expectedActions = [];
     const store = mockStore({}, expectedActions);
     let res = store.dispatch(actions.subcribePrice([1],true));
     expect(res).toEqual({
         type: LOADING_WATCH_LIST
     });
  });

  it('Test subcribePrice ListsymbolId.length=0', () => {
    const expectedActions = [];
     const store = mockStore({}, expectedActions);
     let res = store.dispatch(actions.subcribePrice([],true,{1:{}}));
     expect(res.type).toEqual(RESPONSE_WATCH_LIST);
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
        expect(actions.onBroadcastReceived(BroadcastKey.UpdateCurrentPrice,value).type).toEqual(BROADCAST_PRICE);
    });




        it('Test responsePriceSub', () => {
          let value = 'value';
            expect(actions.responsePriceSub(value)).toEqual({
                 type: RESPONSE_WATCH_LIST,
                 payload:value
             });
        });


        it('Test broadcastCurentPrice', () => {
          let value = 'value';
            expect(actions.broadcastCurentPrice(value)).toEqual({
                 type: BROADCAST_PRICE,
                 payload:value
             });
        });
        it('Test actionBuySellClick', () => {
          let value = 'value';
            expect(actions.actionBuySellClick(true,{})).not.toBeNull();
        });

    it('Test callBackPriceSubscribeRequest', () => {
      createDispatch();
      let value = {
        ListCurrentPrice:[{
          SymbolId:1,
        }]
      };
        expect(actions.callBackPriceSubscribeRequest(value).type).toEqual(RESPONSE_WATCH_LIST);
    });


    it('Test getDataWapper', () => {
      createDispatch();
      let currentPrice = {
        SymbolId:1,
      };

      let itemData=actions.getDataWapper(currentPrice);
        expect(itemData.SymbolId).toEqual(currentPrice.SymbolId);
    });


    it('Test loadingState', () => {
        expect(actions.loadingState()).toEqual({
             type: LOADING_WATCH_LIST
         });
    });



});
