/**
* # FormButton.js
*
* Display a button that responds to onPress and is colored appropriately
*/
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
/**
 * ## Imports
 *
 * React
 */
 import {Map} from 'immutable';

const  React = require('react-native');
const
{
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} = React;

/**
 * The platform neutral button
 */

import Icon from 'react-native-vector-icons/FontAwesome';
/**
 * ## Styles
 */
 var styles = StyleSheet.create({


 rowDetairow: {
   flexDirection:'row',
   borderTopWidth: 0,
   borderBottomWidth:1,
   height: 30
 },
 rowDetailButtonleft: {
   flex:.4,
   flexDirection:'row',
 },

 rowDetailButtonright: {
   padding: 2,
   flex:.6,
   flexDirection:'row',
 },
 viewDetail: {
   padding: 2,
   flex:.2,
   flexDirection:'row',
   justifyContent:'flex-start',
 },
 viewMid: {
   padding: 2,
   flex:.1,
   flexDirection:'row',
   justifyContent:'center',
 },
 inputDetail: {
   padding: 2,
   flex:.7,
   flexDirection:'row',
   borderBottomWidth:1,
   borderBottomColor:'#e85252'
 },
 textstype: {
   flex:1,
   paddingLeft:2,
   alignSelf:'center',
   alignItems:'center',
   justifyContent:'center',
 },
 textQuantitystye: {
   flex:1,
   paddingLeft:2,
   alignItems:'center',
   justifyContent:'flex-end',
   textAlign:'right'
 },
 textboxStyle: {
   flex:1,
   paddingLeft:5,
 },
 buttonIconTop: {
   overflow:'hidden',
 },
 });


var QuantityTypeComponent = React.createClass({

  getInitialState: function () {
    return {
      oValue: this.props.oValue==null?"":this.props.oValue.toString(),
      quantityFill:this.props.oQuantityFill
    };
  },

 buttonInPressHandler: function() {
  const { onChangeValue } = this.props;
  let valuein = parseInt(this.state.oValue) +1;
  this.setState({oValue:valuein.toString()});
  onChangeValue(valuein,this.props.keyDetail);
},
 buttonDePressHandler: function()  {
   const { onChangeValue } = this.props;
   let valuein = parseInt(this.state.oValue) - 1;
   if (valuein<0)
     valuein=0;

   this.setState({oValue:valuein.toString()});
   onChangeValue(valuein,this.props.keyDetail);
 },
 buttonPressHandler: function()  {
   const { onChangeValue } = this.props;
   onChangeValue(this.state.oValue,this.props.keyDetail);
 },
  /**
   * ### render
   *
   * Display the Button
   */
  render() {
    return (
          <View style={styles.rowDetairow} >
            <View style={styles.rowDetailButtonleft}>
              <Text style={styles.textstype}>{this.props.oLabel}</Text>
            </View>

            <View style={styles.rowDetailButtonright}>
              <View style={styles.viewDetail}>
                <Text style={styles.textQuantitystye}>{this.state.quantityFill}</Text>
              </View>
              <View style={styles.viewMid}>
                <Text>/</Text>
              </View>

              <View style={styles.inputDetail}>
                <TextInput style={styles.textboxStyle} keyboardType='numeric'
                  onChangeText={(oValue) => {
                    this.setState({oValue});
                    this.buttonPressHandler();
                  }}
                  value={this.state.oValue}/>
              </View>
            </View>
          </View>
    );
  }
});

module.exports = QuantityTypeComponent;
