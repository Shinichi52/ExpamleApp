
'use strict';

const InitialState = require('./WatchListActionInitialState').default;


const {
    SET_STATE,
    LOADING_WATCH_LIST,
    REALTIME_WATCH_LIST,
    RESPONSE_WATCH_LIST,
    PENDING_BROADCAST_PRICE,
    BROADCAST_PRICE
} = require('../../lib/constants').default;
let formType={
  'Fill':'Fill',
  'Cancel':'Cancel',
  'Working':'Working'
};
import {
  firstOrDefault,
  clone
}
from './../../lib/base/FunctionUtils';
const initialState = new InitialState;

export default function orderListReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    state = state.setIn(['form', 'state'], action.type);
    switch (action.type) {
        case LOADING_WATCH_LIST:
            let nextState = state.setIn(['form', 'fields', 'isBusy'], true);
            return nextState;
        case RESPONSE_WATCH_LIST:
        let nextState1 = state.setIn(['form', 'fields', 'isBusy'], false)
                              .setIn(['form', 'fields', 'listData'], action.payload);
        state = nextState1;
            return nextState1;
        break;
        case BROADCAST_PRICE:
          console.warn("co gia changed1");
          let listData = clone(state.form.fields.listData);
          let listDataBroadCast=action.payload;
          for (var dataBc of listDataBroadCast) {
            var itemSelect=firstOrDefault(listData,function (data) {
              return data.SymbolId===dataBc.SymbolId;
            });

            if (itemSelect!=null) {
              let indexOf=listData.indexOf(itemSelect);
              listData[indexOf]=dataBc;
            }
          }

          let nextState2 = state.setIn(['form', 'fields', 'isBusy'], false)
                                .setIn(['form', 'fields', 'listData'], listData);

          nextState2 = nextState2.setIn(['form', 'state'], PENDING_BROADCAST_PRICE)
          state = nextState2;
          return nextState2;

    }

    return state;
}
