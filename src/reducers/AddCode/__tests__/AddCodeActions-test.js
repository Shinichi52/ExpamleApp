
'use strict';
jest.autoMockOff();

jest.mock('../../../lib/AppAuthToken');
jest.mock('../../../lib/BackendFactory');

var mockStore = require('../../mocks/Store');


var actions = require('../AddCodeActions');

const BroadcastKey = require('./../../../lib/enum/BroadcastKey');
import RNRF, {
  Route,
  Scene,
  TabBar} from 'react-native-router-flux';

const {
  LOADING_ADD_CODE,
  RESPONSE_ADD_CODE,
  RESPONSE_UPDATE_USERLAYOUT,
  REALTIME_ADD_CODE
} = require('../../../lib/constants').default;
const Global = require('./../../../lib/enum/Global');

function createDispatch() {
  let payload='';
  const expectedActions = [];
 const store = mockStore({}, expectedActions);
    store.dispatch(actions.getListSymbolRequest());
}


describe('AddCodeActions', () => {


  it('Test loadingState', () => {
      expect(actions.loadingState()).toEqual({
          type: LOADING_ADD_CODE
      });
  });
  it('Test responseState', () => {
    let payload='';
      expect(actions.responseState(payload)).toEqual({
          type: RESPONSE_ADD_CODE,
          payload: payload
      });
  });
  it('Test responseUpdateUserLayoutState', () => {
    let payload='';
      expect(actions.responseUpdateUserLayoutState(payload)).toEqual({
          type: RESPONSE_UPDATE_USERLAYOUT,
          payload: payload
      });
  });
  it('Test realTimeState', () => {
    let payload='';
      expect(actions.realTimeState(payload)).toEqual({
          type: REALTIME_ADD_CODE,
          payload: payload
      });
  });

  it('Test getListSymbolRequest', () => {
    let payload='';
    const expectedActions = [];
   const store = mockStore({}, expectedActions);
      expect(store.dispatch(actions.getListSymbolRequest())).toEqual({
          type: LOADING_ADD_CODE
      });
  });

  it('Test callBackUpdateUserLayoutRequest', () => {
    createDispatch();
    let msg={
      ResourcesKeyEnum:'ResourcesKeyEnum'
    };

    expect(actions.callBackUpdateUserLayoutRequest(msg)).toEqual({
      type: RESPONSE_UPDATE_USERLAYOUT,
      payload: msg.ResourcesKeyEnum
    });

  });
  it('Test callBackGetListSymbolRequest ListSymbol=null, ListSymbolId = null', () => {
    createDispatch();
    let currentLayout={
        ListSymbolId:null
      };

    Global.UserLayout={
      CurrentLayout:JSON.stringify(currentLayout)
    }

    let msg={
      ListSymbol:null
    };

    expect(actions.callBackGetListSymbolRequest(msg)).toEqual({
      type: RESPONSE_ADD_CODE,
      payload: []
    });

  });


  it('Test callBackGetListSymbolRequest ListSymbol != null, ListSymbolId != null', () => {
    createDispatch();
    let currentLayout={
        ListSymbolId:[1]
      };

    Global.UserLayout={
      CurrentLayout:JSON.stringify(currentLayout)
    }

    let msg={
      ListSymbol:[
        {
          SymbolId:1
        },
        {
          SymbolId:2
        }
      ]
    };

    expect(actions.callBackGetListSymbolRequest(msg).type).toEqual(RESPONSE_ADD_CODE);

  });



});
