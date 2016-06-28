/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict';
/**
 * ## Imports
 *
 * our 4 reducers
 */
import auth from './auth/authReducer';
import device from './device/deviceReducer';
import global from './global/globalReducer';
import profile from './profile/profileReducer';
import orderList from './orderList/orderListReducer';
import openPosition from './OpenPositions/openPositionReducer';
import watchList from './WatchList/WatchListActionReducer';
import AddCode from './AddCode/AddCodeReducer';
import OrderDetail from './OrderDetail/OrderDetailReducer';
import OrderModify from './OrderModify/OrderModifyReducer';

import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
  device,
  global,
  profile,
  watchList,
  orderList,
  AddCode,
  OrderDetail,
  OrderModify,
  openPosition
});

export default rootReducer;
