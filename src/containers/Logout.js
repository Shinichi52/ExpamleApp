/**
 * # Logout.js
 *
 *
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */


var I18n = require('react-native-i18n');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header';
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../components/FormButton';
import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  View
}
from 'react-native';

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    left: 0,
    top: windowSize.height*0.5,
    flex: .5
  }
});
/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  globalActions
];

function mapStateToProps(state) {
  return {
      ...state
  }
};

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class Logout extends Component {

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {

    let self = this;

    let onButtonPress = () => {
			this.props.actions.logout();
		};

     return (
        <View style={styles.container}>
          <View style={styles.button}>
            <FormButton
                onPress={onButtonPress.bind(self)}
                buttonText= {I18n.t('logout')}/>
          </View>
        </View>
      );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
