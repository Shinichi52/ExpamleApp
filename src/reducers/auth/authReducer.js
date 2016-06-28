/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./authInitialState').default;
const fieldValidation = require('../../lib/fieldValidation').default;
const formValidation = require('./authFormValidation').default;

/**
 * ## Auth actions
 */
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
} = require('../../lib/constants').default;

const initialState = new InitialState;
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    state = state.setIn(['form', 'state'], action.type).setIn(['form', 'isError'], false);
    switch (action.type) {
        /**
         * ### Requests start
         * set the form to fetching and clear any errors
         */
        case LOGIN_REQUEST:
            let nextState = state.setIn(['form', 'isFetching'], true)
                .setIn(['form', 'isBusy'], true)
                .setIn(['form', 'isDisable'], true)
                .setIn(['form', 'error'], null);
            return nextState;

        case FISRT_LOGIN_SUCCESS:
            let nextState1 = state.setIn(['form', 'isFetching'], true)
                .setIn(['form', 'isFisrtLoginSuccess'], true)
                .setIn(['form', 'isError'], false)
                .setIn(['form', 'isBusy'], false)
                .setIn(['form', 'isDisable'], true)
                .setIn(['form', 'errorText'], null);
            state = nextState1;
            return nextState1;


        case LOGIN:
            let itemState1=
                state.setIn(['form', 'state'], action.type)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isError'], false)
                .setIn(['form', 'isBusy'], false)
                .setIn(['form', 'isDisable'], false)
                .setIn(['form', 'errorText'], '');
              state = itemState1;
            return itemState1;
            /**
             * ### Auth form field change
             *
             * Set the form's field with the value
             * Clear the forms error
             * Pass the fieldValidation results to the
             * the formValidation
             */
        case ON_AUTH_FORM_FIELD_CHANGE:
            {
                const {
                    field,
                    value
                } = action.payload;
                let nextState = state.setIn(['form', 'fields', field], value)
                    .setIn(['form', 'error'], null);

                var finalState = formValidation(fieldValidation(nextState, action), action);
                finalState.isDisable = finalState.isError;
                return finalState;
            }

        case LOGOUT_SUCCESS:
            return state.setIn(['form', 'fields', 'username'], '')
                .setIn(['form', 'fields', 'password'], '')
                .setIn(['form', 'fields', 'smsPassword'], '')
                .setIn(['form', 'isBusy'], false)
                .setIn(['form', 'isFisrtLoginSuccess'], false)
                .setIn(['form', 'isDisable'], false);


        case LOGIN_FAILURE:
            return state.setIn(['form', 'isError'], true)
                .setIn(['form', 'isDisable'], false)
                .setIn(['form', 'isBusy'], false)
                .setIn(['form', 'errorText'], action.payload);

            /**
             * ### Hot Loading support
             *
             * Set all the field values from the payload
             */

        case RESEND_SMS_PASS:
            return state.setIn(['form', 'state'], action.type)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isError'], false)
                .setIn(['form', 'isBusy'], true)
                .setIn(['form', 'isDisable'], true)
                .setIn(['form', 'errorText'], '');

        case RESEND_SMS_PASS_FAIL:
            return state.setIn(['form', 'state'], action.type)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isError'], true)
                .setIn(['form', 'isBusy'], false)
                .setIn(['form', 'isDisable'], false)
                .setIn(['form', 'errorText'], action.payload);

        case RESEND_SMS_PASS_SUCESS:
            return state.setIn(['form', 'state'], action.type)
                .setIn(['form', 'error'], null)
                .setIn(['form', 'isError'], false)
                .setIn(['form', 'isBusy'], false)
                .setIn(['form', 'isDisable'], false)
                .setIn(['form', 'errorText'], '');
        case LOADING_USERLAYOUT:
        return state;
    }
    /**
     * ## Default
     */
    return state;
}
