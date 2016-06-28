/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict';
/*
 * ## Imports
 *
 * Imports from redux
 */

var I18n = require('react-native-i18n');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
/**
 * Immutable
 */
import {Map} from 'immutable';
const {
  LOADING_ORDER_DETAIL,
  RESPONSE_NEW_ORDER_ORDER_DETAIL,
  RESPONSE_ORDER_DETAIL,
  RESPONSE_ACCOUNT_ORDER_DETAIL,
  BROADCAST_PRICE_ORDER_DETAIL
} = require('../lib/constants').default;
/**
 * The platform neutral button
 */
 /**
  * The platform neutral button
  */
 const  Button = require('apsl-react-native-button');
import Icon from 'react-native-vector-icons/FontAwesome';
/**
 * Router
 */
 import * as OrderDetailAction from '../reducers/OrderDetail/OrderDetailAction';
import {Actions} from 'react-native-router-flux';
const Global = require('./../lib/enum/Global');
/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar';
import styles from '../lib/Style/OrderDetailStyle';
import ButtonBS from '../components/ButtonBuySell';
import OrderTypeComponent from '../components/OrderTypeComponent';

import {
    StringFormat,
    convertFormatToNumber,
    formatNumber,
    isNullOrEmpty,
    guid,
    getJsonObject
}
from './../lib/base/FunctionUtils';
import * as OrderTypeEnum from './../lib/enum/OrderTypeEnum';
import * as TimeInForceEnum from './../lib/enum/TimeInForceEnum';
import * as ResourcesKeyEnum from './../lib/enum/ResourcesKeyEnum';

/**
 * The necessary components from React
 */
import React,
{
  Component,
  View,
  Alert,
  Text,
  Picker,Modal,
  ScrollView,
  SegmentedControlIOS,
  TouchableHighlight
}
from 'react-native';
const Item = Picker.Item;
/**
 * If your app uses Redux action creators, you can add them here...
 *
 */
const actions = [
  OrderDetailAction
];
let that=null;
/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
      ...state
  };
};

/*
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```

 */
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


/**
 * ## Subview class
 */
class OrderDetail extends Component {

  constructor(props) {
         super(props);
         var tilebuttom = I18n.t('sell');
         var stylebutton = styles.buttonSellOrder;
         if(this.props.isBuy == true)
         {
           tilebuttom = I18n.t('buy');
           stylebutton = styles.buttonBuyOrder;
         }

         let textordertype = this.props.actions.getTextOrderType('MKT');
         this.state = {
              isBusy:true,
              ErrorText:'',
             valueOrder: 0,
             textOrder:this.props.isBuy?I18n.t('buy'):I18n.t('sell'),
             isOrderBuy:this.props.isBuy,
             tilebuttom:tilebuttom,
             stylebutton:stylebutton,
             contractTotal:'',
             cashTotal:'',
             feesTotal:15,
             selectedDurationIndex:0,
             selectedDurationValue:'Day',
             selectedExchangeIndex:0,
             isShowStopPrice:false,
              isShowLimitPrice:false,
              isShowExchange:false,
              isShowDuration:false,
              IsResponseAccount:false,


             OrderTypeSelected:'MKT',
             modalVisible:false,
             OrderTypeSelectedText:textordertype,

             SymbolId:this.props.OrderData.SymbolId,
             AsizePrice:this.props.OrderData.AsizePrice,
             SellPrice:this.props.OrderData.SellPrice,
             BuyPrice:this.props.OrderData.BuyPrice,
             BsizePrice:this.props.OrderData.BsizePrice,

             StopPrice:'0',
             LimitPrice:'0',
             ErrorCode:'',
         };

     }
     showButtonBuySell(){
       var tilebuttom = I18n.t('sell');
       var stylebutton = styles.buttonSellOrder;
       if(this.state.isOrderBuy == true)
       {
         tilebuttom = I18n.t('buy');
         stylebutton = styles.buttonBuyOrder;
       }
       this.setState({tilebuttom:tilebuttom,
                      stylebutton:stylebutton});
     }
   actionBuyClick() {
      this.setState({isOrderBuy: true});
      this.showButtonBuySell();
    }
   actionSellClick() {
     this.setState({isOrderBuy: false});
     this.showButtonBuySell();
    }

    componentDidMount() {
      this.props.actions.subcribePrice(this.state.SymbolId, true);
    }

