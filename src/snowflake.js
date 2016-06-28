'use strict';
/**
 *  # snowflake
 *  Snowflake ![snowflake](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React, {
  AppRegistry,
  Navigator,
  View,
  Text } from 'react-native';

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import RNRF, {
  Route,
  Scene,
  TabBar} from 'react-native-router-flux';

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider,
  connect } from 'react-redux';

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore';


/**
 * ### containers
 *
 * All the top level containers
 *
 */
 var I18n = require('react-native-i18n');
import lang_en from './language/lang_en';
import lang_vi from './language/lang_vi';
import App from './containers/App';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Profile2 from './containers/Profile2';
import WatchList from './containers/WatchList';
import OrderList from './containers/OrderList';
import OrderDetail from './containers/OrderDetail';
import UserInfo2 from './containers/UserInfo2';
import AddCode from './containers/AddCode';
import UpdateCode from './containers/UpdateCode';
import Positions from './containers/Positions';
import OrderModify from './containers/OrderModify';

// I18n.defaultLocale = "en-US";
// I18n.locale = "en-US";
// I18n.currentLocale();

/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore} from './reducers/global/globalActions';

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import authInitialState from './reducers/auth/authInitialState';
import deviceInitialState from './reducers/device/deviceInitialState';
import globalInitialState from './reducers/global/globalInitialState';
import profileInitialState from './reducers/profile/profileInitialState';

/**
 *  The version of the app but not  displayed yet
 */
var VERSION='0.1.1';

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
  const _initState = {
    auth: new authInitialState,
    device: (new deviceInitialState).set('isMobile',true),
    global: (new globalInitialState),
    profile: new profileInitialState
  };
  return _initState;
}
/**
* ## TabIcon
*
* Displays the icon for the tab w/ color dependent upon selection
*/

class TabIcon extends React.Component {
  render(){
    return (
      <View style={{flex:0, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
        <Icon  name={this.props.iconName} size={20} />
      </View>
      );
  }
}
//<Text style={{color: color}}>{this.props.title}</Text>
/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {

  let Snowflake = React.createClass( {
    render() {

      const store = configureStore(getInitialState());

      //Connect w/ the Router
      const Router = connect()(RNRF.Router);

      // configureStore will combine reducers from snowflake and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));

      // setup the router table with App selected as the initial component
      return (
        <Provider store={store}>
	  <Router hideNavBar={true}>
	    <Scene key="root">
	      <Scene key="App"
                     component={App}
                     title="App"
                     initial={true}/>

	      <Scene key="InitialLoginForm"
                     component={Login}
                     title="Login" />

        <Scene key="Login"
                     component={Login}
                     title="Login"/>

       <Scene key="OrderDetail"
                   component={OrderDetail}
                   title="OrderDetail"/>
       <Scene key="OrderModify"
                   component={OrderModify}
                   title="Order Modify"/>


	      <Scene key="Tabbar" tabs={true} default="WatchList">

        <Scene key="WatchList"
                      title="WatchList"
                      iconName={"bars"}
                      icon={TabIcon}
                      hideNavBar={true}
                         initial={true}
                      component={WatchList}
                      />
          <Scene key = "AddCode"
            component = {AddCode}
            title = "Add Code"/>
          <Scene key = "UpdateCode"
            component = {UpdateCode}
            title = "Update Code"/>
	        <Scene key="OrderList"
                       title="OrderList"
                       icon={TabIcon}
                       iconName={"exchange"}
                       hideNavBar={true}
                       component={OrderList}/>
        <Scene key="Positions"
                       title="Open Positions"
                       icon={TabIcon}
                       iconName={"clock-o"}
                       hideNavBar={true}
                       component={Positions}/>

           <Scene key="Logout"
             title="logout"
             icon={TabIcon}
             iconName={"list"}
             hideNavBar={true}

             component={Logout}/>


          <Scene key="Profile2"
                      title="profile2"
                      icon={TabIcon}
                      iconName={"ellipsis-h"}
                      hideNavBar={true}
                      component={Profile2}/>

          <Scene key = "UserInfo2"
                    component = {UserInfo2}
                    title = "User Info"
                    hideNavBar={true}/>

	      </Scene>
	    </Scene>
	  </Router>
        </Provider>
      );
    }
  });
  /** ellipsis-h
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('snowflake', () => Snowflake);
}
