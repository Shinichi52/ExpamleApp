
'use strict';

const InitialState = require('./AddCodeInitialState').default;


const {
    SET_STATE,
    LOADING_ADD_CODE,
    RESPONSE_UPDATE_USERLAYOUT,
    REALTIME_ADD_CODE,
    RESPONSE_ADD_CODE
} = require('../../lib/constants').default;

import {
  firstOrDefault
}
from './../../lib/base/FunctionUtils';
const initialState = new InitialState;

export default function AddCodeReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    state = state.setIn(['form', 'state'], action.type).setIn(['form', 'isError'], false);
    switch (action.type) {
        case LOADING_ADD_CODE:
            let nextState = state.setIn(['form', 'isBusy'], true);
            return nextState;
        case RESPONSE_ADD_CODE:
        let nextState1 = state.setIn(['form', 'isBusy'], false)
                              .setIn(['form', 'fields', 'listData'], action.payload);
            return nextState1;
        case RESPONSE_UPDATE_USERLAYOUT:
        let nextState3 = state.setIn(['form', 'isBusy'], false)
                              .setIn(['form', 'ErrorCode'], action.payload);
            return nextState3;
        case REALTIME_ADD_CODE:
          let listData=[];
        break;

    }

    return state;
}
