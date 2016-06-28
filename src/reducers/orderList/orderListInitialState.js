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
    LOADING_ORDER_LIST
} = require('../../lib/constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
    state: LOADING_ORDER_LIST,
    isBusy: false,
    isError: false,
    fields: new(Record({
        listData:[],
        listDataFill:[],
        listDataCancel:[],
        ErrorCode:'',
        ItemSelect:null,
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
