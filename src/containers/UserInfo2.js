
const Global = require('./../lib/enum/Global');
var I18n = require('react-native-i18n');



import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


/**
 * The actions we need
 */
import * as userInfoAction from '../reducers/UserInfo/userInfoAction';
import * as globalActions from '../reducers/global/globalActions';
import {convertFormatToNumber,toString} from '../lib/base/FunctionUtils';
import {convertToDate,getDateString,getDateOnly,convertToDatetime} from '../lib/base/DateTime';

import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The Header will display a Image and support Hot Loading
 */
// import Header from '../components/Header';
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
// import FormButton from '../components/FormButton';
// import Dimensions from 'Dimensions';


 let that=null;


// let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The necessary React components
 */
import React,
{
  ScrollView,
  Component,
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  DatePickerAndroid
}
from 'react-native';


import {
    Actions
}
from 'react-native-router-flux';


const actions = [
  userInfoAction,
  globalActions,
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


'use strict';

import ExNavigator from '@exponent/react-native-navigator';
var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');


class UserInfo extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        // genderValue : Global.LoggedInUserInfo.Gender,
        isEdit: false,
        isPickedDOB : false,
        isPickedGender : false,
        birthDay : Global.LoggedInUserInfo.Birthday,
        gender : Global.LoggedInUserInfo.Gender
      }
  }

  changeGender(values){
    if(values.gender === 'undefined' || !Array.isArray(values.gender)){

    }
    else{
      that.setState({
              gender : values.gender[0],
              isPickedGender : false
            });
            that.forceUpdate();
    }
  }

  async addDateTimeAndroid(){
    try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              date: new Date(that.state.birthDay)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              var date = new Date(year, month, day);
              that.setState({birthDay : date});
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
  }

  _renderPopUp(){
    if(that.state.isPickedDOB)

       if(Platform.OS === 'ios'){
          return(
                <View style = {styles.modal}>
                    <View style = {{ backgroundColor: 'rgba(0,0,0,.5)', flex :1}}>
                      <TouchableOpacity style = {{flex : 1}} onPress = {() => {this.setState({isPickedDOB : false ,birthDay : Global.LoggedInUserInfo.Birthday})}}>
                      </TouchableOpacity>
                    </View>
                    <View>
                          <TouchableOpacity onPress = {() => {this.setState({isPickedDOB : false})}} style = {{height : 20}}>
                              <View style = {{borderWidth : 1 , borderColor : 'black'}}>
                                <Text style = {{fontSize : 17}}>Done</Text>
                              </View>
                          </TouchableOpacity>
                          <GiftedForm style = {{flex : 0}} onValueChange={(values) => {this.setState({birthDay : values.birthday}) ; console.warn(values.birthday)}}>
                            <GiftedForm.DatePickerIOSWidget
                                    name='birthday'
                                    mode='date'
                                    style = {{backgroundColor : '#ffffff',paddingBottom : 50}}
                                    getDefaultDate={() => {
                                      return new Date(this.state.birthDay);
                                    }}
                            ></GiftedForm.DatePickerIOSWidget>
                          </GiftedForm>
                    </View>
                </View>
          )
       }
       if(Platform.OS === 'android'){
          this.addDateTimeAndroid();
       }
    //  this.setState({gender : values,isPickedGender : false})
    if(that.state.isPickedGender)
      return(
        <View style = {styles.modal}>
          <View style = {{ backgroundColor: 'rgba(0,0,0,.5)', flex :1}}>
            <TouchableOpacity style = {{flex : 1}} onPress = {() => {this.setState({isPickedGender : false})}}>
            </TouchableOpacity>
          </View>
          <View>
                <GiftedForm style = {{flex : 0,paddingBottom : 50}} onValueChange = {(values) => this.changeGender(values)}>
                <GiftedForm.SelectWidget name='gender' title= {I18n.t('title_Gender')} multiple={false}
                      style = {{backgroundColor : '#ffffff'}}

                >
                  <GiftedForm.OptionWidget  title= {I18n.t('title_Female')} value='Female'/>
                  <GiftedForm.OptionWidget title= {I18n.t('title_Male')} value='Male'/>
                </GiftedForm.SelectWidget>
              </GiftedForm>
          </View>
        </View>
      )

    return;
  }

  render() {
    that = this;
    return (
      <View style = {{flex : 1}}>
      <ExNavigator
        initialRoute={this.getRoute()}
        style={{flex : 1 }}
        sceneStyle={{ paddingTop: 64 }}
      />
      {this._renderPopUp()}
      </View>
    );
  }

  _renderButton(){
        if(that.state.isEdit)
          return (

            <GiftedForm.SubmitWidget
              title='Save'
              widgetStyles={{
                submitButton: {

                }
              }}
              onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                if (isValid === true)
                  that.setState({
                    isEdit:!that.state.isEdit,
                  });
                  that.requestUpdateUserInfo(values);
                }
              }

            ></GiftedForm.SubmitWidget>

          );
          else return;
  }

  requestUpdateUserInfo(values){
    var curUserInfo = Object.assign({}, Global.LoggedInUserInfo);
    curUserInfo.FullName = values.fullName;
    curUserInfo.Birthday = convertToDate(convertToDatetime(that.state.birthDay));
    curUserInfo.Gender = that.state.gender;
    curUserInfo.IdNoTypeId = convertFormatToNumber(values.driverLicence);
    curUserInfo.Mobile = values.phoneNumber;
    curUserInfo.Email = values.email1;
    curUserInfo.Address = values.address;
    that.props.actions.UpdateUserInfoRequest(curUserInfo);
  }


  getRoute() {
    return {
      renderScene(navigator) {
        that.state = {
          isEdit : that.state.isEdit,
          Gender : Global.LoggedInUserInfo.Gender == 'Male' ? true : false,
          isPickedDOB : that.state.isPickedDOB,
          isPickedGender : that.state.isPickedGender,
          birthDay : that.state.birthDay,
          gender : that.state.gender,
        }

        return (
          <ScrollView>
          <GiftedForm
            formName='signupForm' // GiftedForm instances that use the same name will also share the same states

            openModal={(route) => {
              if(that.state.isEdit){
                if(route.getTitle() === 'Date of birth'){
                  that.setState({
                    isPickedDOB : true,
                  })
                }
                if(route.getTitle() === 'Gender'){
                  that.setState({
                    isPickedGender : true
                  })
                }
              }
            }}

            clearOnClose={false} // delete the values of the form when unmounted

            defaults={{
                fullName : Global.LoggedInUserInfo.FullName,
                birthday : getDateString(getDateOnly(Global.LoggedInUserInfo.Birthday)),
                'gender{Male}': that.state.Gender,
                'gender{Female}': !that.state.Gender,
                driverLicence : toString(Global.LoggedInUserInfo.IdNoTypeId),
                phoneNumber : Global.LoggedInUserInfo.Mobile,
                email1 : Global.LoggedInUserInfo.Email,
                email2 : Global.LoggedInUserInfo.Email,
                address : Global.LoggedInUserInfo.Address,
            }}

            validators={{
              fullName: {
                title: I18n.t('title_FullName'),
                validate: [{
                  validator: 'isLength',
                  arguments: [3, 50],
                  message: I18n.t('alert_messBetween')
                }]
              },
              driverLicence: {
                title: I18n.t('title_DriverLicence'),
                validate: [{
                  validator: 'isLength',
                  arguments: [5,15],
                  message: I18n.t('alert_messBetween'),
                },{
                    validator: 'matches',
                    arguments: /^[0-9]*$/,
                    message: I18n.t('alert_onlyNumber'),
                }]
              },

              phoneNumber: {
                title: I18n.t('title_PhoneNumber'),
                validate: [{
                  validator: 'isLength',
                  arguments: [5,15],
                  message: I18n.t('alert_messBetween'),
                },{
                    validator: 'matches',
                    arguments: /^[0-9]*$/,
                    message: I18n.t('alert_onlyNumber'),
                }]
              },

              email1: {
                title: 'Email 1',
                validate: [{
                  validator: 'isLength',
                  arguments: [6, 255],
                },{
                  validator : 'isEmail'
                }]
              },

              email2: {
                title: 'Email 2',
                validate: [{
                  validator: 'isLength',
                  arguments: [6, 255],
                },{
                  validator : 'isEmail'
                }]
              },

              address: {
                title: I18n.t('title_Address'),
                validate: [{
                  validator: 'isLength',
                  arguments: [6, 255],
                  message : I18n.t('alert_messBetween'),
                }]
              },
            }}
          >


            <GiftedForm.SeparatorWidget />
            <GiftedForm.TextInputWidget
              name='fullName'
              title= {I18n.t('title_FullName')}
              placeholder= {I18n.t('title_FullName')}
              clearButtonMode='while-editing'
              editable = {that.state.isEdit}
              image={require('../images/id-card.png')}
              validationImage = {false}
            />

            <GiftedForm.SeparatorWidget />
            <GiftedForm.ModalWidget
              title= {I18n.t('title_DateOfBirth')}
              displayValue='birthday'
              image={require('../images/birthday-cake.png')}
              validationImage = {false}
              value = {getDateString(that.state.birthDay)}
            >
            </GiftedForm.ModalWidget>


            <GiftedForm.ModalWidget
              title= {I18n.t('title_Gender')}
              displayValue='gender'
              image={require('../images/gender-symbols.png')}
              validationImage = {false}
              value = {that.state.gender}
            >
            </GiftedForm.ModalWidget>
            <GiftedForm.SeparatorWidget />

            <GiftedForm.TextInputWidget
              name='driverLicence' // mandatory
              title= {I18n.t('title_DriverLicence')}
              placeholder= {I18n.t('title_DriverLicence')}
              clearButtonMode='while-editing'
              image={require('../images/copy.png')}
              validationImage = {false}
              editable = {that.state.isEdit}
            />

            <GiftedForm.TextInputWidget
              name='phoneNumber' // mandatory
              title= {I18n.t('title_PhoneNumber')}
              image={require('../images/phone-call.png')}
              validationImage = {false}
              placeholder= {I18n.t('title_PhoneNumber')}
              clearButtonMode='while-editing'

              editable = {that.state.isEdit}
            />

            <GiftedForm.TextInputWidget
              name='email1' // mandatory
              title='Email 1'
              placeholder='example@nomads.ly'
              image={require('../images/envelope.png')}
              validationImage = {false}
              keyboardType='email-address'
              clearButtonMode='while-editing'
              editable = {that.state.isEdit}

            />



            <GiftedForm.TextInputWidget
              name='email2' // mandatory
              title='Email 2'
              placeholder='example@nomads.ly'
              image={require('../images/envelope.png')}
              validationImage = {false}
              keyboardType='email-address'
              clearButtonMode='while-editing'
              editable = {that.state.isEdit}

            />

            <GiftedForm.TextInputWidget
              name='address' // mandatory
              title= {I18n.t('title_Address')}
              image={require('../images/location-pin-on-map.png')}
              validationImage = {false}
              placeholder= {I18n.t('title_Address')}
              clearButtonMode='while-editing'
              editable = {that.state.isEdit}
            />
            {that._renderButton()}
          </GiftedForm>
          </ScrollView>
        );
      },


      getTitle(){
          return I18n.t('title_UserInfo');
      },
      renderButton1(){
        if(that.state.isEdit){
            return null;
        }
        else
        {
          return(
              <TouchableOpacity
                onPress={() => {
                  that.setState({
                    isEdit:!that.state.isEdit,
                  });
                }}
              >
                 <Image
                  style={{
                    width: 21,
                    marginRight:20,
                  }}
                  resizeMode={Image.resizeMode.contain}
                  source={require('../images/Pencil-52.png')}
                />

              </TouchableOpacity>

            );
        }
      },
      renderRightButton(navigator) {

          return(
             <View>
              {this.renderButton1()}
            </View>

            );
      },
    }
  }
}


var styles = StyleSheet.create({

  modal: {
    flex : 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent : 'flex-end'
  }
});

// module.exports = Example;
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