    componentWillReceiveProps(nextprops) {
      if (nextprops.OrderDetail.form.fields.IsResponseAccount) {
        this.setState({
            cashTotal: nextprops.OrderDetail.form.fields.cashTotal,
        });
      }else {
        if (!isNullOrEmpty(nextprops.OrderDetail.form.fields.ErrorCode)) {
          if (nextprops.OrderDetail.form.fields.ErrorCode===ResourcesKeyEnum.Success) {
            Alert.alert(
              '',
              I18n.t('CreateNewOrderSuccess'),
              [
                {text: 'OK', onPress: () => {}},
              ]
            )
          }else {
            if (!isNullOrEmpty(nextprops.OrderDetail.form.fields.ErrorCode)) {
              this.setState({
                ErrorText:nextprops.OrderDetail.form.fields.ErrorCode,
              });
            }
          }
        }else {
          if (this.state.OrderTypeSelected == 'MKT')
          {
              var totalContract = 0;
              var price = this.state.isOrderBuy?
                        convertFormatToNumber(nextprops.OrderDetail.form.fields.BuyPrice):
                        convertFormatToNumber(nextprops.OrderDetail.form.fields.SellPrice);
              totalContract = price * convertFormatToNumber(this.state.valueOrder);
              this.state.contractTotal = formatNumber(totalContract);
          }

          this.setState({
              isBusy: nextprops.OrderDetail.form.fields.isBusy,
              AsizePrice:nextprops.OrderDetail.form.fields.AsizePrice,
              SellPrice:nextprops.OrderDetail.form.fields.SellPrice,
              BuyPrice:nextprops.OrderDetail.form.fields.BuyPrice,
              BsizePrice:nextprops.OrderDetail.form.fields.BsizePrice,
          });
        }
      }


    }

