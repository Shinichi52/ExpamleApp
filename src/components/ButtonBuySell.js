/**
* # FormButton.js
*
* Display a button that responds to onPress and is colored appropriately
*/
'use strict';
/**
 * ## Imports
 *
 * React
 */
const  React = require('react-native');
const
{
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;

/**
 * The platform neutral button
 */
const  Button = require('apsl-react-native-button');

/**
 * ## Styles
 */
 var styles = StyleSheet.create({

 button: {
     marginTop: 2,
     backgroundColor: '#F87713',
     borderColor:  '#F87713'
   },
 rowDetairow: {
   flexDirection:'row',
   flex:1,
   height:30
 },

 rowDetailButtonleft: {
   marginTop: 2,
   flex:.5,
   flexDirection:'row',
   alignSelf:'center',
   alignItems:'center',
   justifyContent:'center',
 },
 rowDetailButtonright: {
   marginLeft: 2,
   marginTop: 2,
   flex:.5,
   flexDirection:'row',
   alignSelf:'center',
   alignItems:'center',
   justifyContent:'center',
 },

 textstype: {
   marginLeft: 2,
   color: '#ffffff',
 },
 });

var ButtonBuySell = React.createClass({
  /**
   * ### render
   *
   * Display the Button
   */
  render() {
    var mycolor = {backgroundColor: '#F87713',   borderColor:  '#F87713'};
    if(this.props.IsBuy == true)    {
        mycolor = {backgroundColor: '#01AC39',   borderColor:  '#01AC39'};
    }
    return (
      <TouchableHighlight style={[styles.button, mycolor]}

          onPress={this.props.onPress} >
        <View>
          <View style={styles.rowDetairow}>
            <View style={styles.rowDetailButtonleft}>
              <Text style={styles.textstype}>{this.props.sizeLabel}</Text>
            </View>
            <View style={styles.rowDetailButtonright}>
              <Text style={styles.textstype}>{this.props.priceLable}</Text>
            </View>
          </View>
          <View style={styles.rowDetairow}>
            <View style={styles.rowDetailButtonleft}>
              <Text style={styles.textstype}>{this.props.sizePrice}</Text>
            </View>
            <View style={styles.rowDetailButtonright}>
              <Text style={styles.textstype}>{this.props.iPrice}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = ButtonBuySell;
