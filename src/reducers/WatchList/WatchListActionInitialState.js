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
    LOADING_WATCH_LIST
} = require('../../lib/constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
    state: LOADING_WATCH_LIST,

    fields: new(Record({
        listData:[],
        listDataBroadCast:[],
        isBusy: true,
        itemSelect:-1,
        DataDetail:{},
        dicSymbolSub:{},
        DicSymbolIndex:{},

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
