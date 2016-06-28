/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
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

} = require('../../lib/constants').default;

/**
 * Project requirements
 */
const BackendFactory = require('../../lib/BackendFactory').default;
const Global = require('./../../lib/enum/Global');
const QuantEdge = require('../../lib/QuantEdge').default;
import {
    Actions
}
from 'react-native-router-flux';

const AppAuthToken = require('../../lib/AppAuthToken').default;
const BroadcastKey = require('../../lib/enum/BroadcastKey');
let dispatchGlobal;

const _ = require('underscore');
if (!Global.Operator)
    Global.Operator = new QuantEdge();

Global.DataManager.regisBroadcastHandler(BroadcastKey.NetworkStatus, onBroadcastReceived);

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function logoutState() {
    return {
        type: LOGOUT
    };

}


export function loginState() {
    return {
        type: LOGIN
    };
}


/**
 * ## Logout actions
 */
export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    };
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    };
}

export function callbaclLogout() {
  return true;
}

export function logout() {
    return dispatch => {
        Global.Operator.logout(callbaclLogout);
        if (Actions.Login!=null) {
          Actions.Login();
        }
        return dispatch(logoutSuccess());
    };
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value) {
    return {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {
            field: field,
            value: value
        }
    };
}

export function resendOtpPassWordSuccess() {
    return {
        type: RESEND_SMS_PASS_SUCESS
    };
}
export function resendOtpPassWordFail(json) {
    return {
        type: RESEND_SMS_PASS_FAIL,
        payload: json
    };
}


export function getSessionToken() {
    return dispatch => {
        if (Actions.Login) {
          Actions.Login();
        }
        return dispatch(loginState());

        // if (Actions.Tabbar) {
        //   Actions.Tabbar();
        // }
        // return dispatch(loginSuccess());
    };
}


/**
 * ## Login actions
 */

export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

export function resendSmsPassRequest() {
    return {
        type: RESEND_SMS_PASS
    };
}

export function loginSuccess(json) {
    return {
        type: LOGIN_SUCCESS,
        payload: json
    };
}
export function loadUserLayout() {
    return {
        type: LOADING_USERLAYOUT,
    };
}

export function fisrtLoginSuccess(json) {
    return {
        type: FISRT_LOGIN_SUCCESS,
        payload: json
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
}

export function onBroadcastReceived(dataKey, message) {
    try {
        if (dataKey === BroadcastKey.NetworkStatus) {
            if (message.IsConnected === false) {
                Global.NetworkManager.logoutMe(true);
                if (dispatchGlobal) {
                     return dispatchGlobal(loginFailure(message.Reason));
                }
            }
        }
    } catch (ex) {
        console.error(ex);
    }
}

export function callbackLogin(msg) {
    if (dispatchGlobal) {
        if (msg.IsSuccess) {
            return dispatchGlobal(fisrtLoginSuccess(msg));
        } else {
            return dispatchGlobal(loginFailure(msg.ResourcesKeyEnum));
        }
    }
    // Actions.Login();
}
export function callbackGetUserLayout(msg) {
    if (dispatchGlobal) {
      Global.UserLayout=msg.UserLayout;
      Global.DicSymbol={};
      if (msg.ListSymbol!=null&&msg.ListSymbol.length>0) {
        for (let symbol of msg.ListSymbol) {
          Global.DicSymbol[symbol.SymbolId]=symbol;
        }
      }
      if (Actions.Tabbar!=null) {
        Actions.Tabbar();
      }
      if (msg.UserLayout !=null) {
        return dispatchGlobal(loadUserLayout(msg));
      }
    }
}
export function callbackInitializeEnvironmentsWork(msg) {
    if (dispatchGlobal) {
        if (Global.NetworkManager.updateDefaultQueue()) {
            dispatchGlobal(loginSuccess(msg));
            Global.Operator.requestGetUserLayout(callbackGetUserLayout,Global.LoggedInUserInfo.UserId);
        } else {
            dispatchGlobal(loginFailure('khong tao duoc queue'));
        }
    }
}

export function callbackSecondLogin(msg) {
    if (dispatchGlobal) {
        if (msg.IsSuccess) {
            Global.Operator.initializeEnvironmentsWork(callbackInitializeEnvironmentsWork);
            return true;
        } else {
            return dispatchGlobal(loginFailure(msg.ResourcesKeyEnum));
        }
    }
}

export function login(username, password, smsPassword) {
    if (smsPassword) {
        return dispatch => {
            dispatchGlobal = dispatch;

            if (password != null) {
                Global.Operator.secondLogin(callbackSecondLogin, {
                    username: username,
                    password: password,
                    otp: smsPassword
                });
            }
            return dispatch(loginRequest());
        };
    } else {
        return dispatch => {
            dispatchGlobal = dispatch;

            if (password != null) {
                Global.Operator.login(callbackLogin, {
                    username: username,
                    password: password
                });
            }
            return dispatch(loginRequest());
        };
    }

}

export function resendSmsPassword(username, password) {
    return dispatch => {
        dispatchGlobal = dispatch;
        Global.Operator.resendOtpPassword(callbackResednSmsPassword, {
            username: username,
            password: password
        });
        return dispatch(resendSmsPassRequest());
    };
}

export function callbackResednSmsPassword(msg) {
    if (dispatchGlobal) {
        if (msg.IsSuccess) {
            return dispatchGlobal(resendOtpPassWordSuccess(msg));
        } else {
            return dispatchGlobal(resendOtpPassWordFail(msg.ResourcesKeyEnum));
        }
    }
    // Actions.Login();
}
