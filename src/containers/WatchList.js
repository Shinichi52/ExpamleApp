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
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
const RequestType = require('./../lib/enum/RequestType');
var I18n = require('react-native-i18n');
import {
    clone,
    getJsonObject,
    firstOrDefault,
    getJsonMsg
}
from './../lib/base/FunctionUtils';
/**
 * The actions we need
 */
import * as watchList from '../reducers/WatchList/WatchListAction';
import * as globalActions from '../reducers/global/globalActions';
var Accordion = require('../components/Accordion');
var ImageRotate = require('../components/ImageRotate');

/**
 * Immutable
 */
import {Map} from 'immutable';
const Global = require('./../lib/enum/Global');
/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header';
/**
 * The FormButton will change it's text between the 4 states as necessary
 */

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation


import Top10Price from './../components/Top10Price'

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
    RESPONSE_WATCH_LIST,
    LOADING_WATCH_LIST,
    PENDING_BROADCAST_PRICE,
    BROADCAST_PRICE
} = require('../lib/constants').default;
import FormWatchSymolDetail from '../components/FormWatchSymolDetail';
import {
    Actions
}
from 'react-native-router-flux';
/**
 * ## Styles
 */
import styles from '../lib/Style/OrderStyle';
/**
 * ## Redux boilerplate
 */
const actions = [
  watchList,
  globalActions
];

function mapStateToProps(state) {
  return {
      ...state
  }
};

