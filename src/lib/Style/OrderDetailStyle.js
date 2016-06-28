import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

module.exports = {
  container: {
    flexDirection: 'column',
    flex: 1
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  rightContainer: {
        flex: 1,
    },
    ToolbarContainer: {

           flexDirection:'column'
      },
    title: {
        fontSize: 20,
        marginBottom: 8,

    },
    titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    flex: 1,
  },
  buttonIconTop: {
    width:20,
    height:20,
    marginRight: 10,
    overflow:'hidden',
    //borderWidth:1,
    borderRadius:4
  },

  mainContainer:{
       flex:1                  //Step 1
   },
   content:{
       backgroundColor:'#ebeef0',
       flex:1                //Step 2
   },
  toolbar:{
        paddingTop:20,
        flexDirection:'row' ,   //Step 1

    },
    toolbarButton:{
      //  width: 30,            //Step 2
      //  textAlign:'right'
    },
    toolbarTitle:{
        textAlign:'left',
        fontWeight:'bold',
        flex:1                //Step 3
    },

rowTitle: {
  padding:5,
  flexDirection:'row',
  borderTopWidth: 1,
  borderBottomWidth:1,
  backgroundColor:'#FFFFFF'
},
rowDetairow: {
  flex:1,
  flexDirection:'row',
},

rowFullSymbol: {
  marginLeft: 5,
},
detailScrollView: {

},
typeOrderRight:{
  flex:.4,
  flexDirection:'column',
  marginTop:2

},
combotextStyle:{
  padding:2,
    margin: 0,
},
typeOrderLeft: {
       flex:.4,
       flexDirection:'row',
       alignSelf:'center',
       alignItems:'center',
  },
buttonSellOrder:{
    flex:1,
    marginTop:10,
    padding:5,
    borderRadius: 0,
    borderWidth:0,
    backgroundColor:'#F87713'
},
buttonBuyOrder:{
    flex:1,
    marginTop:10,
    padding:5,
    borderRadius: 0,
    borderWidth:0,
    backgroundColor:'#10AC39'
},
styleBotton:{
  position:'absolute',
  top: windowSize.height-60
},
borderWidthOrder:{
  height:30,
  borderBottomWidth:1
},
statusBottonLeft:{
  padding:5,
  alignItems:'center',
  backgroundColor:'#E0E0E0',
  width:windowSize.width/3 -2
},
statusBottonMidder:{
  marginLeft:10,
  marginRight:10,
  padding:5,
  alignItems:'center',
  backgroundColor:'#E0E0E0',
    width:windowSize.width/3 -2
},
statusBottonRight:{
  padding:5,
  alignItems:'center',
  backgroundColor:'#E0E0E0',
  width:windowSize.width/3 -2
},

modalButton: {
    marginTop: 10,
  },
innerContainer: {
     borderRadius: 4,
     backgroundColor: '#FFFFFF',
     position:'absolute',
     width:windowSize.width,
     top: windowSize.height - 285,
   },
buttonItermClose: {
       marginTop: 10,
     },
errorStyle:{
  height:30,
  alignSelf:'center',
  alignItems:'center',
  justifyContent:'center',
},
errorTextStyle:{
  color:'red'
},
};
