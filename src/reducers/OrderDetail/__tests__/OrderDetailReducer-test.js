
'use strict';

jest.autoMockOff();

const {
  SET_STATE,
  LOADING_ORDER_DETAIL,
  RESPONSE_ORDER_DETAIL,
  RESPONSE_NEW_ORDER_ORDER_DETAIL,
  RESPONSE_ACCOUNT_ORDER_DETAIL,
  BROADCAST_PRICE_ORDER_DETAIL
} = require('../../../lib/constants').default;
const InitialState = require('./../OrderDetailInitialState').default;
const initialState = new InitialState;
const OrderDetailInitialState = require('../OrderDetailReducer').default;

describe('OrderDetailReducer', () => {
    it('LOADING_ORDER_DETAIL', () => {
        const action = {
            type: LOADING_ORDER_DETAIL
        };

        let next = OrderDetailInitialState(undefined, action);
        expect(next.form.fields.isBusy).toBe(true);
        expect(next.form.fields.ErrorCode).toBe('');
        expect(next.form.fields.IsResponseAccount).toBe(false);
    });

    it('RESPONSE_ACCOUNT_ORDER_DETAIL', () => {
        const action = {
            type: RESPONSE_ACCOUNT_ORDER_DETAIL,
            payload:{
              Amount:''
            }
        };

        let next = OrderDetailInitialState(undefined, action);
        expect(next.form.fields.cashTotal).toBe(action.payload.Amount);
        expect(next.form.fields.IsResponseAccount).toBe(true);
    });



    it('RESPONSE_ORDER_DETAIL', () => {
        const action = {
            type: RESPONSE_ORDER_DETAIL,
            payload:{
              BuyPrice:'BuyPrice',
              BsizePrice:'BsizePrice',
              SellPrice:'SellPrice',
              AsizePrice:'AsizePrice',
            }
        };

        let next = OrderDetailInitialState(undefined, action);
        expect(next.form.fields.isBusy).toBe(false);
        expect(next.form.fields.IsResponseAccount).toBe(false);
        expect(next.form.fields.ErrorCode).toBe('');
        expect(next.form.fields.BuyPrice).toBe(action.payload.BuyPrice);
        expect(next.form.fields.BsizePrice).toBe(action.payload.BsizePrice);
        expect(next.form.fields.SellPrice).toBe(action.payload.SellPrice);
        expect(next.form.fields.AsizePrice).toBe(action.payload.AsizePrice);
    });

    it('RESPONSE_NEW_ORDER_ORDER_DETAIL', () => {
        const action = {
            type: RESPONSE_NEW_ORDER_ORDER_DETAIL,
            payload:''
        };


        let next = OrderDetailInitialState(undefined, action);
        expect(next.form.fields.isBusy).toBe(false);
        expect(next.form.fields.IsResponseAccount).toBe(false);
        expect(next.form.fields.ErrorCode).toBe(action.payload);
    });


        it('BROADCAST_PRICE_ORDER_DETAIL', () => {
            const action = {
                type: BROADCAST_PRICE_ORDER_DETAIL,
                payload:{
                  BuyPrice:'BuyPrice',
                  BsizePrice:'BsizePrice',
                  SellPrice:'SellPrice',
                  AsizePrice:'AsizePrice',
                }
            };

            let next = OrderDetailInitialState(undefined, action);
            expect(next.form.fields.isBusy).toBe(false);
            expect(next.form.fields.IsResponseAccount).toBe(false);
            expect(next.form.fields.ErrorCode).toBe('');
            expect(next.form.fields.BuyPrice).toBe(action.payload.BuyPrice);
            expect(next.form.fields.BsizePrice).toBe(action.payload.BsizePrice);
            expect(next.form.fields.SellPrice).toBe(action.payload.SellPrice);
            expect(next.form.fields.AsizePrice).toBe(action.payload.AsizePrice);
        });

        it('type null', () => {
            const action = {
                type: null
            };

            let next = OrderDetailInitialState(undefined, action);
            expect(next.form.fields.isBusy).toBe(true);
        });


});
