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
import { connect } from 'react-redux';
const RequestType = require('./../lib/enum/RequestType');
var I18n = require('react-native-i18n');
import {
    clone,
    isNullOrEmpty,
    getJsonObject,
    getJsonMsg
}
from './../lib/base/FunctionUtils';
/**
 * The actions we need
 */
import * as orderListActions from '../reducers/orderList/orderListActions';
import * as globalActions from '../reducers/global/globalActions';
/**
 * Immutable
 */
import {Map} from 'immutable';
const Global = require('./../lib/enum/Global');
/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header';
var Accordion = require('../components/Accordion');
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButtonOrderList from '../components/FormButtonOrderList';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

let self =null;

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  RecyclerViewBackedScrollView,
  View,
  Text,
  RefreshControl,
  ListView,
  TouchableHighlight
}
from 'react-native';
const {
    RESPONSE_ORDER_LIST,
    LOADING_ORDER_LIST,
    REJECT_ORDER_LIST,
    PENDING_REALTIME_ORDER_LIST,
    RESPONSE_CANCEL_ORDER_LIST,
} = require('../lib/constants').default;
/**
 * ## Styles
 */
import styles from '../lib/Style/OrderListStyle';
/**
 * ## Redux boilerplate
 */
const actions = [
  orderListActions,
  globalActions
];

function mapStateToProps(state) {
  return {
      ...state
  }
};

