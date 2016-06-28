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

const InitialState = require('./../openPositionInitialState').default;


const openPositionReducer = require('../openPositionReducer').default;

const Global = require('./../../../lib/enum/Global');

const {
    Record
} = require('immutable');

const {
    SET_STATE,
    LOADING_OPEN_POSITION_INFO,
    RESPONSE_OPEN_POSITION_INFO,
    REALTIME_OPEN_POSITION_INFO,
    PENDING_OPEN_POSITION_INFO
    } = require('../../../lib/constants').default;


describe('openPositionReducer',() =>{
    it('Test Loading' , () =>{
        const action = {
            type : LOADING_OPEN_POSITION_INFO
        };
        let next = openPositionReducer(undefined,action);
        expect(next.form.isBusy).toBe(true);
    });
    it('Test Response' , () =>{
        const action = {
            type : RESPONSE_OPEN_POSITION_INFO,
            payload : {
                ListReturn : [],
                listAccAmountInfoReturn : []
            }
        }

        let next = openPositionReducer(undefined,action);
        expect(next.form.isBusy).toBe(false);
        expect(next.form.fields.listPosition).toEqual(action.payload.ListReturn);
        expect(next.form.fields.lissAccAmountInfo).toEqual(action.payload.listAccAmountInfoReturn);
    });
    it('Test Return Default' , () =>{
        const action = {
            type : SET_STATE,
        }
        let next = openPositionReducer(undefined,action);
        expect(next.form.state).toEqual(SET_STATE);
    });
    it('Test Is Not InitialState', () =>{
        const Form = Record({
            state : SET_STATE
        });
        var init = Record({
            form : new Form
        });
        var stateC = new init;
        const action = {
            type : SET_STATE,
        }
        let next = openPositionReducer(stateC,action);
        expect(next.form.state).toEqual(SET_STATE);
    });
    it('Test Realtime Data', () => {
        const action = {
            type : REALTIME_OPEN_POSITION_INFO,
        };
        let next = openPositionReducer(undefined,action);
        expect(next.form.state).toEqual(PENDING_OPEN_POSITION_INFO);
    });

    it('Test Realtime Data null', () => {
        const state = new InitialState;
        let stateR = state;
        stateR = stateR.setIn(['form','fields','listPosition'],null)
                .setIn(['form','fields','lissAccAmountInfo'],null)
                .setIn(['form', 'state'], REALTIME_OPEN_POSITION_INFO);
        const action = {
            type : REALTIME_OPEN_POSITION_INFO,
        };
        let next = openPositionReducer(stateR,action);
        expect(next.form.state).toEqual(PENDING_OPEN_POSITION_INFO);
    });
});