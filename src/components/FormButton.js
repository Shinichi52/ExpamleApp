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
  View
} = React;

/**
 * The platform neutral button
 */
const  Button = require('apsl-react-native-button');
import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  signin: {
    marginLeft: 0.2*windowSize.width,
    marginRight: 0.2*windowSize.width
  },
  button: {
    backgroundColor: '#051efb',
    borderColor: '#051efb'
  },
  fontButtonStyle:{color:'#FFF'}

});




var FormButton = React.createClass({
  /**
   * ### render
   *
   * Display the Button
   */
   componentWillMount: function() {
     this.buttonViewStyle=styles.signin;
     this.buttonStyle=styles.button;
     this.fontButtonStyle=styles.fontButtonStyle;

     if (this.props.buttonViewStyle) {
       this.buttonViewStyle=this.props.buttonViewStyle;
     }
     if (this.props.fontButtonStyle) {
       this.fontButtonStyle=this.props.fontButtonStyle;
     }
     if (this.props.buttonStyle) {
       this.buttonStyle=this.props.buttonStyle;
     }
  },


  render() {
    return (
      <View style={this.buttonViewStyle}>
        <Button style={this.buttonStyle}
            onPress={this.props.onPress}
          textStyle={{color:'#FFF'}}
        >
          {this.props.buttonText}
        </Button>
      </View>
    );
  }
});

module.exports = FormButton;
