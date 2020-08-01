import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CustomText extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const { text = '', children = '' } = this.props
        return (
            <Text
                {...this.props}
            >{text}{children}</Text>

        );
    }
}
