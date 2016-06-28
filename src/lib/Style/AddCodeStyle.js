import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation

module.exports = {
  container: {
    flexDirection: 'column',
    left: 0,
    flex: 1
  },
  bg: {
      position: 'absolute',
      left: windowSize.width*0.3,
      top: windowSize.height*0.3
  },
  toolbar:{
        flexDirection:'row' ,   //Step 1
        height:60,
        alignItems:'center',
    },
  back:{
        flexDirection:'row' ,   //Step 1
        flex:.1,
        alignItems:'center',
        justifyContent:'center',
    },
  save:{
        flexDirection:'row' ,   //Step 1
        flex:.1,
        alignItems:'center',
        justifyContent:'center',
    },
  textHeader:{
        flexDirection:'row' ,   //Step 1
        flex:.8,
        alignItems:'center',
        justifyContent:'center',
    },
  toolbarSearch:{
        flexDirection:'row' ,   //Step 1
        height:45,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'black'
    },
    toolbarTitle:{
        textAlign:'left',
        fontWeight:'bold',
    },
    listViewStyle:{
      marginTop:10,
      marginRight:0.1*windowSize.width,
      marginLeft:0.05*windowSize.width,
    },
    rowDetairow:{
      flex:1,
      flexDirection: 'row',
      borderLeftWidth:1,
      borderRightWidth:1,
      borderColor:'black',
    },
    textDetail:{
      flex:.7,
      flexDirection: 'row',

    },
    headerListView:{
      borderBottomWidth:1,
      borderColor:'black',
    },
    iconInputStyle:{
      position: 'absolute',
      left:0.05*windowSize.width+5,
      top:10
    },
    iconDetail:{
      flex:.3,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      width:0.1*windowSize.width,
    },
    searchInputText:{
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:20,
      paddingRight:5,
      height:30,
      position: 'absolute',
      borderWidth: 1,
      borderColor: 'black',
      width:windowSize.width-0.15*windowSize.width,
      marginRight:0.1*windowSize.width,
      marginLeft:0.05*windowSize.width,
      borderRadius:10,
      marginTop:5,
      marginBottom:5
    },
    rowDetail:{
      flex:1,
      flexDirection: 'row',
      borderBottomWidth:1,
      borderColor:'black',
      height:30,
    },
    iconLeftDetail:{
      flex:.1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
    },
    textDetail:{
      flex:.8,
      flexDirection: 'row',
      alignItems:'center',
      //justifyContent:'center',
    },
    iconRightDetail:{
      flex:.1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
    },
};
