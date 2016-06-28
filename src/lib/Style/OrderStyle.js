import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

module.exports = {
  container: {
    flexDirection: 'column',
    left: 0,
    top: windowSize.height*0.05,
    flex: 1
  },
  bg: {
      position: 'absolute',
      left: windowSize.width*0.3,
      top: windowSize.height*0.3
  },
  buttonIconTop: {
  width:20,
  height:20,
  marginRight: 10,
  overflow:'hidden',
  //borderWidth:1,
  borderRadius:4
},
  toolbar:{
        paddingTop:20,
        flexDirection:'row' ,   //Step 1
    },
    toolbarTitle:{
        textAlign:'left',
        fontWeight:'bold',
        flex:1                //Step 3
    },
  sectionHeader:{
    flexDirection:'row',
    flex:1,
    borderWidth:1,
    //borderColor:'#000000'
  },
  wrapperDetail:{
    flexDirection:'row',
    height:30,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    borderBottomWidth:1,
    //borderBottomColor:'#000000'
  },
  columnDetail:{
    flex:.2
  },
  columnDetail1:{
    flex:.15
  },
  columnDetail4:{
    flex:.3
  },
  listViewStyle:{
    height:windowSize.height*0.8
  },
  rowBorder:{
    flexDirection:'row',
    marginTop:2,
    marginBottom:2,
    flex:.2

  },
  rowBorder1:{
    flexDirection:'row',
    marginTop:2,
    marginBottom:2,
    flex:.15

  },
  rowBorder3:{
    flexDirection:'row',
    marginTop:2,
    marginBottom:2,
    flex:.3

  },
  sectionHeaderText:{
    textAlign:'center'
  },
  textRowDetail:{
    textAlign:'center'
  },
  wapperDetailImg:{
    flex:.3,
    flexDirection:'row',
    height:30,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1
  },
  textRowLeft:{
    flex:.2,
    height:30,
    paddingLeft:5,
    paddingTop:7,
    paddingBottom:5
  },
  textRowRight:{
    height:20,
    marginTop:5,
    marginBottom:5
  },
  wapperInfo:{
    flexDirection: 'column',
    flex: 1,
    borderWidth:1,
    borderColor:'#EDEDED',
    marginLeft:10,
    marginRight:10
  },
  rowInfo1:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    //borderWidth:1,
    backgroundColor:'#E0E0E0',
    height:30
  },
  rowInfo2:{
    flex: 1,
   flexDirection: 'row',
   alignItems:'center',
   justifyContent:'center',
    //borderWidth:1,
    backgroundColor:'#EDEDED',
    height:30
  },
  columnDetailLeft:{
    paddingLeft:2,
    flex: .3
  },
  columnDetailRight:{
    flex: .7,
    fontWeight:'bold'
  },
  columnDetailCenter2:{
    flex: .1
  },
  columnDetailLeft2:{
    paddingLeft:2,
    flex: .3
  },
  columnDetailRight2:{
    flex: .2,
    fontWeight:'bold'
  },
  buttonLeftStye:{
    marginTop:2,
    backgroundColor: '#0162C0',
    borderColor: '#0162C0',
    height:25
  },
  buttonRightStyle:{
    marginTop:2,
    backgroundColor: '#F87713',
    borderColor: '#F87713',
    height:25
  },
  buttonLeftViewStye:{
    marginTop:2,
    marginRight:5,
    marginBottom:1,
    flex: .15,
    marginLeft: 0.2*windowSize.width,
    height:30
  },
  buttonRightViewStyle:{
    marginTop:2,
    marginBottom:1,
    marginLeft:5,
    flex: .15,
    marginRight: 0.2*windowSize.width,
    height:30
  },
  fontButtonStyle:{
    color:'#FFF',
    fontSize: 12
  },
  rowListDetail:{
    flex: 1,
   flexDirection: 'row',
   alignItems:'center',
   justifyContent:'center',
   height:30
 },
   rowDetailDateTimeInfo:{
     flex: .5,
     paddingLeft:2
  },
  rowDetailFillInfo:{
    flex: .5
  },
  //////////

  rowDetairow: {
    padding:5,
    marginTop:5,
    flexDirection:'row',
    flex: 1

  },
  rowDetailTitleleft: {
    flexDirection:'column',
     flex:.3,
  },
  rowDetailTitleSecond: {
    flexDirection:'column',
     flex: .3,
  },
  rowDetailTitleThird: {
    flexDirection:'row',
     flex: .2,
  },
  rowDetailTitleRight: {
    flexDirection:'row',
     flex: .2,
     height:30,
  },
  rowFullSymbol: {
    marginLeft: 5,
  },
  detailScrollView: {

  },
  typeOrderRight:{
    width: 100,
       flex:1,
       alignItems: 'flex-start'
  },
  combotextStyle:{
    padding:2,
      margin: 0,
  },
  typeOrderLeft: {
      width: 80,
         flex:1,
         alignItems: 'flex-start'
    },
    textRowDetailLeft:{
      flexDirection:'row',
         flex:.7,
    },
    iconRowDetailRight:{
      flexDirection:'row',
         flex:.3,
           justifyContent: 'flex-end',
    },
  rowDetail1: {
      flexDirection:'row',
         flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          height:30
    },
  rowDetailFullRow: {
      flexDirection:'row',
         flex:1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor:'#999999',
          height:30,
          marginLeft:5,
          marginRight:5,
    },

  textBorder: {
      flexDirection:'row',
         flex:.2,
         marginRight:5,
         justifyContent: 'center',
         alignItems: 'center'
    },
};
