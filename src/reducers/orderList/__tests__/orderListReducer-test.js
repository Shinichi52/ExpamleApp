
'use strict';

jest.autoMockOff();

const {
  SET_STATE,
  LOADING_ORDER_LIST,
  REJECT_ORDER_LIST,
  REALTIME_ORDER_LIST,
  PENDING_REALTIME_ORDER_LIST,
  RESPONSE_ORDER_LIST
} = require('../../../lib/constants').default;
const InitialState = require('./../orderListInitialState').default;
const initialState = new InitialState;
const orderListReducer = require('../orderListReducer').default;
let formType={
  'Fill':'Fill',
  'Cancel':'Cancel',
  'Working':'Working'
};
describe('orderListReducer', () => {

    it('LOADING', () => {

        const action = {
            type: LOADING_ORDER_LIST
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.isBusy).toBe(true);
    });
    it('RESPONSE', () => {

        const action = {
            type: RESPONSE_ORDER_LIST,
            payload:{
              ListReturn:[],
              ListReturnFill:[],
              ListReturnCancel:[]
            }
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.isBusy).toBe(false);
        expect(next.form.fields.listData).toEqual(action.payload.ListReturn);
        expect(next.form.fields.listDataFill).toEqual(action.payload.ListReturnFill);
        expect(next.form.fields.listDataCancel).toEqual(action.payload.ListReturnCancel);

    });
    it('REALTIME FILL' , () => {
        let state={
          form:{
            fields:{
              listData:[],
              listDataFill:[],
              listDataCancel:[],
            }
          }
        };

        const action = {
            type: REALTIME_ORDER_LIST,
            payload:{
              typeForm:formType.Fill,
              ID:'id'
            }
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(PENDING_REALTIME_ORDER_LIST);
    });
    it('REALTIME CANCEL' , () => {
        let state={
          form:{
            fields:{
              listData:[],
              listDataFill:[],
              listDataCancel:[],
            }
          }
        };

        const action = {
            type: REALTIME_ORDER_LIST,
            payload:{
              typeForm:formType.Cancel,
              ID:'id'
            }
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(PENDING_REALTIME_ORDER_LIST);
    });
    it('REALTIME WORKING' , () => {
        let state={
          form:{
            fields:{
              listData:[],
              listDataFill:[],
              listDataCancel:[],
            }
          }
        };

        const action = {
            type: REALTIME_ORDER_LIST,
            payload:{
              typeForm:formType.Working,
              ID:'id'
            }
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(PENDING_REALTIME_ORDER_LIST);
    });
    it('REALTIME WORKING NULL' , () => {
        let state={
          form:{
            fields:{
              listData:null,
              listDataFill:[],
              listDataCancel:[],
            }
          }
        };

        const action = {
            type: REALTIME_ORDER_LIST,
            payload:{
              typeForm:formType.Working,
              ID:'id'
            }
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(PENDING_REALTIME_ORDER_LIST);
    });
    it('REALTIME WORKING SAME' , () => {
        let state={
          form:{
            fields:{
              listData:[{ID:'id'}],
              listDataFill:[],
              listDataCancel:[],
            }
          }
        };

        const action = {
            type: REALTIME_ORDER_LIST,
            payload:{
              typeForm:formType.Working,
              ID:'id'
            }
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(PENDING_REALTIME_ORDER_LIST);
    });
    it('REALTIME WORKING NULL DATA' , () => {
        let state={
          form:{
            fields:{
              listData:null,
            }
          }
        };

        const action = {
            type: REALTIME_ORDER_LIST,
            payload:{
              typeForm:formType.Working,
              ID:'id'
            }
        };
        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(PENDING_REALTIME_ORDER_LIST);
    });


    it('RETURN DEFAULT' , () => {
        const action = {
            type: SET_STATE,
            payload:{
              typeForm:formType.Working,
              ID:'id'
            }
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(REJECT_ORDER_LIST);
    });

    it('RETURN REJECT' , () => {
        const action = {
            type: 'FISRT_LOGIN_SUCCESS',
        };

        let next = orderListReducer(undefined, action);
        expect(next.form.state).toEqual(REJECT_ORDER_LIST);
    });

});
