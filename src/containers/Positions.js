
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
import * as authActions from '../reducers/OpenPositions/openPositionAction';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The necessary React components
 */
import React,
{
  Component,
  View,
  Image,
  ListView,
  Text,
  ScrollView
}
from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';


import {
    Actions
}
from 'react-native-router-flux'; 

import {
    formatNumber,
    toString,
}
from './../lib/base/FunctionUtils';   

var Accordion = require('../components/Accordion');
var ImageRotate = require('../components/ImageRotate');

import {getDateTimeFullString} from '../lib/base/DateTime';


import styles from '../lib/Style/OpenPositionStyle';



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

let _ref =null;

class OpenPositions extends Component {
    constructor(props){
    super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.isBusy = this.props.openPosition.form.isBusy;

      let curListOpenPosition=[];
      if (this.props.openPosition.form.fields.listPosition!=null) {
        curListOpenPosition = this.props.openPosition.form.fields.listPosition;
      }

      this.state = {
        dataSource : ds,
        dataSourceFormHidden : ds,
        empty : false,
        listData : [],
      }
    }
    componentDidMount() {
      let current;
      this.props.actions.GetListBussinessInfo(current);
    }
    componentWillReceiveProps(nextprops) {
        let listData = nextprops.openPosition.form.fields.listPosition;
        let listAccAmountInfo = nextprops.openPosition.form.fields.lissAccAmountInfo;
        let fee = _ref.getFees(listAccAmountInfo);
        this.state.listData = listData;
        this.isBusy = nextprops.openPosition.form.isBusy;
        //Xk
        let headData = [];
        for (let item of listData)
          if(item.OpenPositionInfoKeys.OderTransactionId === 0){
              item.Fees = fee;
              headData.push(item);
          }
        this.state.dataSource = this.state.dataSource.cloneWithRows(headData);
        if(headData.length === 0)
          this.state.empty = true;
        else
          this.state.empty = false;  
        
    }
    
    render() {
      _ref = this;
      return (
        <ExNavigator
          initialRoute={this.getRoute()}
          style={{flex : 1 }}
          sceneStyle={{ paddingTop: 64 }} 
        />
      );
    }

    _renderRow(rowData: any, sectionID: number, rowID: number) {
      _ref.setDataHiddenForm(rowData,rowID);
      return (
        <Accordion
          header={_ref._renderHeader(rowData,sectionID,rowID)}
          content={_ref._renderContent(rowData,sectionID,rowID)}
          easing="easeOutCubic"
          onPress = {() => {_ref._pressRow(rowID)}}
        >{() => {console.warn('accordion') ; console.warn(this)}}</Accordion>
      );
    }

    _renderHeader(rowData: any, sectionID: number, rowID: number){
      return(
        <View>
          <View style = {styles.row}>
                <View style = {[styles.columnCode,{flexDirection : 'row'}]}>
                    <Text style = {[styles.textContent , {flex : 0.7}]}> {_ref._convertSymbol(rowData,rowID)} </Text>
                    <ImageRotate style = {{flex : 0.3 , paddingLeft : 10}} refs = 'imgRotate'/>
                </View>
                <View style = {styles.columnVolume}>
                  <View style = {styles.viewTextContent}>
                    <Text style = {styles.textContent}> {formatNumber(rowData.Position, 2, true )} </Text>
                  </View>
                </View>
                <View style = {styles.columnMarket}>
                  <View style = {styles.viewTextContent}>
                    <Text style = {styles.textContent}> {formatNumber(rowData.MarketPrice ,2 , true)} </Text>
                  </View>
                </View>
                <View style = {styles.columnValue}>
                  <View style = {styles.viewTextContent}>
                    <Text style = {styles.textContent}> {formatNumber(_ref._calValue(rowData,rowID) ,2 ,true)} </Text>
                  </View>
                </View>
          </View>
        </View>
      )
    }
    _renderContent(rowData: any, sectionID: number, rowID: number){
      return (
        <View>
          <View style = {styles.formHiddenContent}>
            <View style = {styles.formHiddenCompany}>
              <View style = {styles.formHiddenCompanyChild}>
                <View style = {{flex : 0.3}}>
                  <Text style = {{paddingLeft : 10}}>
                    Company
                  </Text>
                </View>
                <View style = {{flex : 0.7}}>
                  <Text style = {{paddingLeft : 10}}>
                      {_ref._convertSymbol(rowData,rowID)}
                  </Text>
                </View>
              </View>
            </View>
            <View style = {styles.formHiddenTable}>
              <View style = {styles.formHiddenTableContai1}>
                <View style = {styles.formHiddenTableChild}>
                  <Text style = {styles.formHiddenTableText1}> Avr Price </Text>
                  <Text style = {styles.formHiddenTableText2}>{formatNumber(_ref._calAvrPrice(rowData,rowID), 2, true)} </Text>
                </View>
                <View style = {styles.formHiddenTableChild}>
                    <Text style = {styles.formHiddenTableText1}> Mrk Price </Text>
                    <Text style = {styles.formHiddenTableText2}>{formatNumber(rowData.MarketPrice, 2,true)} </Text>
                </View>
              </View>
              <View style = {styles.formHiddenTableContai2}>
                <View style = {styles.formHiddenTableChild}>
                  <Text style = {styles.formHiddenTableText1}> UPnL </Text>
                  <Text style = {styles.formHiddenTableText2} numberOfLines = {1}>{formatNumber(rowData.UnPnL, 2,true)} </Text>
                </View>
                <View style = {styles.formHiddenTableChild}>
                    <Text style = {styles.formHiddenTableText1}> Fees </Text>
                    <Text style = {styles.formHiddenTableText2}>{formatNumber(rowData.Fees, 2,true)} </Text>   
                </View>
              </View>
            </View>
          </View>

          <View style = {styles.formHiddenList}>
            <ListView dataSource={_ref.state.dataSourceFormHidden}
                      renderRow={_ref._renderRowFormHidden}
            />
          </View>
        </View>
      )
    }

