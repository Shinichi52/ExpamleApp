var I18n = require('react-native-i18n');
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;
var deviceLocale = I18n.locale;
console.warn("DEAFULT: "+deviceLocale);
// SET DEAFULT
//
// I18n.defaultLocale = "pt-BR";
// I18n.locale = "pt-BR";
// I18n.currentLocale();


I18n.translations = {
  en: {
    greeting: 'Hi!',
    username: 'Username',
    password: 'Password',
    register : 'Register',
    email:'Email',
    Code: 'Code',
    Side: 'Side',
    Size: 'Size',
    LimitPrice: 'LimitPrice',
    StopPrice: 'StopPrice',
    UpdateState: 'Update State',
    signin: 'SIGN IN',
    resetPassword: 'Reset Password',
    logout: 'LOG OUT',
    navigateToSubView: 'Navigate To SubView',
    sell: "Sell",
    buy:'Buy',
    markertOrder: 'Markert Order',
    limitOrder: 'Limit Order',
    stopOrder: 'Stop Order',
    stopLimitOrder: 'Stop Limit Order',
    GoodTillCancelled : 'Good till cancelled',
    modifyOrder: "MODIFY ORDER",
    cancelOrder: 'CANCEL ORDER',
    error_Username: 'Must have 6-12 characters and/or numbers',
    error_Email: 'Please enter valid email',
    updateProfile: 'Update Profile',
    emailVerified: 'Email verified (display only)',
    subview: "Subview",
    back:"Back",
    instruments: 'INSTRUMENTS',
    LimitType:'LIMITED',



    alert_messBetween : '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
    alert_least18 : 'You must be at least 18 years old',
    alert_isNotValid : '{TITLE} is not valid',
    alert_isRequired :'{TITLE} is required',
    alert_mustBeXCharacters :'{TITLE} must be {ARGS[0]} characters',
    alert_onlyNumber : '{TITLE} can contains only number characters',

    title_CustomerType : 'Customer Type',
    title_FullName : 'Full Name',
    title_DateOfBirth: 'Date of birth',
    title_Gender: 'Gender',
    title_Female : 'Female',
    title_Male : 'Male',
    title_IDCard : 'ID Card',
    title_TaxCode : 'Tax Code',
    title_PhoneNumber : 'Phone Number',
    title_Address : 'Address',
    title_UserInfo : 'UserInfo',
    title_DriverLicence : "Driver Licence",
    AddCode:'ADD CODE',
    SearchInputText:'Search code / company name',
    'BuyUpper':'BUY',
    'SellUpper':'SELL',
    NewOrderLimitAlert:'{0} {1} / {2} @ LMT {3}',
    NewOrderStopLimitAlert:'{0} {1} / {2} @ LMT {3} / STP {4}',
    NewOrderMarketAlert:'{0} {1} / MKT {2} @ MARKET',
    NewOrderStopAlert:'{0} {1} / {2} @ STP {3}',
    VolumeIsNotSet:'Volume is lessthan 0',
    VolumeLessThanNotSet:'Volume LessThan Fill Quantity',
    CreateNewOrderSuccess:'Create New Order Success',
    AddUpper:'ADD',
    ReduceUpper:'REDUCE',
    Volume : 'Volume',
    Market : 'Market',
    Values : 'Values',
    Sum : 'Sum',
    DoYouWantCancelOrder:'Do You Want Cancel Order?',
    ModifyOrderTextContent:'MODIFY {0} / {1} {2} @ {3}',
  }
}
