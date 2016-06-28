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
var actions = require('../authActions');

const BroadcastKey = require('./../../../lib/enum/BroadcastKey');
import RNRF, {
  Route,
  Scene,
  TabBar} from 'react-native-router-flux';

/**
 * ## Imports
 *
 * actions under test
 */
const {
    SESSION_TOKEN_REQUEST,
    SESSION_TOKEN_SUCCESS,

    SESSION_TOKEN_FAILURE,

    DELETE_TOKEN_REQUEST,
    DELETE_TOKEN_SUCCESS,
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
    ON_AUTH_FORM_FIELD_CHANGE,
    LOGIN_FAILURE,
    RESEND_SMS_PASS_SUCESS,
    RESEND_SMS_PASS_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    RESEND_SMS_PASS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,

    LOADING_USERLAYOUT
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
    /**
     * ### simple tests that prove the actions have the specific type
     */
    it('Test module test', () => {
        expect(true).toBe(true);
    });




    it('Test Logout', async () => {

        const expectedActions = [];
         const store = mockStore({}, expectedActions);
         let res = store.dispatch(actions.logout());
         console.warn(JSON.stringify(res));
         expect(res).toEqual({
              type: LOGOUT_SUCCESS
          });
    });

    it('Test Logout callback', () => {
        expect(actions.callbaclLogout()).toBe(true);
    });



    it('Test getSessionToken', () => {

      const expectedActions = [];
       const store = mockStore({}, expectedActions);
       let res = store.dispatch(actions.getSessionToken());
       expect(res).toEqual({
            type: LOGIN
        });

    });

    it('Test logoutState', () => {
        expect(actions.logoutState()).toEqual({
            type: LOGOUT
        });
    });
    it('Test loginState', () => {
        expect(actions.loginState()).toEqual({
            type: LOGIN
        });
    });
    it('Test logoutRequest', () => {
        expect(actions.logoutRequest()).toEqual({
            type: LOGOUT_REQUEST
        });
    });

    it('Test logoutSuccess', () => {
        expect(actions.logoutSuccess()).toEqual({
            type: LOGOUT_SUCCESS
        });
    });

    it('Test onAuthFormFieldChange', () => {
        let field = 'field';
        let value = 'value';
        expect(actions.onAuthFormFieldChange(field, value)).toEqual({
            type: ON_AUTH_FORM_FIELD_CHANGE,
            payload: {
                field: field,
                value: value
            }
        });
    });
    it('Test resendOtpPassWordSuccess', () => {

        expect(actions.resendOtpPassWordSuccess()).toEqual({
            type: RESEND_SMS_PASS_SUCESS
        });
    });
    it('Test resendOtpPassWordFail', () => {

        let value = 'value';
        expect(actions.resendOtpPassWordFail(value)).toEqual({
            type: RESEND_SMS_PASS_FAIL,
            payload: value
        });
    });
    it('Test loginRequest', () => {

        expect(actions.loginRequest()).toEqual({
            type: LOGIN_REQUEST
        });
    });
    it('Test loginSuccess', () => {

        let value = 'value';
        expect(actions.loginSuccess(value)).toEqual({
            type: LOGIN_SUCCESS,
            payload: value
        });
    });
    it('Test loadUserLayout', () => {

        let value = 'value';
        expect(actions.loadUserLayout(value)).toEqual({
            type: LOADING_USERLAYOUT
        });
    });

    it('Test fisrtLoginSuccess', () => {
        let json = 'value';
        expect(actions.fisrtLoginSuccess(json)).toEqual({
            type: FISRT_LOGIN_SUCCESS,
            payload: json
        });
    });
    it('Test loginFailure', () => {

        let json = 'value';
        expect(actions.loginFailure(json)).toEqual({
            type: LOGIN_FAILURE,
            payload: json
        });
    });
    it('Test onBroadcastReceived', () => {
      createDispatch();
        let reason = 'reason';
        let dataKey = BroadcastKey.NetworkStatus;
        let message = {
            IsConnected: false,
            Reason: reason
        }

        expect(actions.onBroadcastReceived(dataKey, message)).toEqual({
            type: LOGIN_FAILURE,
            payload: reason
        });
    });
    it('Test callbackLogin Fail', () => {

        createDispatch();
        let reason = 'reason';
        let message = {
            IsConnected: false,
            ResourcesKeyEnum: reason
        }

        expect(actions.callbackLogin(message)).toEqual({
            type: LOGIN_FAILURE,
            payload: reason
        });
    });
    it('Test callbackLogin Success', () => {

      createDispatch();

        let reason = 'reason';
        let message = {
            IsSuccess: true,
            ResourcesKeyEnum: reason
        }
        expect(actions.callbackLogin(message)).toEqual({
            type: FISRT_LOGIN_SUCCESS,
            payload: message
        });
    });


    it('Test callbackGetUserLayout', () => {
        createDispatch();
        let reason = 'reason';
        let message = {
            UserLayout: reason
        }
        expect(actions.callbackGetUserLayout(message)).toEqual({
            type: LOADING_USERLAYOUT
        });
    });

    it('Test callbackSecondLogin Success', () => {
        createDispatch();
        let reason = 'reason';
        let message = {
            IsSuccess: true,
            ResourcesKeyEnum: reason
        }
        expect(actions.callbackSecondLogin(message)).toBe(true);
    });

    it('Test callbackSecondLogin Fail', () => {
      createDispatch();
        let reason = 'reason';
        let message = {
            IsSuccess: false,
            ResourcesKeyEnum: reason
        }
        expect(actions.callbackSecondLogin(message)).toEqual({
            type: LOGIN_FAILURE,
            payload: reason
        });
    });

    it('Test login first', () => {

      const expectedActions = [];
      const store = mockStore({}, expectedActions);
        let username = 'reason';
        let password = 'reason';
        let res=store.dispatch(actions.login(username,password));
        expect(res).toEqual({
            type: LOGIN_REQUEST
        });
    });
    it('Test login secondLogin', () => {
      const expectedActions = [];
      const store = mockStore({}, expectedActions);
        let username = 'reason';
        let password = 'reason';
        let otp = 'reason';
        let res=store.dispatch(actions.login(username,password,otp));
        expect(res).toEqual({
            type: LOGIN_REQUEST
        });
    });

    it('Test login resendSmsPassword', () => {
        let username = 'reason';
        let password = 'reason';
        let otp = 'reason';
        const expectedActions = [];
        const store = mockStore({}, expectedActions);
        let res=store.dispatch(actions.resendSmsPassword(username,password));
        expect(res).toEqual({
            type: RESEND_SMS_PASS
        });
    });


    it('Test callbackResednSmsPassword success', () => {
      createDispatch();
        let reason = 'reason';
        let message = {
            IsSuccess: true,
            ResourcesKeyEnum: reason
        }
        expect(actions.callbackResednSmsPassword(message)).toEqual({
            type: RESEND_SMS_PASS_SUCESS
        });
    });

    it('Test callbackResednSmsPassword Fail', () => {
      createDispatch();
        let reason = 'reason';
        let message = {
            IsSuccess: false,
            ResourcesKeyEnum: reason
        }
        expect(actions.callbackResednSmsPassword(message)).toEqual({
            type: RESEND_SMS_PASS_FAIL,
            payload: reason
        });
    });
});
