import React, { Component } from 'react';
import { View, Pressable, Image } from 'react-native';
import { normalize } from '../../Common/FontSize';
import { COLORS } from '../../assets';
import { Regular, SemiBold } from '../../assets/Fonts';
import { CustomText } from '..';
import Video from 'react-native-video';
import { Assets } from '../../assets/Icons';


export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            onBuffer: false,
            onError: false
        };
    }

    render() {
        const { data, onPress = () => { } } = this.props
        return (
            <View>
                <Pressable
                    onLongPress={() => { onPress(data) }}
                    onPress={() => { this.setState({ paused: !this.state.paused }) }}
                    style={{
                        height: normalize(150),
                        width: '100%',
                        backgroundColor: 'black',
                        borderRadius: normalize(12),
                        overflow: 'hidden',
                        borderWidth: 0.5,
                    }}
                >
                    <View style={{
                        height: normalize(150),
                        width: '100%',
                    }}>
                        <Video
                            source={{ uri: data.video_url }}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            onBuffer={() => { this.setState({ onError: false, onBuffer: true }) }}
                            onError={(err) => { this.setState({ onError: true }) }}
                            paused={this.state.paused}
                            resizeMode={"cover"}
                            controls={false}
                            repeat={true}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                aspectRatio: 1,
                                width: "100%",
                            }} >

                        </Video>
                    </View>
                    <View style={{ bottom: normalize(75), alignItems: 'center', }}>
                        {this.state.paused && < Image
                            source={Assets.playImage}
                            style={{ height: normalize(35), width: normalize(35) }}
                        />}
                        {this.state.onError && <CustomText
                            text='Video is Unavailable Please try again later.'
                            style={{
                                color: 'black',
                                fontFamily: SemiBold

                            }} />}
                    </View>
                </Pressable>

                <View
                    style={{
                        zIndex: this.state.paused ? 1 : -1,
                        height: normalize(75),
                        width: '98%',
                        alignSelf: 'center',
                        backgroundColor: COLORS.white,
                        borderRadius: normalize(12),
                        bottom: normalize(25),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        shadowOpacity: 0.43,
                        shadowRadius: 9.51,
                        borderWidth: 0.5,
                        elevation: this.state.paused ? 15 : -1,
                    }}
                >
                    <View style={{ margin: normalize(10) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <CustomText
                                text='New'
                                style={{
                                    fontFamily: Regular,
                                    color: COLORS.blue,
                                    fontSize: normalize(10)
                                }}
                            />
                            <CustomText
                                text='1 hr ago'
                                style={{
                                    fontFamily: Regular,
                                    color: COLORS.gunMetalGrey,
                                    fontSize: normalize(10)
                                }}
                            />
                        </View>
                        <View style={{ marginVertical: normalize(5) }}>
                            <CustomText
                                text={data.title}
                                style={{
                                    fontFamily: SemiBold,
                                    color: 'black',
                                    fontSize: normalize(17.3)
                                }}
                            />
                        </View>
                        <View>
                            <CustomText
                                text={data.title}
                                style={{ fontFamily: Regular, color: COLORS.gunMetalGrey, fontSize: normalize(10) }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
