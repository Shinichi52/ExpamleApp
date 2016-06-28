
'use strict';

const InitialState = require('./openPositionInitialState').default;


const {
    SET_STATE,
    LOADING_OPEN_POSITION_INFO,
    REALTIME_OPEN_POSITION_INFO,
    RESPONSE_OPEN_POSITION_INFO,
    PENDING_OPEN_POSITION_INFO
} = require('../../lib/constants').default;
let formType={
  'Fill':'Fill',
  'Cancel':'Cancel',
  'Working':'Working'
};
import {
  firstOrDefault
}
from './../../lib/base/FunctionUtils';
const initialState = new InitialState;

export default function openPositionReducer(state = initialState, action) {
    if (!(state instanceof InitialState)){return initialState.mergeDeep(state);}
    state = state.setIn(['form', 'state'], action.type).setIn(['form', 'isError'], false);
    
    switch (action.type) {
        case LOADING_OPEN_POSITION_INFO:
            let nextState = state.setIn(['form', 'isBusy'], true);
            return nextState;
        case RESPONSE_OPEN_POSITION_INFO:
        let nextState1 = state.setIn(['form', 'isBusy'], false)
                              .setIn(['form', 'fields', 'listPosition'], action.payload.ListReturn)
                              .setIn(['form', 'fields', 'lissAccAmountInfo'], action.payload.listAccAmountInfoReturn);
            return nextState1;
        case REALTIME_OPEN_POSITION_INFO:
          let listData=[];
          listData=state.form.fields.listPosition;
          if (listData==null) {
            listData=[];
          }

          let lissDataAccAmountInfo=[];
          lissDataAccAmountInfo=state.form.fields.lissAccAmountInfo;
          if (lissDataAccAmountInfo==null) {
            lissDataAccAmountInfo=[];
          }

          let nextState2 = state;
          nextState2 = nextState2.setIn(['form', 'fields', 'listPosition'], listData)
                      .setIn(['form', 'fields', 'lissAccAmountInfo'], lissDataAccAmountInfo)
                      .setIn(['form', 'state'], PENDING_OPEN_POSITION_INFO);
          state=nextState2;
          return nextState2;
    }
    return state;

}
