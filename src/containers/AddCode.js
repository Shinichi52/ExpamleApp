/**
 * # Logout.js
 *
 *
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
const RequestType = require('./../lib/enum/RequestType');
var I18n = require('react-native-i18n');
import {
    clone,
    getJsonObject,
    getJsonMsg,
    isNullOrEmpty,
    findAll,
    cloneNewAddressMemory,
    firstOrDefault
}
from './../lib/base/FunctionUtils';
/**
 * The actions we need
 */
import * as AddCodeAction from '../reducers/AddCode/AddCodeActions';
import * as globalActions from '../reducers/global/globalActions';
/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header';
/**
 * The FormButton will change it's text between the 4 states as necessary
 */

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Dimensions from 'Dimensions';
let windowSize = Dimensions.get('window'); // Screen dimensions in current orientation
import {
    Actions
}
from 'react-native-router-flux';
let self =null;

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  ScrollView,
  Image,
  RecyclerViewBackedScrollView,
  View,
  Text,
  StatusBar,
  RefreshControl,
  ListView,
  TouchableHighlight,
  TextInput
}
from 'react-native';
const {
    RESPONSE_ADD_CODE,
    LOADING_ADD_CODE,
    RESPONSE_UPDATE_USERLAYOUT,
    BROADCAST_PRICE
} = require('../lib/constants').default;

/**
 * ## Styles
 */
import styles from '../lib/Style/AddCodeStyle';
const Global = require('./../lib/enum/Global');
/**
 * ## Redux boilerplate
 */
