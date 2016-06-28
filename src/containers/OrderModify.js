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
 import * as OrderModifyAction from '../reducers/OrderModify/OrderModifyAction';
import {Actions} from 'react-native-router-flux';
const Global = require('./../lib/enum/Global');
/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar';
import styles from '../lib/Style/OrderDetailStyle';
import ButtonBS from '../components/ButtonBuySell';
import QuantityTypeComponent from '../components/QuantityTypeComponent';
import PriceComponent from '../components/PriceComponent';

import {
    StringFormat,
    convertFormatToNumber,
    formatNumber,
    isNullOrEmpty,
    guid,
    getJsonObject,
    clone
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
  OrderModifyAction
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
class OrderModify extends Component {

  constructor(props) {
         super(props);
         var tilebuttom = I18n.t('sell');
         var stylebutton = styles.buttonSellOrder;
         if(this.props.isBuy == true)
         {
           tilebuttom = I18n.t('buy');
           stylebutton = styles.buttonBuyOrder;
         }
         let textordertype = this.props.actions.getTextOrderType(this.props.OrderDeatailData.TradingDeal.OrderType);
         this.state = {
              isBusy:true,
              ErrorText:'',
             valueOrder: this.props.OrderDeatailData.TradingDeal.Quantity,
             FillQuantity: this.props.OrderDeatailData.TradingDeal.CumQty,
             textOrder:I18n.t('buy'),
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


             OrderTypeSelected:this.props.OrderDeatailData.TradingDeal.OrderType,
             modalVisible:false,
             OrderTypeSelectedText:textordertype,

             SymbolId:this.props.OrderDeatailData.TradingDeal.SymbolId,
             AsizePrice:'',
             SellPrice:'',
             BuyPrice:'',
             BsizePrice:'',
             TitleContent:'',
             StopPrice:formatNumber(this.props.OrderDeatailData.TradingDeal.StopPx),
             LimitPrice:formatNumber(this.props.OrderDeatailData.TradingDeal.Price),
             ErrorCode:'',
         };

     }


    componentDidMount() {
      this._onChangeOrderType();
      this.props.actions.subcribePrice(this.state.SymbolId, true);
    }

    componentWillReceiveProps(nextprops) {
      if (nextprops.OrderModify.form.fields.IsResponseAccount) {
        this.setState({
            cashTotal: nextprops.OrderModify.form.fields.cashTotal,
        });
      }else {
        if (!isNullOrEmpty(nextprops.OrderModify.form.fields.ErrorCode)) {
          if (nextprops.OrderModify.form.fields.ErrorCode===ResourcesKeyEnum.Success) {
            Alert.alert(
              '',
              I18n.t('CreateNewOrderSuccess'),
              [
                {text: 'OK', onPress: () => {}},
              ]
            )
          }else {
            if (!isNullOrEmpty(nextprops.OrderModify.form.fields.ErrorCode)) {
              this.setState({
                ErrorText:nextprops.OrderModify.form.fields.ErrorCode,
              });
            }
          }
        }else {
          if (this.state.OrderTypeSelected == OrderTypeEnum.MARKET)
          {
              var totalContract = 0;
              var price = this.state.isOrderBuy?
                        convertFormatToNumber(nextprops.OrderModify.form.fields.BuyPrice):
                        convertFormatToNumber(nextprops.OrderModify.form.fields.SellPrice);
              totalContract = price * convertFormatToNumber(this.state.valueOrder);
              this.state.contractTotal = formatNumber(totalContract);

              let quantity=value-this.props.OrderDeatailData.TradingDeal.Quantity;
              let actionTypeText=quantity > 0 ? I18n.t('AddUpper'):I18n.t('ReduceUpper');
              let sideText=this.props.OrderDeatailData.TradingDeal.IsBuy ? I18n.t('BuyUpper'):I18n.t('SellUpper');
              let textContent = StringFormat(I18n.t('ModifyOrderTextContent'),sideText,actionTypeText,formatNumber(Math.abs(quantity)),formatNumber(price));

              this.state.TitleContent=formatNumber(textContent);
              this.state.tilebuttom=formatNumber(textContent);
          }

          this.setState({
              isBusy: nextprops.OrderModify.form.fields.isBusy,
              AsizePrice:nextprops.OrderModify.form.fields.AsizePrice,
              SellPrice:nextprops.OrderModify.form.fields.SellPrice,
              BuyPrice:nextprops.OrderModify.form.fields.BuyPrice,
              BsizePrice:nextprops.OrderModify.form.fields.BsizePrice,
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

      if (that.state.OrderTypeSelected == OrderTypeEnum.MARKET)
      {
          var totalContract = 0;
          var price = that.state.isOrderBuy?
                    convertFormatToNumber(that.props.OrderModify.form.fields.BuyPrice):
                    convertFormatToNumber(that.props.OrderModify.form.fields.SellPrice);
          totalContract = price * convertFormatToNumber(that.state.valueOrder);
          that.setState({contractTotal:formatNumber(totalContract)});
      } else {
        let value=convertFormatToNumber(that.state.valueOrder);
        let price=0;
        if (that.state.OrderTypeSelected == OrderTypeEnum.STOP_LIMIT)
          price=convertFormatToNumber(that.state.LimitPrice);
        if (that.state.OrderTypeSelected == OrderTypeEnum.LIMIT)
          price=convertFormatToNumber(that.state.LimitPrice);
        if (that.state.OrderTypeSelected == OrderTypeEnum.STOP)
          price=convertFormatToNumber(that.state.StopPrice);
        var totalContract = 0;

        let quantity=value - that.props.OrderDeatailData.TradingDeal.Quantity;
        let actionTypeText = quantity > 0 ? I18n.t('AddUpper'):I18n.t('ReduceUpper');
        let sideText=that.props.OrderDeatailData.TradingDeal.IsBuy ? I18n.t('BuyUpper'):I18n.t('SellUpper');

        let textContent = StringFormat(I18n.t('ModifyOrderTextContent'),sideText,actionTypeText,formatNumber(Math.abs(quantity)),formatNumber(price));
        //TitleContent

        totalContract = price * value;
        that.setState({
          contractTotal:formatNumber(totalContract),
          TitleContent:formatNumber(textContent),
          tilebuttom:formatNumber(textContent),
        });

      }
  }
    getOrderType(){
      if (this.state.OrderTypeSelected == OrderTypeEnum.STOP_LIMIT)
        return OrderTypeEnum.STOP_LIMIT;
      if (this.state.OrderTypeSelected == OrderTypeEnum.LIMIT)
        return OrderTypeEnum.LIMIT;
      if (this.state.OrderTypeSelected == OrderTypeEnum.MARKET)
        return OrderTypeEnum.MARKET;
      if (this.state.OrderTypeSelected == OrderTypeEnum.STOP)
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
      if (convertFormatToNumber(this.state.valueOrder) < this.props.OrderDeatailData.TradingDeal.CumQty) {
        textError=I18n.t('VolumeLessThanNotSet');
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

     let tradingDeal=clone(this.props.OrderDeatailData.TradingDeal);
     tradingDeal.Quantity=convertFormatToNumber(this.state.valueOrder);
     switch (tradingDeal.OrderType) {
       case OrderTypeEnum.LIMIT:
           tradingDeal.Price = convertFormatToNumber(this.state.LimitPrice);
           break;
       case OrderTypeEnum.STOP:
          tradingDeal.StopPx = convertFormatToNumber(this.state.StopPrice);
           break;
       case OrderTypeEnum.STOP_LIMIT:
           tradingDeal.StopPx = convertFormatToNumber(this.state.StopPrice);
           tradingDeal.Price = convertFormatToNumber(this.state.LimitPrice);
           break;
     }

     let stringALert=this.state.TitleContent;
     Alert.alert(
       '',
       stringALert,
       [
         {text: 'Confirm', onPress: () => this.props.actions.requestUpdateOrder(tradingDeal)},
         {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
       ]
     )
  }

  _onChangeOrderType(){
      if(this.state.OrderTypeSelected == OrderTypeEnum.STOP_LIMIT)
      {
          this.setState({ isShowStopPrice:true,
                           isShowLimitPrice:true,
                           isShowExchange:true,
                           isShowDuration:true,
                          });
      }
      if(this.state.OrderTypeSelected == OrderTypeEnum.MARKET)
      {
        this.setState({ isShowStopPrice:false,
                         isShowLimitPrice:false,
                         isShowExchange:false,
                         isShowDuration:false,
                        });
      }
      if(this.state.OrderTypeSelected == OrderTypeEnum.LIMIT)
      {
        this.setState({ isShowStopPrice:false,
                         isShowLimitPrice:true,
                         isShowExchange:true,
                         isShowDuration:true,
                        });
      }
      if(this.state.OrderTypeSelected == OrderTypeEnum.STOP)
      {
        this.setState({ isShowStopPrice:true,
                         isShowLimitPrice:false,
                         isShowExchange:false,
                         isShowDuration:true,
                        });
      }


  }
_ShowLimitPrice(){
  if(this.state.isShowLimitPrice)
  {
    return (<PriceComponent key='limitprice'  keyDetail={'limitprice'}    oLabel = {'Limit Price'} oValue = {this.state.LimitPrice}
    onChangeValue = {this._onChangeVolumnChange}/>);
  }
  return null;
}
_ShowStopPrice(){
  if(this.state.isShowStopPrice)
  {
    return ( <PriceComponent key='stopprice' keyDetail={'stopprice'}   oLabel = {'Stop Price'} oValue = {this.state.StopPrice}
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
      title: this.props.OrderDeatailData.symbolName +'\r\n' + this.props.OrderDeatailData.symbolName,
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
                <Picker.Item label={I18n.t('markertOrder')} value={OrderTypeEnum.MARKET} />
                <Picker.Item label={I18n.t('limitOrder')} value={OrderTypeEnum.LIMIT} />
                <Picker.Item label={I18n.t('stopOrder')} value={OrderTypeEnum.STOP} />
                <Picker.Item label={I18n.t('stopLimitOrder')} value={OrderTypeEnum.STOP_LIMIT} />
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
             />
           </View>

           <View style={{flex:0.05}}></View>
           <View style={{flex:.4}}>
             <ButtonBS key = 'buyshow' IsBuy = {true} sizeLabel = {'Buy'}
             sizePrice ={this.state.BuyPrice} priceLable = {'B-Size'}  iPrice = {this.state.BsizePrice}
             />
           </View>
      	 </View>
        <View style={styles.borderWidthOrder}>
          <View style={styles.rowDetairow}>
             <View style={styles.typeOrderLeft}>
                <Text>Type Order</Text>
             </View>
             <View style={styles.typeOrderRight}>
               <Button style={{borderRadius:0,paddingLeft:5,paddingRight:5,height:25}} key='btnorderType'  >
                 {/*onPress={this._setModalVisible.bind(this, true)}*/}
                  {this.state.OrderTypeSelectedText}
               </Button>
             </View>
          </View>
         </View>

         <QuantityTypeComponent key='Volomn'  keyDetail={'volume'}
           oLabel = {'Volume'} oValue = {this.state.valueOrder}
           oQuantityFill = {this.state.FillQuantity}
           onChangeValue = {this._onChangeVolumnChange}/>

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
export default connect(mapStateToProps, mapDispatchToProps)(OrderModify);
