/**
 * # authFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict';

/**
 * ## Imports
 * the actions being addressed
 */
 const InitialState = require('./authInitialState').default;
 const initialState = new InitialState;
const {
    LOGOUT,
    FISRT_LOGIN_SUCCESS,
    ON_AUTH_FORM_FIELD_CHANGE,
    SESSION_TOKEN_REQUEST,
    LOGIN
} = require('../../lib/constants').default;
/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation(state) {
    if (!(state instanceof InitialState)) state= initialState.mergeDeep(state);
    switch (state.form.state) {
        /**
         * ### Logout has no fields, so always valid
         */
        case LOGOUT:
            let state1= state.setIn(['form', 'isValid'], true);
            state=state1;
            return state1;
            /**
             * ### Registration has 4 fields
             */
        case LOGIN:
        let state2=null;
            if (state.form.fields.username !== '' &&
                state.form.fields.password !== '' &&
                !state.form.isError &&
                !state.form.fields.passwordHasError) {
                state2= state.setIn(['form', 'isError'], false)
                    .setIn(['form', 'isDisable'], false);
            } else {
                state2= state.setIn(['form', 'isError'], true)
                    .setIn(['form', 'isDisable'], true);
            }
            state=state2;
            return state2;
        case FISRT_LOGIN_SUCCESS:
        case ON_AUTH_FORM_FIELD_CHANGE:
            let ok = (state.form.fields.username !== '' &&
                state.form.fields.password !== '' &&
                !state.form.isError &&
                !state.form.fields.passwordHasError);
            if (ok && state.form.isFisrtLoginSuccess){
              if(state.form.fields.smsPassword == ''){
                ok=false;
              }
            }

                let state3= state.setIn(['form', 'isError'], !ok)
                    .setIn(['form', 'isDisable'], !ok);
                state=state3;
                return state3;

            /**
             * Default, return the state
             */
    }
    return state;

}
