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
    marginTop:2,
    marginBottom:2,
    borderRightWidth:1,
    // borderRightColor:'#b9c5c8',//#b9c5c8
    flex:.2

  },
  rowBorder1:{
    marginTop:2,
    marginBottom:2,
    borderRightWidth:1,
    // borderRightColor:'#b9c5c8',//#b9c5c8
    flex:.15

  },
  rowBorder4:{
    marginTop:2,
    marginBottom:2,
    borderRightWidth:1,
    // borderRightColor:'#b9c5c8',//#b9c5c8
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
  }
}
