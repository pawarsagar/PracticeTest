import React from 'react';
import { StyleSheet } from 'react-native';
import { normalize } from '../../Common/FontSize';
import { COLORS } from '../../assets';
import { SemiBold } from '../../assets/Fonts';

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
  button: {
    height: normalize(35),
    width: normalize(80),
    backgroundColor: COLORS.green,
    alignSelf: 'center',
    borderRadius: normalize(12),
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: SemiBold,
    fontSize: normalize(16),
    textAlign: 'center',
    color: COLORS.white
  }
}));
