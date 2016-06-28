
'use strict';

const InitialState = require('./orderListInitialState').default;


const {
    SET_STATE,
    LOADING_ORDER_LIST,
    REALTIME_ORDER_LIST,
    PENDING_REALTIME_ORDER_LIST,
    RESPONSE_CANCEL_ORDER_LIST,
    RESPONSE_ORDER_LIST,
    REJECT_ORDER_LIST,
} = require('../../lib/constants').default;
const ResourcesKeyEnum = require('../../lib/enum/ResourcesKeyEnum');
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

export default function orderListReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    if (action.type!==LOADING_ORDER_LIST
    &&action.type!==REALTIME_ORDER_LIST
    &&action.type!==PENDING_REALTIME_ORDER_LIST
    &&action.type!==RESPONSE_CANCEL_ORDER_LIST
    &&action.type!==RESPONSE_ORDER_LIST) {
      state = state.setIn(['form', 'state'], REJECT_ORDER_LIST);
    }

    switch (action.type) {
        case LOADING_ORDER_LIST:
            let nextState = state.setIn(['form', 'fields', 'ErrorCode'], '')
            .setIn(['form', 'state'], action.type)
            .setIn(['form', 'isError'], false)
                                .setIn(['form', 'isBusy'], true);
            return nextState;
        case RESPONSE_ORDER_LIST:
        let nextState1 = state.setIn(['form', 'isBusy'], false)
        .setIn(['form', 'state'], action.type)
        .setIn(['form', 'isError'], false)
                              .setIn(['form', 'fields', 'listData'], action.payload.ListReturn)
                              .setIn(['form', 'fields', 'listDataFill'], action.payload.ListReturnFill)
                              .setIn(['form', 'fields', 'ErrorCode'], '')
                              .setIn(['form', 'fields', 'listDataCancel'], action.payload.ListReturnCancel);
            return nextState1;
        case RESPONSE_CANCEL_ORDER_LIST:
          let nextState13 = state.setIn(['form', 'isBusy'], false)
          .setIn(['form', 'state'], action.type)
          .setIn(['form', 'isError'], false)
                                .setIn(['form', 'fields', 'ErrorCode'], action.payload);
              return nextState13;
        case REALTIME_ORDER_LIST:
          let listData=[];
          if (action.payload.typeForm===formType.Fill) {
            listData=state.form.fields.listDataFill;
          }else if (action.payload.typeForm===formType.Cancel) {
            listData=state.form.fields.listDataCancel;
          }else {
            listData=state.form.fields.listData;
          }
          if (listData==null) {
            listData=[];
          }
          var itemSelect=firstOrDefault(listData,function (data) {
            return data.ID===action.payload.ID;
          });
          if (itemSelect!=null) {
            let indexOf=listData.indexOf(itemSelect);
            listData[indexOf]=action.payload;
          }else {
            listData.splice(0,0,action.payload);
          }

          let nextState2 = state;
          if (action.payload.typeForm===formType.Fill) {

            let listWorking=state.form.fields.listData;
            if (listWorking==null) {
              listWorking=[];
            }
            var itemSelect1=firstOrDefault(listWorking,function (data) {
              return data.ID===action.payload.ID;
            });

            if (itemSelect1!=null) {
              let indexOf=listWorking.indexOf(itemSelect1);
              listWorking.splice(indexOf,1);
            }

            nextState2 = state.setIn(['form', 'fields', 'listData'], listWorking)
                              .setIn(['form', 'fields', 'listDataFill'], listData);
          } else if (action.payload.typeForm===formType.Cancel) {
            let listWorking1=state.form.fields.listData;
            if (listWorking1==null) {
              listWorking1=[];
            }
            var itemSelect1=firstOrDefault(listWorking1,function (data) {
              return data.ID===action.payload.ID;
            });

            if (itemSelect1!=null) {
              let indexOf=listWorking1.indexOf(itemSelect1);
              listWorking1.splice(indexOf,1);
            }

            nextState2 = state.setIn(['form', 'fields', 'listData'], listWorking1)
                              .setIn(['form', 'fields', 'listDataCancel'], listData);
          }else {
            nextState2 = state.setIn(['form', 'fields', 'listData'], listData);
          }
          nextState2 = nextState2.setIn(['form', 'fields', 'ErrorCode'], '')
                                .setIn(['form', 'state'], action.type)
                                .setIn(['form', 'isError'], false);
          nextState2 = nextState2.setIn(['form', 'state'], PENDING_REALTIME_ORDER_LIST);
          state=nextState2;
          return nextState2;
    }
    return state;

}
