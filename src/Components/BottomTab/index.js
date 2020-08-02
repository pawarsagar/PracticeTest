import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Assets } from '../../assets/Icons';
import AppNavKeys from '../../Common/AppNavKeys';
import styles from './styles';
import { COLORS } from '../../assets';
import { normalize } from '../../Common/FontSize';
export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props, '<------ props');
    const { navigation, state } = this.props;
    const { index } = state;

    return (
      <View style={styles.bottomTab}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppNavKeys.HomeFeed)}
          style={{ alignSelf: 'center' }}>
          <Image
            source={Assets.home}
            style={[styles.buttonSize, { tintColor: index == 0 ? COLORS.blue : 'black' }]}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => navigation.navigate(AppNavKeys.TestStrip)}>
          <Image
            source={Assets.TestStrip}
            style={{
              tintColor: index == 1 ? COLORS.blue : 'black',
              height: normalize(25),
              width: normalize(25),
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

      </View>
    );
  }
}
