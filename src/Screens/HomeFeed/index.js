import React, { Component } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { CustomHeader, VideoPlayerComponent, Form } from '../../Components';
import { normalize } from '../../Common/FontSize';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getVideoAction } from '../../store/actions/HomeFeedActions';
import { GET_VIDEO_FETCH } from '../../Common/StoreActionTypes';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';

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
            imageLoading: false
        };
    }

    componentDidMount = () => {
        this.props.getVideoAction()
    };


    renderItem = ({ item }) => {
        return <VideoPlayerComponent data={item} />
    }


    onImagePicker = () => {

        let permission = Platform.OS == 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY] : [PERMISSIONS.ANDROID.CAMERA]

        checkMultiple(permission).then(
            (statuses) => {
                console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
                console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
            },
        );


        this.setState({ imageLoading: true }, () => {


            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

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
                <Form>
                    <View style={{ margin: normalize(15) }}>
                        <FlatList
                            data={this.state.videos}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Form>
            </View>

        );
    }
    async componentWillReceiveProps(nextProps) {
        const { CommonReducer, HomeScreenFeed } = nextProps;
        switch (CommonReducer.apiType) {
            case GET_VIDEO_FETCH: {
                if (HomeScreenFeed.videoList.length > 0) {
                    this.setState({ videos: HomeScreenFeed.videoList })
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