let formType={
  'Trade':'Trade',
  'Top10Price':'Top10Price',
  'Top10Vol':'Top10Vol'
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


class WatchList extends Component {

  constructor(props)
  {
    super(props);
    let listItem=[];
    if (this.props.watchList.form.fields.listData!=null) {
      listItem=this.props.watchList.form.fields.listData;
    }
     this.state = {
          isBusy: this.props.watchList.form.fields.isBusy,
         dataSource: new ListView.DataSource({
             rowHasChanged: (row1, row2) => row1 !== row2
         }),
         listData: listItem,
         listDataBroadCast:[],
         DataDetail: {},
         dicSymbolSub: {},
         itemSelect:0,
     };

  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.watchList.form.state===PENDING_BROADCAST_PRICE) {
      let listBroadCast=nextprops.watchList.form.fields.listData;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(listBroadCast),
      });
    }else {
      let listTemp=[];

      for (let itemTemp of nextprops.watchList.form.fields.listData) {
        if (this.state.dicSymbolSub[itemTemp.SymbolId.toString()]==null)
          continue;
        listTemp.push(itemTemp);
      }
      this.state.listData=listTemp;
      this.setState({
          isBusy: nextprops.watchList.form.fields.isBusy,
        dataSource: this.state.dataSource.cloneWithRows(this.state.listData),
      });
    }
  }

  componentWillMount() {
      this._pressData = -1;
    }



  _onRefresh() {
      this.setState({refreshing: true});
      fetchData().then(() => {
        this.setState({refreshing: false});
      });
    }

  renderContentRow(datarow: any, sectionID: number, rowID: number, highlightRow){
    let dataSourceDetail= new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
    });
    return(
      <View>
        <View style={styles.rowDetairow}>
          <FormWatchSymolDetail key = 'sellshow'
          IsBuy = {false} oLabel = {'O'} oPrice = {datarow.OpenPrice} hLabel = {'H'} hPrice = {datarow.HighPrice}
          vLabel = {'Vol'} vPrice = {datarow.VolmPrice} sizeLabel = {'A-Size'}  sizePrice ={datarow.AsizePrice}
          priceLable = {'Sell'} iPrice = {datarow.SellPrice}
          onPress = {()=>{
            this.props.actions.actionBuySellClick(false,datarow);}} />
        <View style={{marginLeft:10}}></View>

          <FormWatchSymolDetail key = 'buyshow' IsBuy = {true} oLabel = {'L'} oPrice = {datarow.LowPrice} hLabel = {'C'}
          hPrice = {datarow.ClosePrie} vLabel = {'Last'} vPrice = {datarow.LastTime} sizeLabel = {'Buy'}
          sizePrice ={datarow.BuyPrice} priceLable = {'B-Size'}  iPrice = {datarow.BsizePrice}
           onPress = {()=>{
             this.props.actions.actionBuySellClick(true,datarow);
           }} />
        </View>
        {this.renderNews(datarow)}
      </View>
    );

  }
  renderHeaderRow(datarow: any, sectionID: number, rowID: number, highlightRow){
    return (
      <View style={styles.rowDetairow}>
        <View style={styles.rowDetailTitleleft}>
          <View style={styles.rowDetail1}>
            <View style={styles.textRowDetailLeft}>
              <Text >{datarow.Symbol}</Text>
            </View>
            <View style={styles.iconRowDetailRight}>
              <Icon  name={'chevron-right'} size={15} />
            </View>
          </View>

          <View style={styles.rowDetail1}>
            {self.renderTextBorder("N",'#0af24b',true)}
            {self.renderTextBorder("S",'#0507f7',true)}
            {self.renderTextBorder("O",'#ff0404',true)}
            {self.renderTextBorder("D",'#e45122',true)}
          </View>
        </View>
        <View style={styles.rowDetailTitleSecond}>
              <Text >{datarow.companyName}</Text>
        </View>
        <View style={styles.rowDetailTitleSecond}>
          <View style={styles.rowDetail1}>
              <Text >{datarow.Trade}</Text>
              </View>
              <View style={styles.rowDetail1}>
                <Text >{datarow.tradeLimit}</Text>
              </View>
        </View>
        <View style={styles.rowDetailTitleSecond}>
            <View style={styles.rowDetail1}>
            <Text>{datarow.Chg}</Text>
            </View>
            <View style={styles.rowDetail1}>
              <Text >{datarow.chgLimit}</Text>
            </View>
        </View>
      </View>
    );
  }
  renderRow(datarow: any, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <Accordion
        header={this.renderHeaderRow(datarow,sectionID,rowID,highlightRow)}
        content={this.renderContentRow(datarow,sectionID,rowID,highlightRow)}
        easing="easeOutCubic"></Accordion>
    );
  }
  _pressRow(rowID){

  }
  renderTextBorder(text,color,isShow){
    if (isShow) {
      return (
        <View style={[styles.textBorder, {backgroundColor:color}]}>
          <Text style={{color:'#FFF',fontWeight:'bold'}}>{text}</Text>
        </View>
      );
    }else {
      return (
        <View style={styles.textBorder}>
        </View>
      );
    }
  }
  renderNews(data){
      return (
        <View style={[styles.rowDetailFullRow]}>
          <Text style={{color:'#FFF'}}>{data.New}</Text>
        </View>
      );
  }
  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={{
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#1FA194' : '#CCCCCC',
          }}
        />
      );
    }



  renderSectionHeader(data, sectionId) {
      var text;
      return (
        <View style={styles.sectionHeader}>
            <View style={styles.rowBorder3}>
                  <Text >Code</Text>
            </View>
            <View style={styles.rowBorder3}>
              <Text>Company</Text>
            </View>
            <View style={styles.rowBorder}>
                  <Text>Trade</Text>
            </View>
            <View style={styles.rowBorder}>
                <Text>Chg(%)</Text>
            </View>
        </View>
      );
    }
  componentWillUnmount(){
  }
  componentDidMount() {
    let datain = [];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(datain)});
    let userLayOut=Global.UserLayout;
    this.state.dicSymbolSub={};
    if (userLayOut!=null) {
      let current=getJsonObject(userLayOut.CurrentLayout);
      if (current!=null&&current.ListSymbolId!=null&&current.ListSymbolId.length>0) {
        for (let symbolId of current.ListSymbolId) {
          this.state.dicSymbolSub[symbolId]=symbolId;
        }
        this.props.actions.subcribePrice(current.ListSymbolId, true,this.state.dicSymbolSub);
        return;
      }
    }
    this.props.actions.subcribePrice([], true,this.state.dicSymbolSub);
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
  buttonAddPressHandler() {
      Actions.AddCode();
  }
  buttonModifPressHandler() {
    Actions.UpdateCode();
  }
  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    this.onButtonPress=this.props.onButtonPress;
    self = this;
    this.pageSize=4;
    this.initialListSize=4;
    this.enableEmptySections=true;
     return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}> {I18n.t('instruments')} </Text>
                <TouchableHighlight   onPress={this.buttonAddPressHandler.bind(this)} style={[styles.buttonIconTop, styles.toolbarButton]}>
                    <Icon name='plus' size={20} />
               </TouchableHighlight>
                <TouchableHighlight  onPress={this.buttonModifPressHandler.bind(this)}  style={[styles.buttonIconTop, styles.toolbarButton]}>
                   <Icon name='pencil' size={20} />
                </TouchableHighlight>
            </View>
          <ScrollableTabView>
                <ScrollView tabLabel="TRADE">
                    <ListView style={styles.listViewStyle}
                      dataSource={this.state.dataSource}
                      pageSize={this.pageSize}
                      initialListSize={this.initialListSize}
                      enableEmptySections={this.enableEmptySections}
                      renderRow={this.renderRow.bind(this)}
                      renderSectionHeader={this.renderSectionHeader}
                      renderSeparator={this._renderSeperator}
                    />
                </ScrollView>
                <ScrollView tabLabel="TOP 10% PRICE" >
                  <Top10Price/>
                </ScrollView>
                <ScrollView tabLabel="TOP 10% VOL" >
                  {/*<ListView style={styles.listViewStyle}
                    dataSource={this.state.dataSourceCancel}
                    pageSize={this.pageSize}
                    initialListSize={this.initialListSize}
                    enableEmptySections={this.enableEmptySections}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this._renderSeperator}
                  />*/}
                  <Text>
                    XYZ
                  </Text>
                </ScrollView>
              </ScrollableTabView>
              {this.renderLoadingState()}
        </View>
      );

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
