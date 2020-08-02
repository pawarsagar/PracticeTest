import React from "react";
import { StyleSheet } from "react-native";
import { normalize } from "../../Common/FontSize";


export default styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'rgb(242,242,242)', height: normalize(100),
        width: '100%',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(220,220,220)'
    }

})