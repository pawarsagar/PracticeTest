import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { Assets } from '../../assets/Icons';
import AppNavKeys from '../../Common/AppNavKeys';
import styles from './styles';
import { COLORS } from '../../assets';
import { normalize } from '../../Common/FontSize';
import CustomText from '../CustomText';
import Navigator from '../../Common/Navigator';
import { removeItem } from '../../Common/AsyncConfig'
export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAuth = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            removeItem('LoginDetails')
            Navigator.navigate(AppNavKeys.Login)
          }
        }
      ],
      { cancelable: false }
    );
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
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleAuth}
        >
          <CustomText text='Logout' style={styles.loginText} />
        </TouchableOpacity>

      </View>
    );
  }
}
