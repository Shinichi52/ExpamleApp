
'use strict';

import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
const RequestType = require('./../lib/enum/RequestType');
var I18n = require('react-native-i18n');
import {
    clone,
    getJsonObject,
    getJsonMsg,
    firstOrDefault
}
from './../lib/base/FunctionUtils';
/**
 * The actions we need
 */
 let SortableListView = require('react-native-sortable-listview');
import * as AddCodeActions from '../reducers/AddCode/AddCodeActions';
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


import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation
const Global = require('./../lib/enum/Global');
let self =null;

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  ScrollView,
  Image,
  RecyclerViewBackedScrollView,
  View,
  Text,
  StatusBar,
  RefreshControl,
  ListView,
  TouchableHighlight
}
from 'react-native';
const {
    RESPONSE,
    LOADING,
    BROADCAST_PRICE
} = require('../lib/constants').default;
import styles from '../lib/Style/AddCodeStyle';
import {
    Actions
}
from 'react-native-router-flux';
/**
 * ## Redux boilerplate
 */
const actions = [
  AddCodeActions,
  globalActions
];



let RowComponent = React.createClass({
  render: function() {
    return (
      <View style={styles.rowDetail}>
        <View style={styles.iconLeftDetail}>
          <TouchableHighlight
            onLongPress={this.props.onLongPress} onPressOut={this.props.onPressOut}>
          <Icon  name={'bars'} size={20} />
          </TouchableHighlight>
        </View>

        <View style={styles.textDetail}>
          <Text>{this.props.data.text}</Text>
        </View>

        <View style={styles.iconRightDetail}>
          <TouchableHighlight onPress={() => {
                    self.deleteRow11(this.props.data.SymbolId,true);
                  }}>
            <Icon  name={'remove'} style={{color:'red'}} size={20} />
          </TouchableHighlight>
        </View>

      </View>
    );
  }
});

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


class UpdateCode extends Component {

  constructor(props)
  {
    super(props);
    let listDataTemp=[];
    let dataTemp={};
    if (Global.UserLayout!=null) {
      let currentLayout=Global.UserLayout.CurrentLayout;
      currentLayout=getJsonObject(currentLayout);
      if (currentLayout!=null) {
        let listSymbolId=currentLayout.ListSymbolId;
        if (listSymbolId==null)
          listSymbolId=[];
        for (let symbolId of listSymbolId) {
          const symbolMemory=Global.DicSymbol[symbolId.toString()];
          if (symbolMemory==null)
            continue;
          listDataTemp.push(symbolMemory);
          dataTemp[symbolMemory.ContractName]={
            text:symbolMemory.ContractName,
            SymbolId:symbolMemory.SymbolId
          }
        }
      }
    }

     this.state = {
          listData:listDataTemp,
          data : dataTemp,
          order:{}
     };
     this.state.order=Object.keys(this.state.data);
  }

  componentWillReceiveProps(nextprops) {
    // console.warn("Re-RENDER ");
    // this.state.listData=nextprops.watchList.form.fields.listData;
    // var dataList=[];
    // dataList=this._genRows(this.state.itemSelect,formType.Working);
    // this.setState({
    //     isBusy: nextprops.watchList.form.fields.isBusy,
    //   dataSource: this.state.dataSource.cloneWithRows(dataList),
    // });
  }


  componentWillMount() {

  }

  deleteRow11(symbolId,isDelete) {
    if (!isDelete)
      return;

    let itemSelect=firstOrDefault(this.state.listData,function (data) {
      return data.SymbolId===symbolId;
    });
    if (itemSelect==null)
      return;
    let indexOf = this.state.listData.indexOf(itemSelect);
    this.state.listData.splice(indexOf,1);
    let itemData=this.state.data;
    delete itemData[itemSelect.ContractName];
    let orderTemp=Object.keys(itemData);
    this.setState({
      data: itemData,
      order:orderTemp
    });
  }


  componentDidMount() {
    // let datain = this._genRows(0);
    // this.setState({dataSource: this.state.dataSource.cloneWithRows(datain)});
    // let list = [126,127,128,129,130,131,132];
    // this.props.actions.subcribePrice(list, true);
  }

  renderLoadingState(){
    if (this.state.isBusy) {
      return (
         <Image style={styles.bg} source={require('./../images/loading.gif')} />
      );
    }else {
      return null;
    }
  }

  buttonSavePressHandler() {
    let userLayOut=Global.UserLayout;
    if (userLayOut==null) {
      userLayOut={};
      userLayOut.UserId=Global.LoggedInUserInfo.UserId;
      userLayOut.CurrentLayout=null;
    }
    let listSymbolId=[];
    for (let itemData of this.state.listData) {
      listSymbolId.push(itemData.SymbolId);
    }
    let current= getJsonObject(userLayOut.CurrentLayout);
    current.ListSymbolId=listSymbolId;
    userLayOut.CurrentLayout=JSON.stringify(current);
    this.props.actions.updateUserLayoutRequest(userLayOut);
  }
  buttonBackPressHandler() {
      Actions.WatchList();
  }
  render() {
    self=this;
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <View style={styles.back}>
            <TouchableHighlight  onPress={this.buttonBackPressHandler.bind(this)}  style={[styles.buttonIconTop, styles.toolbarButton]}>
              <Icon name='chevron-left' size={20} />
            </TouchableHighlight>
          </View>
          <View style={styles.textHeader}>
            <Text style={styles.toolbarTitle}> {I18n.t('AddCode')} </Text>
          </View>
          <View style={styles.save}>
            <TouchableHighlight  onPress={this.buttonSavePressHandler.bind(this)}  style={[styles.buttonIconTop, styles.toolbarButton]}>
               <Icon name='check' size={20} />
            </TouchableHighlight>
          </View>

        </View>

        <SortableListView
          style={{flex: 1}}
          data={this.state.data}
          order={this.state.order}
          onRowMoved={e => {
            this.state.order.splice(e.to, 0, this.state.order.splice(e.from, 1)[0]);
            this.state.listData.splice(e.to,0,this.state.listData.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <RowComponent data={row} />}
        />
      </View>

    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCode);
