import React from 'react';
import {StyleSheet} from 'react-native';
import {normalize} from '../../Common/FontSize';
import {COLORS} from '../../assets';

export default (styles = StyleSheet.create({
  bottomTab: {
    borderTopWidth: normalize(1),
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    height: normalize(60),
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: normalize(20),
  },
  buttonSize: {
    height: normalize(40),
    width: normalize(40),
  },
}));
