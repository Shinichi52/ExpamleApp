'use strict';
jest.autoMockOff();

var fieldValidation = require('../fieldValidation').default;
const InitialState = require('./../../reducers/auth/authInitialState').default;
const initialState = new InitialState;
let stateTempp=null;
stateTempp=initialState.mergeDeep(stateTempp)
describe('fieldValidation', () => {

  it('Test fieldValidation username error min length', () => {
    let temp={
      field:'username',
      value:'21'
    };
    let acti={
      payload:temp
    }
    let states=fieldValidation(stateTempp,acti);
      expect(states.form.isError).toEqual(true);
      expect(states.form.errorText).toEqual("Must have 6-12 characters and/or numbers");
  });

  it('Test fieldValidation username', () => {
    let temp={
      field:'username',
      value:'username'
    };
    let acti={
      payload:temp
    }
    let states=fieldValidation(stateTempp,acti);
      expect(states.form.isError).toEqual(false);
  });
  it('Test fieldValidation password', () => {
    let temp={
      field:'password',
      value:'username'
    };
    let acti={
      payload:temp
    }
    let states=fieldValidation(stateTempp,acti);
      expect(states.form.isError).toEqual(false);
  });
  it('Test fieldValidation password null', () => {
    let temp={
      field:'password',
      value:null
    };
    let acti={
      payload:temp
    }
    let states=fieldValidation(stateTempp,acti);
      expect(states.form.isError).toEqual(false);
  });

  it('Test fieldValidation default', () => {
    let temp={
      field:'password1',
      value:null
    };
    let acti={
      payload:temp
    }
    let states=fieldValidation(stateTempp,acti);
      expect(true).toEqual(true);
  });

});
