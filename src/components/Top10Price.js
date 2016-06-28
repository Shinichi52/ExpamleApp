'use strict';

// import { Col, Row, Grid } from "react-native-easy-grid";

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
  TouchableHighlight
}
from 'react-native';


import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

class Top10PriceContent extends Component{
    render(){
        return (
            <Text>GAINERS</Text>
        )
    }
}

class Top10Price extends Component{
    render(){
        return (
            <ScrollableTabView>
                <View tabLabel="GAINERS" >
                    <Top10PriceContent/>
                </View>
                <View tabLabel="LOSERS" >
                    <Top10PriceContent/>
                </View>
            </ScrollableTabView>

        )
    }
}

module.exports = Top10Price;
