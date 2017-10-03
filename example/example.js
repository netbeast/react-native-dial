/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import { Dial } from './Dial';

export default class Example extends Component {
  render() {
    const borderRadius = Dimensions.get('window').width * 0.5
    return (
      <View style={{flex: 1, paddingTop: 50}}>
        <Dial
          responderStyle={[styles.responderStyle, { borderRadius }]}
          wrapperStyle={styles.wheelWrapper}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  responderStyle: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'rgba(0,0,0,.7)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  wheelWrapper: {
    borderRadius: 120,
    elevation: 5,
    padding: 0,
    shadowColor: 'rgba(0,0,0,.7)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    zIndex: 1,
  },
})