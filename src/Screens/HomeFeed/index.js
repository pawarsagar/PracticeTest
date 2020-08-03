import React, { Component } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { CustomHeader, VideoPlayerComponent, Form } from '../../Components';
import { normalize } from '../../Common/FontSize';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getVideoAction } from '../../store/actions/HomeFeedActions';
import { GET_VIDEO_FETCH, FETCH_FAILED } from '../../Common/StoreActionTypes';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';
import Share from "react-native-share";

import { checkMultiple, PERMISSIONS } from 'react-native-permissions';
const options = {
    title: 'Select Avatar',

};






class HomeFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            imagePath: '',
            imageLoading: false,
            isFetching: false
        };
    }

    componentDidMount = () => {
        const onFocusListener = this.props.navigation.addListener('focus', () => {
            this.props.getVideoAction()
        });
    };


    handleShare = (data) => {
        Share.open({ url: data.video_url })
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }




    renderItem = (item) => {
        return <VideoPlayerComponent
            onPress={this.handleShare}
            data={item.item}
            key={item.index}
        />
    }

    onRefresh() {
        this.setState({
            isFetching: true
        }, () => {
            this.props.getVideoAction()
        })
    }

    onImagePicker = () => {
        let permission = Platform.OS == 'ios'
            ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
            : [PERMISSIONS.ANDROID.CAMERA]

        checkMultiple(permission).then(
            (statuses) => {
                console.log(statuses)
            },
        );

        this.setState({ imageLoading: true }, () => {
            ImagePicker.showImagePicker(options, (response) => {
                const source = { uri: response.uri };
                if (response.didCancel) {
                    this.setState({
                        imagePath: '',
                        imageLoading: false
                    });
                }
                else {
                    this.setState({
                        imagePath: source,
                        imageLoading: false
                    });
                }
            });
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)' }}>
                <View style={styles.headerStyle}>
                    <CustomHeader
                        onPress={this.onImagePicker}
                        imagePath={this.state.imagePath}
                        imageLoading={this.state.imageLoading}
                    />
                </View>
                <View style={{ margin: normalize(15) }}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: normalize(75) }}
                        data={this.state.videos}
                        renderItem={(item, index) => { return this.renderItem(item, index) }}
                        refreshing={this.state.isFetching}
                        onRefresh={() => { this.onRefresh() }}
                    />
                </View>
            </View>

        );
    }

    async componentWillReceiveProps(nextProps) {
        const { CommonReducer, HomeScreenFeed } = nextProps;
        if (nextProps.CommonReducer.isLoading || (this.props.CommonReducer.isLoading != nextProps.CommonReducer.isLoading)) {
            return
        }
        switch (CommonReducer.apiType) {
            case GET_VIDEO_FETCH: {
                if (HomeScreenFeed.videoList.length > 0) {
                    this.setState({ videos: HomeScreenFeed.videoList, isFetching: false })
                }
                break;
            }
            default:
                break;
        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getVideoAction: getVideoAction
        },
        dispatch
    );
}

function mapStateToProps(state) {
    return {
        CommonReducer: state.CommonReducer,
        HomeScreenFeed: state.HomeScreenFeed
    };
}

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(HomeFeed);
