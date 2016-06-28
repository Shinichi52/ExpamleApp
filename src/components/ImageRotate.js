
var tweenState = require('react-tween-state');
import Icon from 'react-native-vector-icons/FontAwesome';

import React,
{
  Component,
  StyleSheet,
  View,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  ScrollView
}
from 'react-native';
class ImageRotate extends Component{
    render() {
        return (
            <Icon name = 'arrow-right' size = {10}  style = {this.props.style}/>
        )
    }
    start(st) {
        console.warn('start ' + st);
    }
};

module.exports = ImageRotate;