     _renderLoading () {
      if(this.isBusy)
        return (
          <View>
              <Image style={styles.bg} source={require('./../images/loading.gif')} />
          </View>
        )
      if(this.state.empty) 
        return;
        
      return (
          <ScrollView>
            <ListView
              dataSource={_ref.state.dataSource}
              renderRow={_ref._renderRow}
            />
          </ScrollView>
        )
    }

    _convertSymbol(rowData : any ,rowID  : number) {
      let symbolID =  rowData.OpenPositionInfoKeys.SymbolId;
      let objSymbol = Global.DicSymbol[symbolID.toString()];
      return objSymbol.ContractName;
    }
    _calValue(rowData : any,rowID : number){
      return (rowData.MarketPrice *
      rowData.Position);
    }
    _calAvrPrice(rowData : any ,rowID : number){
      return rowData.AvgBuy === 0 ? rowData.AvgSell : rowData.AvgBuy;
    }
    _renderDatasourceHiddenForm (rowID  : number){
      
    }

    setDataHiddenForm(rowData : any , rowID : number){
      let data = [];
      for (let item of this.state.listData){
        if(item.OpenPositionInfoKeys.OderTransactionId ===  0) {}
        else {
          if(item.OpenPositionInfoKeys.SymbolId == rowData.OpenPositionInfoKeys.SymbolId)
            data.push(item);
        }
      }

      data.sort(function(a,b) { 
        a = new Date(a.TimeChanged);
        b = new Date(b.TimeChanged);
        return a<b ? -1 : a>b ? 1 : 0;
      });  
      
      let c = data.length ; 
      let data2 = [];
      let limit  = c > 5 ? c - 6 : -1;
      for(var i = c - 1 ; i > limit ; i-- ){
        data2.push(data[i]);
      }
      this.state.dataSourceFormHidden = this.state.dataSourceFormHidden.cloneWithRows(data2);
    }

    getIDAndTime(rowData : any){
      let iD = rowData.ChainOrderId;
      
      let time = getDateTimeFullString(rowData.TimeChanged);
      return (iD + ',' + time);
    }
    
    getFees(list){
      for (let item of list){
        let s = item.AccountAmountInfoKeys.AccountId.toString();
        let n = s.indexOf('USD');
        
        if(n === -1){}
        else
          return item.Fee;
      }
    }
    


    _renderRowFormHidden(rowData : any , rowID : number){
      return(
        <View style = {{flexDirection : 'row',padding : 1}}>
          <View style = {{flex : 0.25,backgroundColor : '#e1e1e1',height : 25 }}>
            <Text style = {{textAlign : 'right'}}>{formatNumber(rowData.Position, 2, true )}@{formatNumber(rowData.MarketPrice ,2 , true)}</Text>
          </View>
          <View style = {{flex : 0.01}} />
          <View style = {{flex : 0.74,backgroundColor : '#e1e1e1',height : 25 }}>
            <Text style = {{textAlign : 'right'}} numberOfLines  = {1}>{_ref.getIDAndTime(rowData)}</Text>
          </View>
        </View>
      )

    }
    _pressRow (rowID) {
      // ImageRotate.start(rowID);
      // console.warn(rowID);
    }
   

    getRoute() {
      return{
        renderScene(navigator){
          return (
            <View style = {styles.container}>
            <View style = {styles.containerTable}>
            <View style = {styles.row}>
                  <View style = {styles.columnCode}>
                    <View>
                      <Text style = {styles.textContent}> {I18n.t('Code')} </Text>
                    </View>
                  </View>
                  <View style = {styles.columnVolume}>
                    <View style = {styles.viewTextContent}>
                      <Text style = {styles.textContent}> {I18n.t('Volume')} </Text>
                    </View>
                  </View>
                  <View style = {styles.columnMarket}>
                    <View style = {styles.viewTextContent}>
                      <Text style = {styles.textContent}> {I18n.t('Market')} </Text>
                    </View>
                  </View>
                  <View style = {styles.columnValue}>
                    <View style = {styles.viewTextContent}>
                      <Text style = {styles.textContent}> {I18n.t('Values')} </Text>
                    </View>
                  </View>
            </View>
              <View style = {styles.sum}>
                <Text style = {styles.textSum}> USD</Text>         
                <Text style = {[styles.textSum , styles.textRight]}> 1234</Text>                     
              </View>
              {_ref._renderLoading()}
            </View>
              <View style = {[styles.sum,{marginBottom: 46}]}>
                <Text style = {styles.textSum}> {I18n.t('Sum')}</Text>
                <Text style = {[styles.textSum , styles.textRight]}> 1234</Text>
              </View>
            </View>
          );
        },
        getTitle() {
          return 'Open Positions';
        }
      }
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(OpenPositions);

