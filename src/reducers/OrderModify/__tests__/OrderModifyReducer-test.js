
'use strict';

jest.autoMockOff();

const {
  SET_STATE,
  LOADING_MODIFY_ORDER,
  RESPONSE_MODIFY_ORDER,
  RESPONSE_UPDATE_ORDER_MODIFY_ORDER,
  RESPONSE_ACCOUNT_MODIFY_ORDER,
  BROADCAST_PRICE__MODIFY_ORDER
} = require('../../../lib/constants').default;
const InitialState = require('./../OrderModifyInitialState').default;
const initialState = new InitialState;
const OrderModifyInitialState = require('../OrderModifyReducer').default;

describe('OrderDetailReducer', () => {
    it('LOADING_MODIFY_ORDER', () => {
        const action = {
            type: LOADING_MODIFY_ORDER
        };

        let next = OrderModifyInitialState(undefined, action);
        expect(next.form.fields.isBusy).toBe(true);
        expect(next.form.fields.ErrorCode).toBe('');
        expect(next.form.fields.IsResponseAccount).toBe(false);
    });

    it('RESPONSE_ACCOUNT_MODIFY_ORDER', () => {
        const action = {
            type: RESPONSE_ACCOUNT_MODIFY_ORDER,
            payload:{
              Amount:''
            }
        };

        let next = OrderModifyInitialState(undefined, action);
        expect(next.form.fields.cashTotal).toBe(action.payload.Amount);
        expect(next.form.fields.IsResponseAccount).toBe(true);
    });



    it('RESPONSE_MODIFY_ORDER', () => {
        const action = {
            type: RESPONSE_MODIFY_ORDER,
            payload:{
              BuyPrice:'BuyPrice',
              BsizePrice:'BsizePrice',
              SellPrice:'SellPrice',
              AsizePrice:'AsizePrice',
            }
        };

        let next = OrderModifyInitialState(undefined, action);
        expect(next.form.fields.isBusy).toBe(false);
        expect(next.form.fields.IsResponseAccount).toBe(false);
        expect(next.form.fields.ErrorCode).toBe('');
        expect(next.form.fields.BuyPrice).toBe(action.payload.BuyPrice);
        expect(next.form.fields.BsizePrice).toBe(action.payload.BsizePrice);
        expect(next.form.fields.SellPrice).toBe(action.payload.SellPrice);
        expect(next.form.fields.AsizePrice).toBe(action.payload.AsizePrice);
    });

    it('RESPONSE_UPDATE_ORDER_MODIFY_ORDER', () => {
        const action = {
            type: RESPONSE_UPDATE_ORDER_MODIFY_ORDER,
            payload:''
        };


        let next = OrderModifyInitialState(undefined, action);
        expect(next.form.fields.isBusy).toBe(false);
        expect(next.form.fields.IsResponseAccount).toBe(false);
        expect(next.form.fields.ErrorCode).toBe(action.payload);
    });


        it('BROADCAST_PRICE__MODIFY_ORDER', () => {
            const action = {
                type: BROADCAST_PRICE__MODIFY_ORDER,
                payload:{
                  BuyPrice:'BuyPrice',
                  BsizePrice:'BsizePrice',
                  SellPrice:'SellPrice',
                  AsizePrice:'AsizePrice',
                }
            };

            let next = OrderModifyInitialState(undefined, action);
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

            let next = OrderModifyInitialState(undefined, action);
            expect(next.form.fields.isBusy).toBe(true);
        });


});
