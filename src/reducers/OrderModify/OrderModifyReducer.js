
'use strict';

const InitialState = require('./OrderModifyInitialState').default;


const {
    SET_STATE,
    LOADING_MODIFY_ORDER,
    RESPONSE_MODIFY_ORDER,
    RESPONSE_UPDATE_ORDER_MODIFY_ORDER,
    RESPONSE_ACCOUNT_MODIFY_ORDER,
    BROADCAST_PRICE__MODIFY_ORDER
} = require('../../lib/constants').default;

import {
  firstOrDefault
}
from './../../lib/base/FunctionUtils';
const initialState = new InitialState;

export default function OrderModifyInitialState(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    state = state.setIn(['form', 'state'], action.type);
    switch (action.type) {
        case LOADING_MODIFY_ORDER:
            let nextState = state.setIn(['form', 'fields', 'ErrorCode'], '')
            .setIn(['form', 'fields', 'IsResponseAccount'], false)
            .setIn(['form', 'fields', 'isBusy'], true);
            state=nextState;
            return nextState;
        case RESPONSE_ACCOUNT_MODIFY_ORDER:
            let nextState5 = state.setIn(['form', 'fields', 'cashTotal'], action.payload.Amount)
                                    .setIn(['form', 'fields', 'IsResponseAccount'], true);
            state=nextState5;
            return nextState5;
        case RESPONSE_MODIFY_ORDER:
            let nextState1 = state.setIn(['form', 'fields', 'isBusy'], false)
                              .setIn(['form', 'fields', 'BuyPrice'], action.payload.BuyPrice)
                              .setIn(['form', 'fields', 'BsizePrice'], action.payload.BsizePrice)
                              .setIn(['form', 'fields', 'SellPrice'], action.payload.SellPrice)
                              .setIn(['form', 'fields', 'ErrorCode'], '')
                              .setIn(['form', 'fields', 'IsResponseAccount'], false)
                              .setIn(['form', 'fields', 'AsizePrice'], action.payload.AsizePrice);
            state = nextState1;
            return nextState1;
        case RESPONSE_UPDATE_ORDER_MODIFY_ORDER:
            let nextState11 = state.setIn(['form', 'fields', 'isBusy'], false)
                              .setIn(['form', 'fields', 'ErrorCode'], action.payload)
                              .setIn(['form', 'fields', 'IsResponseAccount'], false);
            state = nextState11;
            return nextState11;
        case BROADCAST_PRICE__MODIFY_ORDER:
          let nextState2 = state.setIn(['form', 'fields', 'isBusy'], false)
                                .setIn(['form', 'fields', 'BuyPrice'], action.payload.BuyPrice)
                                .setIn(['form', 'fields', 'BsizePrice'], action.payload.BsizePrice)
                                .setIn(['form', 'fields', 'SellPrice'], action.payload.SellPrice)
                                .setIn(['form', 'fields', 'IsResponseAccount'], false)
                                .setIn(['form', 'fields', 'AsizePrice'], action.payload.AsizePrice)
                                .setIn(['form', 'fields', 'ErrorCode'], '');

          nextState2 = nextState2.setIn(['form', 'state'], RESPONSE_MODIFY_ORDER)
          state = nextState2;
          return nextState2;
    }

    return state;
}
