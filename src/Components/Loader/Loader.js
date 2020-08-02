import React, { Component } from "react";
import { connect } from 'react-redux';
import { Alert, Platform } from 'react-native';
import Loading from "react-native-whc-loading";

import Navigator from "../../Common/Navigator";
import AppNavKeys from "../../Common/AppNavKeys";
import { Images } from "../../assets/Images";
import { COLORS } from "../../assets";
import { normalize } from "../../Common/FontSize";

class Loader extends Component {
    render() {
        const { isLoading } = this.props.CommonReducer;
        return (
            <Loading ref="loading"
                loading={isLoading}
                image={Images.loader}
                size={normalize(100)}
                imageSize={normalize(100)}
                backgroundColor={COLORS.white}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.CommonReducer.isLoading) {
            if (nextProps.CommonReducer.fetchFailed == true) {
                setTimeout(() => {
                    Alert.alert('', nextProps.CommonReducer.message, [
                        {
                            text: "ok",
                            // onPress: () => Navigator.navigate(AppNavKeys.Auth)
                        }
                    ])
                }, Platform.OS == 'ios' ? 1000 : 0)
            } else if (nextProps.CommonReducer.unauthorised == true) {
                setTimeout(() => {
                    Alert.alert('', nextProps.CommonReducer.message, [
                        {
                            text: "ok",
                            onPress: () => Navigator.navigate(AppNavKeys.Auth)
                        }
                    ])
                }, Platform.OS == 'ios' ? 1000 : 0)
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        CommonReducer: state.CommonReducer
    }
}


export default connect(mapStateToProps)(Loader)
