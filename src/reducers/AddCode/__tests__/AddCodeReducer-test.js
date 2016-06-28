
'use strict';

jest.autoMockOff();

const {
  SET_STATE,
  LOADING_ADD_CODE,
  RESPONSE_UPDATE_USERLAYOUT,
  REALTIME_ADD_CODE,
  RESPONSE_ADD_CODE
} = require('../../../lib/constants').default;


const AddCodeReducer = require('../AddCodeReducer').default;

describe('AddCodeReducer', () => {
    it('State Has Value', () => {
      let state={

      }
        const action = {
            type: LOADING_ADD_CODE
        };

        let next = AddCodeReducer(state, action);
        expect(true).toBe(true);
    });
    it('LOADING_ADD_CODE', () => {
        const action = {
            type: LOADING_ADD_CODE
        };

        let next = AddCodeReducer(undefined, action);
        expect(next.form.isBusy).toBe(true);
    });

    it('RESPONSE_ADD_CODE', () => {
        const action = {
            type: RESPONSE_ADD_CODE,
            payload:[1,2]
        };

        let next = AddCodeReducer(undefined, action);
        expect(next.form.isBusy).toEqual(false);
        expect(next.form.fields.listData).toEqual(action.payload);

    });
    it('RESPONSE_UPDATE_USERLAYOUT', () => {
        const action = {
            type: RESPONSE_UPDATE_USERLAYOUT,
            payload:'ErrorCode'
        };

        let next = AddCodeReducer(undefined, action);
        expect(next.form.isBusy).toEqual(false);
        expect(next.form.ErrorCode).toEqual(action.payload);

    });
    it('REALTIME_ADD_CODE', () => {
        const action = {
            type: REALTIME_ADD_CODE
        };

        let next = AddCodeReducer(undefined, action);
        expect(next.form.state).toEqual(action.type);

    });

}); //AddCodeReducer
