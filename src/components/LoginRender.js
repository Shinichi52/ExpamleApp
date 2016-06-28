/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
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
var I18n = require('react-native-i18n');
/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux';

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header';

/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../components/FormButton';
/**
 * The itemCheckbox will toggle the display of the password fields
 */
import ItemCheckbox from '../components/ItemCheckbox';

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableHighlight,
  View
}
from 'react-native';

import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation
/**
 * The states were interested in
 */
const {
  LOGIN
} = require('../lib/constants').default;

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .2,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 50,
        height: 50
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .25
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 20
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        marginLeft:0.2*windowSize.width,
        marginRight:0.2*windowSize.width,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 10,
        right: 0,
        height: 40,
        fontSize: 14,
        borderWidth:0,
        textAlignVertical:'top'
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF',
    },
    resendSmsPassword: {
      textDecorationLine:'underline',
      color: '#FFF'
    },
    errorLabel:{
      margin:10,
      justifyContent: 'center',
      alignItems: 'center'

    }
});
/**
 * ## Redux boilerplate
 */
const actions = [
  authActions,
  globalActions
];

function mapStateToProps(state) {
  return {
  };
}

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

class LoginRender extends Component {
  constructor(props) {
    super(props);


    this.isError = this.props.auth.form.isError;
    this.isBusy = this.props.auth.form.isBusy;
    this.isDisable = this.props.auth.form.isDisable;
    this.errorText = this.props.auth.form.errorText;
    this.isFisrtLoginSuccess=this.props.auth.form.isFisrtLoginSuccess;
    this.state ={
        username: this.props.auth.form.fields.username,
        password: this.props.auth.form.fields.password,
        smsPassword: this.props.auth.form.fields.smsPassword
    };
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    this.isError = nextprops.auth.form.isError;
    this.isDisable = nextprops.auth.form.isDisable;
    this.isBusy = nextprops.auth.form.isBusy;
    this.errorText = nextprops.auth.form.errorText;
    this.isFisrtLoginSuccess=nextprops.auth.form.isFisrtLoginSuccess;
    this.setState({
      	username: nextprops.auth.form.fields.username,
      	password: nextprops.auth.form.fields.password,
      	smsPassword: nextprops.auth.form.fields.smsPassword
    });
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange(value) {
    // let iii=this.props.auth.form;
    // console.warn(value.toString());
      this.props.actions.onAuthFormFieldChange('username',value.username);

      this.props.actions.onAuthFormFieldChange('password',value.password);
      this.props.actions.onAuthFormFieldChange('smsPassword',value.smsPassword);
    this.setState(
      {value}
    );
  }

  processResend(calbackResend){
    Alert.alert(
      'Alert',
      'Do You Want Changed SMS Password?',
      [
        {text: 'Cancel', onPress: () => console.warn('Cancel'), style: 'cancel'},
        {text: 'OK', onPress: calbackResend},
      ]
    )
  }


  rederErrorValue(){
    if (this.isError) {
      return (
        <View style={styles.errorLabel}>
          <Text style={{color:'#fa0606'}}>{this.errorText}</Text>

        </View>
      );
    }else {
      return (
        <View style={styles.errorLabel}>
          <Text style={{color:'#fa0606'}}></Text>

        </View>
      );
    }
  }

  renderSendSmsPass(onButtonResendSmsPress){
    if (this.isFisrtLoginSuccess) {
      return (
      <View style={styles.signup}>
        <TouchableHighlight
              onPress={() => {
                   this.processResend(onButtonResendSmsPress);
                }} >
              <Text  style={styles.resendSmsPassword}>Resend SMS Password</Text>
         </TouchableHighlight>
      </View>
      );
    }else {
      return (
      <View style={styles.signup}>
              <Text  style={styles.resendSmsPassword}></Text>
      </View>
      );
    }
  }
  renderLoadingState(){
    if (this.isBusy) {
      return (
         <Image style={styles.mark} source={require('./../images/loading.gif')}/>
      );
    }else {
      return null;
    }
  }
  rederFisrtLoginSuccess(){
    if (this.isFisrtLoginSuccess) {
      return (
        <View style={styles.inputContainer}>
            <Image style={styles.inputPassword} source={require('./../images/password.png')}/>
            <TextInput
                password={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="SMS Password"
                placeholderTextColor="#FFF"
                onChange={(event) => this.setState({smsPassword:event.nativeEvent.text})}
                onChangeText={(text) => this.onChange(this.state)}
                value={this.state.smsPassword}
            />
        </View>
      );
    }else {
      return null;
    }
  }


  /**
  *  Get the appropriate message for the current action
  *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
  *  @param actions the action for the message type
  */

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    var formType = this.props.formType;
    let onButtonPress=this.props.onButtonPress;
    let onButtonResendSmsPress=this.props.onButtonResendSmsPress;
    let self = this;


    /**
     * The LoginForm is now defined with the required fields.  Just
     * surround it with the Header and the navigation messages
     * Note how the button too is disabled if we're fetching. The
     * header props are mostly for support of Hot reloading.
     * See the docs for Header for more info.
     */

    return(
      <View style={styles.container}>
           <Image style={styles.bg} source={require('./../images/background-1.jpg')} />
           <View style={styles.header}>
              {this.renderLoadingState()}
           </View>
           <View style={styles.inputs}>
               <View style={styles.inputContainer}>
                   <Image style={styles.inputUsername} source={require('./../images/username.png')}/>
                   <TextInput
                       style={[styles.input, styles.whiteFont]}
                       placeholder={I18n.t('username')}
                       placeholderTextColor="#FFF"
                       editable={!this.isFisrtLoginSuccess}
                       onChange={(event) => this.setState({username:event.nativeEvent.text})}
                       onChangeText={(text) => this.onChange(this.state)}
                        value={this.state.username}
                   />
               </View>
               <View style={styles.inputContainer}>
                   <Image style={styles.inputPassword} source={require('./../images/password.png')}/>
                   <TextInput
                       password={true}
                       style={[styles.input, styles.whiteFont]}
                       placeholder={I18n.t('password')}
                       editable={!this.isFisrtLoginSuccess}
                       placeholderTextColor="#FFF"
                       onChange={(event) => this.setState({password:event.nativeEvent.text})}
                       onChangeText={(text) => this.onChange(this.state)}
                       value={this.state.password}
                   />
               </View>
               {this.rederFisrtLoginSuccess()}
               {this.rederErrorValue()}
           </View>

           <FormButton
                  onPress={onButtonPress}
                  isLoading={this.isBusy}
                  buttonText={I18n.t('signin')}/>

                  {this.renderSendSmsPass(onButtonResendSmsPress)}

       </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginRender);
