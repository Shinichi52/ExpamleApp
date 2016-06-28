
'use strict';

jest.autoMockOff();


const {
  LOGOUT,
  FISRT_LOGIN_SUCCESS,
  SESSION_TOKEN_REQUEST,
  ON_AUTH_FORM_FIELD_CHANGE,
  LOGIN
} = require('../../../lib/constants').default;

let stateRef = {};
const authFormValidation = require('../authFormValidation').default;
describe('authFormValidation', () => {
    it('LOGOUT', () => {
        stateRef = {
            form:{
              state:LOGOUT
            }
        };
        let next = authFormValidation(stateRef);
        console.warn(JSON.stringify(next));
        expect(next.form.isValid).toBe(true);
    });

    it('LOGIN has Error', () => {
        stateRef = {
            form:{
              state:LOGIN,
              fields:{
                username:'',
                password:'',
              },
              isError:true
            }
        };
        let next = authFormValidation(stateRef);
        expect(next.form.isError).toBe(true);
        expect(next.form.isDisable).toBe(true);
    });
    it('LOGIN', () => {
        stateRef = {
            form:{
              state:LOGIN,
              fields:{
                username:'1',
                password:'1',
              },
              isError:false
            }
        };
        let next = authFormValidation(stateRef);
        expect(next.form.isError).toBe(false);
        expect(next.form.isDisable).toBe(false);
    });
    it('FISRT_LOGIN_SUCCESS', () => {
        stateRef = {
            form:{
              state:FISRT_LOGIN_SUCCESS,
              isFisrtLoginSuccess:true,
              fields:{
                username:'1',
                password:'1',
                smsPassword:''
              },
              isError:false
            }
        };
        let next = authFormValidation(stateRef);
        expect(next.form.isError).toBe(true);
        expect(next.form.isDisable).toBe(true);
    });
    it('ON_AUTH_FORM_FIELD_CHANGE', () => {
        stateRef = {
            form:{
              state:ON_AUTH_FORM_FIELD_CHANGE,
              isFisrtLoginSuccess:true,
              fields:{
                username:'1',
                password:'1',
                smsPassword:''
              },
              isError:false
            }
        };
        let next = authFormValidation(stateRef);
        expect(next.form.isError).toBe(true);
        expect(next.form.isDisable).toBe(true);
    });
    it('SESSION_TOKEN_REQUEST', () => {
        stateRef = {
            form:{
              state:SESSION_TOKEN_REQUEST,
              isFisrtLoginSuccess:true,
              fields:{
                username:'1',
                password:'1',
                smsPassword:''
              },
              isError:false
            }
        };
        let next = authFormValidation(stateRef);
        expect(next.form.isError).toBe(false);
    });

});