  _onChangeVolumnChange(value,key) {

      if (key==="stopprice") {
        that.state.StopPrice=value;

      } else if(key==="limitprice") {
        that.state.LimitPrice=value;

      } else {
        that.state.valueOrder=value;
      }

      if (that.state.OrderTypeSelected == 'MKT')
      {
          var totalContract = 0;
          var price = that.state.isOrderBuy?
                    convertFormatToNumber(that.props.OrderDetail.form.fields.BuyPrice):
                    convertFormatToNumber(that.props.OrderDetail.form.fields.SellPrice);
          totalContract = price * convertFormatToNumber(that.state.valueOrder);
          that.setState({contractTotal:formatNumber(totalContract)});
      } else {
        let value=convertFormatToNumber(that.state.valueOrder);
        let price=0;
        if (that.state.OrderTypeSelected == 'STL')
          price=convertFormatToNumber(that.state.LimitPrice);
        if (that.state.OrderTypeSelected == 'LMT')
          price=convertFormatToNumber(that.state.LimitPrice);
        if (that.state.OrderTypeSelected == 'SMP')
          price=convertFormatToNumber(that.state.StopPrice);
        var totalContract = 0;
        totalContract = price * value;
        that.setState({contractTotal:formatNumber(totalContract)});
      }
  }
    getOrderType(){
      if (this.state.OrderTypeSelected == 'STL')
        return OrderTypeEnum.STOP_LIMIT;
      if (this.state.OrderTypeSelected == 'LMT')
        return OrderTypeEnum.LIMIT;
      if (this.state.OrderTypeSelected == 'MKT')
        return OrderTypeEnum.MARKET;
      if (this.state.OrderTypeSelected == 'SMP')
        return OrderTypeEnum.STOP;

      return null;
    }
    getDurationValue(){
      if (this.state.selectedDurationValue == 'Day')
        return TimeInForceEnum.DAY;
      if (this.state.selectedDurationValue == 'GTC')
        return TimeInForceEnum.GOOD_TILL_CANCEL;
    }
    checkDataInput(){
      let textError='';
      if (isNullOrEmpty(this.state.valueOrder)
      ||convertFormatToNumber(this.state.valueOrder)===0
      ||convertFormatToNumber(this.state.valueOrder)<=0) {
        textError=I18n.t('VolumeIsNotSet');
      }
      return textError;
    }
 _onButtonOrderPressHandler() {
   let errorCode=this.checkDataInput();
   this.setState({
     ErrorText:errorCode,
   });
   if (!isNullOrEmpty(errorCode)) {
     return;
   }

     let objectNewOrder={};
     objectNewOrder.Account=Global.LoggedInMemberInfo.DisplayMemberName;
     objectNewOrder.OrderQty=convertFormatToNumber(this.state.valueOrder);
     objectNewOrder.OrderType=this.getOrderType();
     objectNewOrder.IsBuy=this.state.isOrderBuy;
     objectNewOrder.ClOrdID=guid();
     objectNewOrder.SymbolId=this.state.SymbolId;
     objectNewOrder.TimeInForce=this.getDurationValue();
     switch (objectNewOrder.OrderType) {
       case OrderTypeEnum.LIMIT:
           objectNewOrder.Price = convertFormatToNumber(this.state.LimitPrice);
           break;
       case OrderTypeEnum.STOP:
          objectNewOrder.StopPx = convertFormatToNumber(this.state.StopPrice);
           break;
       case OrderTypeEnum.STOP_LIMIT:
           objectNewOrder.StopPx = convertFormatToNumber(this.state.StopPrice);
           objectNewOrder.Price = convertFormatToNumber(this.state.LimitPrice);
           break;
     }

     let stringALert='';
    let buySellText=objectNewOrder.IsBuy?I18n.t('BuyUpper'):I18n.t('SellUpper');
     switch (objectNewOrder.OrderType) {
       case OrderTypeEnum.LIMIT:
           stringALert = StringFormat(I18n.t('NewOrderLimitAlert'),buySellText,this.props.OrderData.Symbol,objectNewOrder.OrderQty,this.state.LimitPrice);
           break;
       case OrderTypeEnum.STOP:
          stringALert = StringFormat(I18n.t('NewOrderStopAlert'),buySellText,this.props.OrderData.Symbol,objectNewOrder.OrderQty,this.state.StopPrice);
           break;
       case OrderTypeEnum.STOP_LIMIT:
          stringALert = StringFormat(I18n.t('NewOrderStopLimitAlert'),buySellText,this.props.OrderData.Symbol,objectNewOrder.OrderQty,this.state.LimitPrice,this.state.StopPrice)
           break;
      case OrderTypeEnum.MARKET:
        stringALert = StringFormat(I18n.t('NewOrderMarketAlert'),buySellText,this.props.OrderData.Symbol,objectNewOrder.OrderQty);
    }

     Alert.alert(
       '',
       stringALert,
       [
         {text: 'Confirm', onPress: () => this.props.actions.requestNewOrderSingle(objectNewOrder)},
         {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
       ]
     )
  }

  _onChangeOrderType(){
      if(this.state.OrderTypeSelected == 'STL')
      {
          this.setState({ isShowStopPrice:true,
                           isShowLimitPrice:true,
                           isShowExchange:true,
                           isShowDuration:true,
                          });
      }
      if(this.state.OrderTypeSelected == 'MKT')
      {
        this.setState({ isShowStopPrice:false,
                         isShowLimitPrice:false,
                         isShowExchange:false,
                         isShowDuration:false,
                        });
      }
      if(this.state.OrderTypeSelected == 'LMT')
      {
        this.setState({ isShowStopPrice:false,
                         isShowLimitPrice:true,
                         isShowExchange:true,
                         isShowDuration:true,
                        });
      }
      if(this.state.OrderTypeSelected == 'SMP')
      {
        this.setState({ isShowStopPrice:true,
                         isShowLimitPrice:false,
                         isShowExchange:false,
                         isShowDuration:true,
                        });
      }
      if(this.state.OrderTypeSelected == 'GTC')
      {
        this.setState({ isShowStopPrice:true,
                         isShowLimitPrice:true,
                         isShowExchange:true,
                         isShowDuration:true,
                        });
      }

  }
_ShowLimitPrice(){
  if(this.state.isShowLimitPrice)
  {
    return (<OrderTypeComponent key='limitprice'  keyDetail={'limitprice'}    oLabel = {'Limit Price'} oValue = {this.state.LimitPrice}
    onChangeValue = {this._onChangeVolumnChange}/>);
  }
  return null;
}
_ShowStopPrice(){
  if(this.state.isShowStopPrice)
  {
    return ( <OrderTypeComponent key='stopprice' keyDetail={'stopprice'}   oLabel = {'Stop Price'} oValue = {this.state.StopPrice}
    onChangeValue = {this._onChangeVolumnChange}/>);
  }
  return null;
}
_ShowDuration(){
  {
    if(this.state.isShowDuration)
    {
      return ( <View  style={[styles.rowDetairow,styles.borderWidthOrder]}>
        <View style={styles.typeOrderLeft}>
           <Text>Duration</Text>
        </View>
        <View style={styles.typeOrderRight}>
          <SegmentedControlIOS style={{height:25}}
              values={['Day', 'GTC']}
              selectedIndex={this.state.selectedDurationIndex}
              onChange={(event) => {
                this.state.selectedDurationValue=event.nativeEvent.value;
                this.setState({selectedDurationIndex: event.nativeEvent.selectedSegmentIndex});
              }} />
        </View>
      </View>);
    }
    return null;
  }
}
_ShowExchange(){
  {
    if(this.state.isShowExchange)
    {
      return ( <View  style={[styles.rowDetairow,styles.borderWidthOrder]}>
        <View style={styles.typeOrderLeft}>
           <Text>Exchange</Text>
        </View>
        <View style={styles.typeOrderRight}>
          <SegmentedControlIOS style={{height:25}}
           values={['ASX', 'Chi-X']}
           selectedIndex={this.state.selectedExchangeIndex}
           onChange={(event) => {
             this.setState({selectedExchangeIndex: event.nativeEvent.selectedSegmentIndex});
           }} />
        </View>
      </View>);
    }
    return null;
  }
}

//modal
_setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
//end modal
  render() {
    var titleConfig = {
      title: this.props.OrderData.Symbol +'\r\n' + this.props.OrderData.companyName,
      style:{textAlign:'left'}
    };

    var leftButtonConfig = {
      title: "<",
    //title: <Icon name='chevron-left' size={20} />,
      handler: Actions.pop
    };
that=this;
    return(
      <ScrollView>
      <View>
      <Modal
         animationType={'fade'}
         transparent={true}
         visible={this.state.modalVisible}
         onRequestClose={() => {this._setModalVisible(false)}}
         >
         <View style={[styles.container, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
           <View style={styles.innerContainer}>

             <View style={[styles.rowDetairow,styles.borderWidthOrder]}>
                <View style={[styles.typeOrderLeft,{}]}>
                    <Text style = {[styles.title, {marginTop:10}]}>Order Type Select</Text>
                </View>
                <View style={{flex:1}}>
                </View>
                <View style={styles.buttonItermClose}>
                    <TouchableHighlight key='ibtnCloseModal' onPress={this._setModalVisible.bind(this, false)}
                                style={styles.buttonIconTop}>
                      <Icon name='remove' size={20} />
                    </TouchableHighlight>
                </View>
             </View>
             <Picker style={{marginTop: 10}}
                selectedValue={this.state.OrderTypeSelected}
                onValueChange={(otype) => {
                                          let textordertype = this.props.actions.getTextOrderType(otype);
                                          this.setState({OrderTypeSelected: otype,
                                                      OrderTypeSelectedText:textordertype
                                          });
                                          this._onChangeOrderType();
                                        } }>
                <Picker.Item label={I18n.t('markertOrder')} value="MKT" />
                <Picker.Item label={I18n.t('limitOrder')} value="LMT" />
                <Picker.Item label={I18n.t('stopOrder')} value="SMP" />
                <Picker.Item label={I18n.t('stopLimitOrder')} value="STL" />
              </Picker>
           </View>
         </View>
       </Modal>

      	<NavigationBar
                  title={ titleConfig }
                  leftButton={ leftButtonConfig }
      	/>

      	<View style={ styles.container }>
      	 <View style={styles.rowTitle}>
           <View style={{flex:.4}}>
             <ButtonBS key = 'sellshow'
             IsBuy = {false}  sizeLabel = {'A-Size'}  sizePrice ={this.state.AsizePrice}
             priceLable = {'Sell'} iPrice = {this.state.SellPrice}
             onPress = {this.actionSellClick.bind(this)} />
           </View>

           <View style={{flex:0.05}}></View>
           <View style={{flex:.4}}>
             <ButtonBS key = 'buyshow' IsBuy = {true} sizeLabel = {'Buy'}
             sizePrice ={this.state.BuyPrice} priceLable = {'B-Size'}  iPrice = {this.state.BsizePrice}
             onPress = {this.actionBuyClick.bind(this)} />
           </View>
      	 </View>
        <View style={styles.borderWidthOrder}>
          <View style={styles.rowDetairow}>
             <View style={styles.typeOrderLeft}>
                <Text>Type Order</Text>
             </View>
             <View style={styles.typeOrderRight}>
               <Button style={{borderRadius:0,paddingLeft:5,paddingRight:5,height:25}} key='btnorderType' onPress={this._setModalVisible.bind(this, true)} >
                  {this.state.OrderTypeSelectedText}
               </Button>
             </View>
          </View>
         </View>

         <OrderTypeComponent key='Volomn'  keyDetail={'volume'}    oLabel = {'Volume'} oValue = {this.state.valueOrder} onChangeValue = {this._onChangeVolumnChange}/>

         {this._ShowLimitPrice()}
         {this._ShowStopPrice()}
         {this._ShowDuration()}
          {this._ShowExchange()}
          <View style={styles.errorStyle}>
            <Text style={styles.errorTextStyle}>
              {this.state.ErrorText}
            </Text>
          </View>
         <Button key='btorder' onPress={this._onButtonOrderPressHandler.bind(this)}  style={this.state.stylebutton} textStyle = {{color:'#FFFFFF'}}>
             {this.state.tilebuttom}
         </Button>
      	</View>


        <View style={styles.styleBotton}>
          <View style={styles.rowDetairow}>
          <View style={styles.statusBottonLeft}>
            <Text>Cash</Text>
            <Text>{this.state.cashTotal}</Text>
          </View>
          <View style={styles.statusBottonMidder}>
            <Text>Order Value</Text>
            <Text>{this.state.contractTotal}</Text>
          </View>
          <View style={styles.statusBottonRight}>
          <Text>Total Fees</Text>
          <Text>{this.state.feesTotal}</Text>
          </View>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