let formType={
  'Fill':'Fill',
  'Cancel':'Cancel',
  'Working':'Working'
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
function callRequestGetListTradingDeal(callback,fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll, listCurrentState,currentState) {
    callback(fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll, listCurrentState,currentState);
}


class OrderList extends Component {

  constructor(props)
  {
    super(props);
    this.isBusy = this.props.auth.form.isBusy;
    let listItem=[];
    if (this.props.orderList.form.fields.listData!=null) {
      listItem=this.props.orderList.form.fields.listData;
    }
    let listItemCancel=[];
    if (this.props.orderList.form.fields.listDataCancel!=null) {
      listItemCancel=this.props.orderList.form.fields.listDataCancel;
    }
    let listItemFill=[];
    if (this.props.orderList.form.fields.listDataFill!=null) {
      listItemFill=this.props.orderList.form.fields.listDataFill;
    }
    this.state = {
      refreshing: false,
      listData: listItem,
      listDataCancel: listItemCancel,
      listDataFill: listItemFill,
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
      }),
      dataSourceFill: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
      }),
      dataSourceCancel: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
      }),

      isLoading: true,
      opacitytsize: 1,
      ItemSelect: null,
    };


  }

   rederListViewDetail(dataSourceDetailt:any,rowData:any) {
    if (rowData.typeForm===formType.Cancel) {
      return (<View style={styles.rowInfo2}>
        <Text style={styles.columnDetailLeft}>
          Reason
        </Text>
        <Text style={styles.columnDetailRight}>
          {rowData.reason}
        </Text>
      </View>);
    }else {
      return(<View >
        <ListView
          dataSource={dataSourceDetailt}
          renderRow={self.renderRowDataDetail}
          enableEmptySections={true}
          />
      </View>);
    }

  }
   renderButtonDetail(rowData:any) {
    if (rowData.typeForm===formType.Working) {
      return(<View style={styles.rowInfo2}>
      <FormButtonOrderList
             onPress={()=>{
               self.onButtonPressModifyOrder(rowData);}}
             isLoading={self.isBusy}
             buttonStyle={styles.buttonLeftStye}
             buttonViewStyle={styles.buttonLeftViewStye}
             fontButtonStyle={styles.fontButtonStyle}
             buttonText={I18n.t('modifyOrder')}/>

     <FormButtonOrderList
            onPress={()=>{
              self.onButtonPressCancelOrder(rowData.TradingDeal);}}
            isLoading={self.isBusy}
            buttonViewStyle={styles.buttonRightViewStyle}
            fontButtonStyle={styles.fontButtonStyle}
            buttonStyle={styles.buttonRightStyle}
            buttonText={I18n.t('cancelOrder')}/>
      </View>);
    }else {
      return null;
    }
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.orderList.form.state === REJECT_ORDER_LIST) {
      return;
    }

    if (isNullOrEmpty(nextprops.orderList.form.fields.ErrorCode)) {
      this.state.listData=nextprops.orderList.form.fields.listData;
      this.state.listDataFill=nextprops.orderList.form.fields.listDataFill;
      this.state.listDataCancel=nextprops.orderList.form.fields.listDataCancel;
      this.isBusy = nextprops.orderList.form.isBusy;
      var dataList=[];
      dataList=this._genRows(0,formType.Working);

      var dataListFill=[];
      dataListFill=this._genRows(0,formType.Fill);

      var dataListCancel=[];
      dataListCancel=this._genRows(0,formType.Cancel);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataList),
        dataSourceFill: this.state.dataSource.cloneWithRows(dataListFill),
        dataSourceCancel: this.state.dataSource.cloneWithRows(dataListCancel),
      });
    }
  }


  componentWillMount() {
      this._pressData = 0;
    }
  _pressRowDetail(rowID: number,datarow:any) {
    this._pressData = rowID;
    //var dataList=this._genRows(rowID);
    var dataList=[];
    dataList=this._genRows(rowID,datarow.typeForm);
    if (datarow.typeForm===formType.Fill) {
      this.setState({dataSourceFill: this.state.dataSourceFill.cloneWithRows(dataList)});
    }else if (datarow.typeForm===formType.Cancel) {
        this.setState({dataSourceCancel: this.state.dataSourceCancel.cloneWithRows(dataList)});
    }else {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(dataList)});
    }
  }


  _onRefresh() {
      this.setState({refreshing: true});
      fetchData().then(() => {
        this.setState({refreshing: false});
      });
    }
    _genRows(rowId:number,type:string): Array<string> {
      let listTemp=this.state.listData;
      if (type===formType.Fill) {
        listTemp=this.state.listDataFill;
      }else if (type===formType.Cancel) {
        listTemp=this.state.listDataCancel;
      }
      let dataList=[];
      let dataString=getJsonMsg(listTemp);
      dataList=getJsonObject(dataString);
      if (dataList!=null && dataList.length>0) {
        dataList[rowId].IsSelected=true;
      }
      if (dataList==null)
        dataList=[];
      return dataList;
    }
  renderRowDataDetail(dataRow:any, sectionID: number, rowID: number){
    if (rowID%2===0) {
      return (
        <View style={[styles.rowListDetail,{backgroundColor:'#E0E0E0'}]}>
          <Text style={styles.rowDetailDateTimeInfo}>
              {dataRow.dateTime}
          </Text>
          <Text style={styles.rowDetailFillInfo}>
              {dataRow.fillInfo}
          </Text>
        </View>
      );
    }
    return (
      <View style={[styles.rowListDetail,{backgroundColor:'#EDEDED'}]}>
        <Text style={styles.rowDetailDateTimeInfo}>
            {dataRow.dateTime}
        </Text>
        <Text style={styles.rowDetailFillInfo}>
            {dataRow.fillInfo}
        </Text>
      </View>
    );
  }

  renderRow(datarow: any, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    let dataSourceDetail= new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
    });
    if (datarow.listData==null) {
      datarow.listData=[];
    }
    var dataSourceDetailt = dataSourceDetail.cloneWithRows(datarow.listData);

    let header=(
      <View style={styles.wrapperDetail}>
        <View style={styles.columnDetail4}>
          <View style={styles.wapperDetailImg}>
            <Text style={styles.textRowLeft}>{datarow.symbolName}</Text>
            <View style={styles.textRowRight}>
              <Image  style={{height:20,width:20}} source={require('./../images/fa_angle_right.png')}/></View>
            </View>
        </View>
        <View style={styles.columnDetail1}>
            <Text style={styles.textRowDetail}>{datarow.side}</Text>
        </View>
        <View style={styles.columnDetail1}>
            <Text style={styles.textRowDetail}>{datarow.size}</Text>
        </View>
        <View style={styles.columnDetail}>
            <Text style={styles.textRowDetail}>{datarow.limitPrice}</Text>
        </View>
        <View style={styles.columnDetail}>
            <Text style={styles.textRowDetail}>{datarow.stopPrice}</Text>
        </View>

      </View>
    );

    let content=(
      <View style={styles.wapperInfo}>
        <View style={styles.rowInfo1}>
          <Text style={styles.columnDetailLeft}>
            ID
          </Text>
          <Text style={styles.columnDetailRight}>
            {datarow.ID}
          </Text>
        </View>
        <View style={styles.rowInfo2}>
          <Text style={styles.columnDetailLeft}>
            Symbol
          </Text>
          <Text style={styles.columnDetailRight}>
            {datarow.symbolName}
          </Text>
        </View>
        <View style={styles.rowInfo1}>
          <Text style={styles.columnDetailLeft}>
            Company
          </Text>
          <Text style={styles.columnDetailRight}>
            {datarow.companyName}
          </Text>
        </View>
        <View style={styles.rowInfo2}>
          <Text style={styles.columnDetailLeft}>
            Exchange
          </Text>
          <Text style={styles.columnDetailRight}>
            {datarow.exchangeName}
          </Text>
        </View>
        <View style={styles.rowInfo1}>
          <Text style={styles.columnDetailLeft}>
            Entry Time
          </Text>
          <Text style={styles.columnDetailRight}>
              {datarow.entryTime}
          </Text>
        </View>
        <View style={styles.rowInfo2}>
          <Text style={styles.columnDetailLeft}>
            Order Type
          </Text>
          <Text style={styles.columnDetailRight}>
            {datarow.orderType}
          </Text>
        </View>
        <View style={styles.rowInfo1}>
          <Text style={styles.columnDetailLeft2}>
            Limit Price
          </Text>
          <Text style={styles.columnDetailRight2}>
            {datarow.limitPrice}
          </Text>
          <Text style={styles.columnDetailLeft2}>
            Stop Price
          </Text>
          <Text style={styles.columnDetailRight2}>
            {datarow.stopPrice}
          </Text>
        </View>

        <View style={styles.rowInfo2}>
          <Text style={styles.columnDetailLeft}>
            Fill Price
          </Text>
          <Text style={styles.columnDetailRight}>
            {datarow.fillPrice}
          </Text>
        </View>

        <View style={styles.rowInfo1}>
          <Text style={styles.columnDetailLeft}>
            Duration
          </Text>
          <Text style={styles.columnDetailRight}>
            {datarow.duration}
          </Text>
        </View>
        {this.renderButtonDetail(datarow)}
        {this.rederListViewDetail(dataSourceDetailt,datarow)}
      </View>
    );
    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"></Accordion>
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
          <View style={styles.rowBorder4}>
            <Text style={styles.sectionHeaderText}>{I18n.t('Code')}</Text>
          </View>
          <View style={styles.rowBorder1}>
            <Text style={styles.sectionHeaderText}>{I18n.t('Side')}</Text>
          </View>
          <View style={styles.rowBorder1}>
            <Text style={styles.sectionHeaderText}>{I18n.t('Size')}</Text>
          </View>
          <View style={styles.rowBorder}>
            <Text style={styles.sectionHeaderText}>{I18n.t('LimitPrice')}</Text>
          </View>
          <View style={styles.rowBorder}>
            <Text style={styles.sectionHeaderText}>{I18n.t('StopPrice')}</Text>
          </View>
        </View>
      );
    }
    renderSectionHeaderDetail(data, sectionId) {
        var text;
        return (
          <View>
          </View>
        );
      }
  componentDidMount() {
    this._pressData = 0;
    let datain = this._genRows(0);
    this.setState({dataSource: this.state.dataSource.cloneWithRows(datain)});
    let fromTime=new Date(2016,4,10);
    let toTime=new Date(2016,4,11);
    let requestType=RequestType.GetCustom;
    let clientOrderId=null;
    let listOrderTypeEnum=[];
    let isRequestAll=true;
    let listCurrentState=[];
    let memberId=Global.LoggedInMemberInfo.MemberId;
    this.props.actions.getListTradingDealRequest(fromTime, toTime, requestType, clientOrderId, listOrderTypeEnum, isRequestAll, listCurrentState,memberId);
  }

  renderLoadingState(){
    if (this.isBusy) {
      return (
         <Image style={styles.bg} source={require('./../images/loading.gif')} />
      );
    }else {
      return null;
    }
  }
  onCancelOrderConfirm(tradingDeal){
    self.props.actions.requestCancelOrder(tradingDeal);
  }
  onButtonPressCancelOrder(tradingDeal)
  {
    Alert.alert(
      '',
      I18n.t('DoYouWantCancelOrder'),
      [
        {text: 'Confirm', onPress: () => self.onCancelOrderConfirm(tradingDeal)},
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
      ]
    )
  }

  onButtonPressModifyOrder(tradingDeal)
  {
    self.props.actions.actionModifyClick(tradingDeal);
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

          <ScrollableTabView>
                <ScrollView tabLabel="WORKING">
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
                <ScrollView tabLabel="FILL" >
                    <ListView style={styles.listViewStyle}
                      dataSource={this.state.dataSourceFill}
                      pageSize={this.pageSize}
                      initialListSize={this.initialListSize}
                      enableEmptySections={this.enableEmptySections}
                      renderRow={this.renderRow.bind(this)}
                      renderSectionHeader={this.renderSectionHeader}
                      renderSeparator={this._renderSeperator}
                    />
                </ScrollView>
                <ScrollView tabLabel="CANCEL" >
                  <ListView style={styles.listViewStyle}
                    dataSource={this.state.dataSourceCancel}
                    pageSize={this.pageSize}
                    initialListSize={this.initialListSize}
                    enableEmptySections={this.enableEmptySections}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this._renderSeperator}
                  />
                </ScrollView>

              </ScrollableTabView>
              {this.renderLoadingState()}
        </View>
      );

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
