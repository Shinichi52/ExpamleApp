
'use strict';

jest.autoMockOff();

const {
  SET_STATE,
  LOADING_WATCH_LIST,
  REALTIME_WATCH_LIST,
  PENDING_BROADCAST_PRICE,
  RESPONSE_WATCH_LIST,
  BROADCAST_PRICE
} = require('../../../lib/constants').default;
const InitialState = require('./../WatchListActionInitialState').default;
const initialState = new InitialState;
const WatchListActionReducer = require('../WatchListActionReducer').default;
let stateTemp=initialState.mergeDeep(null);

describe('WatchListActionReducer', () => {

    it('LOADING_WATCH_LIST', () => {
        const action = {
            type: LOADING_WATCH_LIST
        };

        let next = WatchListActionReducer(undefined, action);
        expect(next.form.fields.isBusy).toBe(true);
    });

    it('RESPONSE_WATCH_LIST', () => {
        const action = {
            type: RESPONSE_WATCH_LIST,
            payload:[]
        };

        let next = WatchListActionReducer(undefined, action);
        expect(next.form.fields.isBusy).toBe(false);
        expect(next.form.fields.listData).toBe(action.payload);
    });
    it('BROADCAST_PRICE', () => {
      let nextStateTemp = stateTemp.setIn(['form', 'fields', 'listData'], [
        {
          SymbolId:1,
          TestProperty:''
        }
      ]);
        const action = {
            type: BROADCAST_PRICE,
            payload:[
              {
                SymbolId:1,
                TestProperty:'TestProperty'
              }
            ]
        };
        let listDataCompare=[
          {
            SymbolId:1,
            TestProperty:'TestProperty'
          }
        ];
        let next = WatchListActionReducer(nextStateTemp, action);
        expect(next.form.fields.isBusy).toBe(false);
        expect(next.form.fields.listData).toEqual(listDataCompare);
        expect(next.form.state).toEqual(PENDING_BROADCAST_PRICE);
    });

    it('type null', () => {
        const action = {
            type: null
        };

        let next = WatchListActionReducer(undefined, action);
        expect(next.form.fields.isBusy).toBe(true);
    });


});
