
'use strict';

jest.autoMockOff();

const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,
  RESEND_SMS_PASS,
  FISRT_LOGIN_SUCCESS,

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESEND_SMS_PASS_SUCESS,
  RESEND_SMS_PASS_FAIL,
  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  SET_STATE,
    LOADING_USERLAYOUT
} = require('../../../lib/constants').default;


const authReducer = require('../authReducer').default;

describe('authReducer', () => {
    it('Test module test', () => {
        expect(true).toBe(true);
    });

    it('LOGIN_REQUEST', () => {

        const action = {
            type: LOGIN_REQUEST
        };

        let next = authReducer(undefined, action);
        expect(next.form.isFetching).toBe(true);
        expect(next.form.isBusy).toBe(true);
        expect(next.form.isDisable).toBe(true);
        expect(next.form.error).toBe(null);
    });
    it('FISRT_LOGIN_SUCCESS', () => {

        const action = {
            type: FISRT_LOGIN_SUCCESS
        };

        let next = authReducer(undefined, action);
        expect(next.form.isFetching).toBe(true);
        expect(next.form.isFisrtLoginSuccess).toBe(true);
        expect(next.form.isError).toBe(false);
        expect(next.form.isBusy).toBe(false);
        expect(next.form.isDisable).toBe(true);
        expect(next.form.errorText).toBeNull();

    });
    it('LOGIN', () => {

        const action = {
            type: LOGIN
        };

        let next = authReducer(undefined, action);

        expect(next.form.state).toEqual(action.type);
        expect(next.form.error).toBeNull();
        expect(next.form.isError).toBe(false);
        expect(next.form.isBusy).toBe(false);
        expect(next.form.isDisable).toBe(false);
        expect(next.form.errorText).toBe('');
    });
    it('ON_AUTH_FORM_FIELD_CHANGE', () => {

        const action = {
            type: ON_AUTH_FORM_FIELD_CHANGE,
            payload:{
              field:'username',
              value:''
            }
        };

        let next = authReducer(undefined, action);
        expect(next.form.fields[action.payload.field]).toEqual(action.payload.value);
        expect(next.form.error).toBeNull();

    });
    it('LOGIN_FAILURE', () => {

        const action = {
            type: LOGIN_FAILURE,
            payload:''
        };

        let next = authReducer(undefined, action);
        expect(next.form.isError).toBe(true);
        expect(next.form.isDisable).toBe(false);
        expect(next.form.isBusy).toBe(false);
        expect(next.form.errorText).toEqual(action.payload);

    });
    it('RESEND_SMS_PASS', () => {

        const action = {
            type: RESEND_SMS_PASS,
            payload:''
        };


        let next = authReducer(undefined, action);
        expect(next.form.state).toEqual(action.type);
        expect(next.form.error).toBeNull();
        expect(next.form.isError).toBe(false);
        expect(next.form.isBusy).toBe(true);
        expect(next.form.isDisable).toBe(true);
        expect(next.form.errorText).toEqual('');
    });
    it('RESEND_SMS_PASS_FAIL', () => {

        const action = {
            type: RESEND_SMS_PASS_FAIL,
            payload:''
        };

        let next = authReducer(undefined, action);
        expect(next.form.state).toEqual(action.type);
        expect(next.form.error).toBeNull();
        expect(next.form.isError).toBe(true);
        expect(next.form.isBusy).toBe(false);
        expect(next.form.isDisable).toBe(false);
        expect(next.form.errorText).toEqual(action.payload);
    });
    it('RESEND_SMS_PASS_SUCESS', () => {

        const action = {
            type: RESEND_SMS_PASS_SUCESS,
            payload:''
        };

        let next = authReducer(undefined, action);
        expect(next.form.state).toEqual(action.type);
        expect(next.form.error).toBeNull();
        expect(next.form.isError).toBe(false);
        expect(next.form.isBusy).toBe(false);
        expect(next.form.isDisable).toBe(false);
        expect(next.form.errorText).toEqual('');
    });
    it('LOADING_USERLAYOUT', () => {

        const action = {
            type: LOADING_USERLAYOUT,
            payload:''
        };

        let next = authReducer(undefined, action);
        expect(next.form.state).toEqual(action.type);
    });
    it('LOGOUT_SUCCESS', () => {

        const action = {
            type: LOGOUT_SUCCESS,
            payload:''
        };

        let next = authReducer(undefined, action);
        expect(next.form.state).toEqual(action.type);
    });
    it('SET_STATE', () => {

        const action = {
            type: SET_STATE,
            payload:''
        };

        let next = authReducer(undefined, action);
        expect(next.form.state).toEqual(action.type);
    });
}); //authReducer