const actions = [
  AddCodeAction,
  globalActions
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



var FromRowDetail = React.createClass({
   renderIcon(isSelect){
     if (isSelect) {
       return(
         <Icon  name={'check'} size={20} />
       );
     }
     return(
       <Icon  name={'plus'} size={20} />
     );
   },

  render() {
    let datarow=this.props.datarow;
    let rowID=this.props.rowID;
    let classRef=this.props.classRef;
    let sectionID=this.props.sectionID;
    let highlightRow=this.props.highlightRow;
    return (
          <View style={styles.rowDetairow}>
              <View style={styles.textDetail}>
                <Text >{datarow.ContractName}</Text>
              </View>
              <TouchableHighlight onPress={() => {
                        classRef._pressRowDetail(rowID);
                      }}>
                <View style={styles.iconDetail}>
                  {this.renderIcon(datarow.IsSelected)}
                </View>
            </TouchableHighlight>

          </View>
    );
  }
});



class AddCode extends Component {

  constructor(props)
  {
    super(props);
    let listItem=[];
     this.state = {
          isBusy: false,
         dataSource: new ListView.DataSource({
             rowHasChanged: (row1, row2) => row1 !== row2
         }),
         listData: listItem,
         listDataNotFilter: listItem,
         itemSelect:0,
         TextSearch:'',
     };

  }

  componentWillReceiveProps(nextprops) {
    this.state.listDataNotFilter=nextprops.AddCode.form.fields.listData;
    this.onChange(this.state.TextSearch);
  }


  componentWillMount() {

    }

    _genRows(rowId:number,type:string): Array<string> {
      var listTemp = this.state.listData;
      if (listTemp==null) {
        listTemp=[];
      }
      let dataList=[];
      let dataString=getJsonMsg(listTemp);
      dataList=getJsonObject(dataString);

      if(dataList.length > 0) {
        let itemList=dataList[rowId];
          dataList[rowId].IsSelected = !dataList[rowId].IsSelected;
          let listNotFilter=this.state.listDataNotFilter;
          let itemSelect=firstOrDefault(listNotFilter,function (data) {
            return data.SymbolId===itemList.SymbolId;
          });

          if (itemSelect!=null) {
            const indexOf=listNotFilter.indexOf(itemSelect);
            listNotFilter[indexOf].IsSelected = !listNotFilter[indexOf].IsSelected;
            this.state.listDataNotFilter=listNotFilter;
          }
      }
      return dataList;
    }


  renderRow(datarow: any, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    let dataSourceDetail= new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
    });
      if(datarow.IsSelected){
      return (
        <View style={styles.rowDetailSelect}>
          <FromRowDetail datarow={datarow} classRef={this} rowID={rowID} sectionID={sectionID} highlightRow={highlightRow}/>

        </View>
      );
    }

    return (
      <FromRowDetail datarow={datarow} classRef={this} rowID={rowID}  sectionID={sectionID} highlightRow={highlightRow}/>
    );
  }


  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={{
            height: 1,
            backgroundColor: adjacentRowHighlighted ? 'black' : 'black',
          }}
        />
      );
    }

    _pressRowDetail(rowID: number) {
       this.state.itemSelect = rowID;
       let listData=this._genRows(rowID);
       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(listData),
         ErrorCode:'',
         listData:listData,
       });
     }

  renderSectionHeader(data, sectionId) {
      var text;
      return (
        <View style={styles.headerListView} >
        </View>
      );
    }

  componentDidMount() {
    let datain = [];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(datain),
      listData:datain,
    });
    this.props.actions.getListSymbolRequest();
  }

  renderLoadingState(){
    if (this.state.isBusy) {
      return (
         <Image style={styles.bg} source={require('./../images/loading.gif')} />
      );
    }else {
      return null;
    }
  }

  buttonSavePressHandler() {
    let userLayOut=Global.UserLayout;
    if (userLayOut==null) {
      userLayOut={};
      userLayOut.UserId=Global.LoggedInUserInfo.UserId;
      userLayOut.CurrentLayout=null;
    }
    let listSymbolId=[];
    for (let itemData of this.state.listDataNotFilter) {
      if (!itemData.IsSelected) continue;
      listSymbolId.push(itemData.SymbolId);
    }
    let current= getJsonObject(userLayOut.CurrentLayout);
    if (current==null) {
      current={};
    }
    current.ListSymbolId=listSymbolId;
    userLayOut.CurrentLayout=JSON.stringify(current);
    this.props.actions.updateUserLayoutRequest(userLayOut);
  }
  buttonBackPressHandler() {
      Actions.WatchList();
  }
  onChange(value) {
    let dataList=[];
    let dataString=getJsonMsg(this.state.listDataNotFilter);
    dataList=getJsonObject(dataString);

    let listDataFilter=[];

    if (isNullOrEmpty(value.TextSearch))
    {
        listDataFilter=dataList;
    }
    else {
        listDataFilter=findAll(dataList,function (data) {
          return data.ContractName.indexOf(value.TextSearch) > -1
        });
    }

    let itemClone=cloneNewAddressMemory(listDataFilter);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(itemClone),
      listData:itemClone,
    });
  }
  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    self = this;
    this.pageSize=4;
    this.initialListSize=4;
    this.enableEmptySections=true;
     return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
              <View style={styles.back}>
                <TouchableHighlight  onPress={this.buttonBackPressHandler.bind(this)}  style={[styles.buttonIconTop, styles.toolbarButton]}>
                  <Icon name='chevron-left' size={20} />
                </TouchableHighlight>
              </View>
              <View style={styles.textHeader}>
                <Text style={styles.toolbarTitle}> {I18n.t('AddCode')} </Text>
              </View>
              <View style={styles.save}>
                <TouchableHighlight  onPress={this.buttonSavePressHandler.bind(this)}  style={[styles.buttonIconTop, styles.toolbarButton]}>
                   <Icon name='check' size={20} />
                </TouchableHighlight>
              </View>

            </View>
            <View style={styles.toolbarSearch}>
              <TextInput
                  style={styles.searchInputText}
                  placeholder={I18n.t('SearchInputText')}
                  placeholderTextColor="black"
                  onChange={(event) => this.setState({TextSearch:event.nativeEvent.text})}
                  onChangeText={(text) => this.onChange(this.state)}
                  value={this.state.TextSearch}>
              </TextInput>
              <View style={styles.iconInputStyle}>
                <Icon iconStyle={{marginLeft:20}} name={'search'} size={15} />

              </View>
            </View>

            <ListView style={styles.listViewStyle}
              dataSource={this.state.dataSource}
              pageSize={this.pageSize}
              initialListSize={this.initialListSize}
              enableEmptySections={this.enableEmptySections}
              renderRow={this.renderRow.bind(this)}
              renderSectionHeader={this.renderSectionHeader}
              renderSeparator={this._renderSeperator}
            />

            {this.renderLoadingState()}
        </View>
      );

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCode);
