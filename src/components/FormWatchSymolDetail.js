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
  TouchableHighlight,
} = React;


/**
 * ## Styles
 */
var styles = StyleSheet.create({
signin: {
  backgroundColor: '#e0e0e0',
  flexDirection:'column',
  flex:1,
},
button: {
    marginTop: 2,
  },
rowDetairow: {
  flexDirection:'row',
  flex:1,
  justifyContent: 'center',
  alignItems: 'center'
},

rowDetailTitleleft: {
  marginTop: 2,
  flex:.5,
  height:30,
  flexDirection:'row',
  backgroundColor: '#999999',
  justifyContent: 'center',
  alignItems: 'center'
},
rowDetailTitleright: {
  marginLeft: 2,
  marginTop: 2,
  height:30,
  flex:.5,
  flexDirection:'row',
  backgroundColor: '#999999',
  justifyContent: 'center',
  alignItems: 'center'
},
rowDetailButtonleft: {
  marginTop: 2,
  height:30,
  flex:.5,
  flexDirection:'row',
  justifyContent: 'center',
  alignItems: 'center'

},
rowDetailButtonright: {
  marginLeft: 2,
  height:30,
  marginTop: 2,
  flex:.5,
  flexDirection:'row',
  justifyContent: 'center',
  alignItems: 'center'

},
rowDetailWrapMidder: {
  marginTop: 2,
  height:30,
  flex:1,
  flexDirection:'row',
  backgroundColor: '#999999',
  justifyContent: 'center',
  alignItems: 'center'
},
textstype: {
  marginLeft: 1,
  color: '#ffffff',
},
});

var FormWatchSymolDetail = React.createClass({
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
      <View style={styles.signin}>
      <View style={styles.rowDetairow}>
        <View style={styles.rowDetailTitleleft}>
          <Text style={styles.textstype}>{this.props.oLabel}: {this.props.oPrice}</Text>
        </View>
        <View style={styles.rowDetailTitleright}>
          <Text style={styles.textstype}>{this.props.hLabel}: {this.props.hPrice}</Text>
        </View>
      </View>
      <View style={styles.rowDetailWrapMidder}>
          <Text style={styles.textstype}>{this.props.vLabel}: {this.props.vPrice}</Text>
      </View>
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
      </View>
    );
  }
});

module.exports = FormWatchSymolDetail;
