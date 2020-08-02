import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { normalize } from '../../Common/FontSize';
import { CustomText } from '..';
import { Regular, SemiBold } from '../../assets/Fonts';
import { Images } from '../../assets/Images';
import { COLORS } from '../../assets';
import styles from './styles';

export default class CustomHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { onPress = () => { }, imagePath = '', imageLoading = false } = this.props
        return (
            <View style={styles.container}>
                <View style={{ width: '60%', justifyContent: 'flex-end', }}>
                    <View style={{ marginBottom: normalize(8) }}>
                        <CustomText
                            style={styles.dayText}
                            text='TODAY'
                        />
                    </View>
                    <View style={{ marginBottom: normalize(10) }}>
                        <CustomText
                            style={styles.headerTitleText}
                            text='My Feed'
                        />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <View style={{ marginVertical: normalize(10), }}>
                        <TouchableOpacity
                            onPress={onPress}
                            style={styles.imageParent}>

                            <ImageBackground
                                source={imagePath == '' ? Images.userGirl : imagePath}
                                style={styles.image}
                                resizeMode='stretch'
                            >
                                {imageLoading && <ActivityIndicator animating={true} size="large" color='red' />}
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
