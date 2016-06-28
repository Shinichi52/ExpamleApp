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



const Global = require('./../lib/enum/Global');
var I18n = require('react-native-i18n');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


/**
 * The actions we need
 */
// import * as userInfoAction from '../reducers/UserInfo/userInfoAction';
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
  View,
  Image,
  ListView,
  Text,
  TouchableHighlight,
}
from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Actions
}
from 'react-native-router-flux';
/**
 * ## Styles
 */
// var styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     left: 0,
//     top: windowSize.height*0.5,
//     flex: .5
//   }
// });

let seft=null;
var styles = StyleSheet.create({
  styleView : {
    // top : 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth : 1,
    borderBottomColor : 'black'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 30,
    height: 30,
  },
  text: {
    flex : 0.8  ,
    padding:10,
  },
  viewIcon : {
    flex : 0.2,    
    justifyContent: 'center',
    alignItems : 'center',
  }
});



let _refs = null;

/**
 * ## Redux boilerplate
 */
const actions = [
  globalActions,
  authActions
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


  class ListViewSimpleExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
  }

  componentWillMount() {
    let ds = this._genRows({});
    this.setState({dataSource: this.state.dataSource.cloneWithRows(ds)});
  }

  render() {
   _refs = this;
    return (
      <ExNavigator
        initialRoute={this.getRoute()}
        style={{flex : 1 }}
        sceneStyle={{ paddingTop: 64 }} 
      />
    );
  }
  getRoute(){
    return{
      renderScene(navigator){
        return (
          <ListView
            dataSource={_refs.state.dataSource}
            renderRow={_refs._renderRow.bind(_refs)}
          />
        );
      },
      getTitle(){
          return 'More';
      },
    }
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    var imgSource = THUMB_URLS[rowID];
    var infoSource = LOREM_IPSUM[rowID];
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View style = {styles.styleView}>
          <View style={styles.row}>
            <View style = {styles.viewIcon}>
              <Icon name ={imgSource} size = {20}/>
            </View>
            <Text style={styles.text}>
              {infoSource}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < THUMB_URLS.length; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  }

  _pressRow(rowID: number) {
    switch (rowID) {
      case "0":
        {
          Actions.UserInfo2();
        }
      break;
      case '5':{
        _refs.props.actions.logout();
      }
      break;
    
      default:
        break;
    }
  }
};

var THUMB_URLS = [
  'user',
  'reply',
  'envelope-o',
  'info-circle',
  'cog',
  'sign-out',

  ];
var LOREM_IPSUM = [
  'User Info',
  'Reports',
  'Messages',
  'About Us',
  'Settings',
  'Logout',
]

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};


// module.exports = ListViewSimpleExample;

export default connect(mapStateToProps, mapDispatchToProps)(ListViewSimpleExample);
