/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import
 */
const {
    Record
} = require('immutable');
const {
    LOADING_ORDER_DETAIL
} = require('../../lib/constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
    state: LOADING_ORDER_DETAIL,

    fields: new(Record({
      isBusy:true,
      valueOrder: 0,
      textOrder:'',
      isOrderBuy:'',
      tilebuttom:'',
      stylebutton:'',
      contractTotal:'',
      cashTotal:'',
      feesTotal:'',
      selectedDurationIndex:0,
      selectedDurationValue:'Day',
      selectedExchangeIndex:0,
      isShowStopPrice:true,
      isShowLimitPrice:true,
      isShowExchange:true,
      isShowDuration:true,
      ErrorCode:'',
      OrderTypeSelected:'',
      modalVisible:false,
      OrderTypeSelectedText:'',

      IsResponseAccount:false,
      SymbolId:'',
      AsizePrice:'',
      SellPrice:'',
      BuyPrice:'',
      BsizePrice:'',
      StopPrice:'',
      LimitPrice:'',
      ErrorText:'',
    }))
});

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
    form: new Form
});
export
default InitialState;
