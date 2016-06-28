import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

 module.exports = {
    bg: {
      position: 'absolute',
      left: windowSize.width*0.3,
      top: windowSize.height*0.3
    },
    container : {
      flex : 1,
      borderWidth : 1,
      borderColor: 'black',
      // flexDirection : 'row',
    },
    containerTable : {
      flex : 1,
      // flexDirection : 'row',
    },
    textRight : {
      textAlign : 'right' , 
      paddingRight : 10
    },
    row : {
      borderBottomWidth : 1,
      borderBottomColor : 'black',
      // flex : 1,
      height : 30,
      flexDirection : 'row',
      alignItems : 'center'
    },
    testBorder : {
      borderWidth : 1,
    },
    columnCode : {
      flex : 0.3,
    },
    columnVolume : {
      flex : 0.2,
    },
    columnMarket : {
      flex : 0.2,
    },
    columnValue : {
      flex : 0.3,
    },
    sum : {
      // flex : 1,
      height : 30,
      backgroundColor : 'blue',
      flexDirection : 'row',
      alignItems : 'center'
      // alignSelf : 'center'      
      // alignItems : 'center',  
      // alignSelf : 'flex-end'
    },
    textSum : {
      flex : 0.5,
      fontSize : 15,
      fontWeight : 'bold',
      color : '#ffffff',
    },

    viewTextContent : {
      borderLeftWidth : 1,
      borderLeftColor : 'black'
    },
    textContent : {
      paddingLeft : 5,
    },
    formHiddenContent : {
      backgroundColor : '#eeeded',
      padding : 2,
    },
    formHiddenCompany : {
      paddingLeft : 10 ,
      paddingRight : 10 ,
      paddingTop : 10 ,
      flex : 1,
    },
    formHiddenCompanyChild : {
      backgroundColor : '#e1e1e1',
      flexDirection : 'row',
       height : 25 ,
       alignItems : 'center'
    },
    formHiddenTable : {
      flexDirection : 'column',      
      padding : 10 ,
      flex : 1,
    },
    formHiddenTableContai1 : {
      flex : 1,height : 25 ,
      flexDirection : 'row'
    },
    formHiddenTableChild : {
      flex : 0.5 , 
      flexDirection : 'row'
    },
    formHiddenTableText1 : {
      paddingLeft : 10 , 
      flex : 0.5 
    },
    formHiddenTableContai2 : {
      flex : 1,
      backgroundColor : '#e1e1e1',
      height : 30,
      flexDirection : 'row' , 
      alignItems : 'center'
    },
    formHiddenTableText2 : {
      textAlign : 'right', 
      flex : 0.5, 
      paddingRight : 3
    },
    formHiddenList : {
      flex : 1,
      padding : 5,
    }
  };