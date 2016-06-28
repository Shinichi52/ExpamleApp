/**
 * # Login.js
 *
 * This class is a little complicated as it handles 4 states. It's also
 * a container so there is boilerplate from Redux similiar to ```App```.
 */
'use strict';

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js';
import _ from 'underscore';

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  from: {
    email: true
  }
};

/**
* ## username validation rule
* read the message.. ;)
*/
const usernamePattern = /^[a-zA-Z0-9]{6,12}$/;
const usernameConstraints = {
  username: {
    format: {
      pattern: usernamePattern,
      flags: 'i',
      message: "UserName must have 6-12 numbers, letters or special characters"
    }
  }
};

/**
* ## password validation rule
* read the message... ;)
*/
const passwordPattern =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: "i",
      message: "have at least a number and a special character,"
          + " and between 6-12 in length"
    }
  }
};

const passwordAgainConstraints = {
  confirmPassword: {
    equality: "password"
  }
};

/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function fieldValidation(state, action ) {
  const {field, value} = action.payload;
  switch(field) {
    /**
     * ### username validation
     * set the form field error
     */
  case('username'):
    let validUsername  = true;
    let textError="Must have 6-12 characters and/or numbers";
    if(value.length>12||value.length<6){
      validUsername=false;
    }
    if (validUsername) {
      var statetemp= state.setIn(['form', 'isError'], false)
        .setIn(['form','errorText'],null);
        state=statetemp;
        return state;
    } else {
      var statetemp= state.setIn(['form', 'isError'], true)
        .setIn(['form','errorText'],textError);
        state=statetemp;
        return state;
    }
    break;



    /**
     * ### password validation
     * set the form field error
     */
  case('password'):
    let validPassword = _.isUndefined(validate({password: value},
                                               passwordConstraints));
    validPassword =  true;
    let statetemp=state;
    if (validPassword) {
      statetemp= state.setIn(['form', 'isError'], false);
    } else {
      statetemp= state.setIn(['form', 'isError'], true);
    }
    state=statetemp;
    break;
  }
  return state;

}
