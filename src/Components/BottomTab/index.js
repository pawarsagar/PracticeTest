import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Assets } from '../../assets/Icons';
import AppNavKeys from '../../Common/AppNavKeys';
import styles from './styles';
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
        {/* homescreen */}
        <TouchableOpacity
          onPress={() => navigation.navigate(AppNavKeys.Home)}
          style={{ alignSelf: 'center' }}>
          <Image
            source={index == 0 ? Assets.selectedHome : Assets.home}
            style={styles.buttonSize}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {/* basketscreen */}
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => navigation.navigate(AppNavKeys.Basket)}>
          <Image
            source={index == 1 ? Assets.selectedBasket : Assets.basket}
            style={styles.buttonSize}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {/* notificationScreen */}
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => navigation.navigate(AppNavKeys.Notification)}>
          <Image
            source={
              index == 2 ? Assets.selectedNotification : Assets.notification
            }
            style={styles.buttonSize}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {/* AccountScreen */}
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => navigation.navigate(AppNavKeys.Account)}>
          <Image
            source={index == 3 ? Assets.selectedAccount : Assets.account}
            style={styles.buttonSize}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
