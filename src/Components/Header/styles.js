import React from "react";
import { StyleSheet } from "react-native";
import { normalize } from "../../Common/FontSize";
import { Regular, SemiBold } from "../../assets/Fonts";
import { COLORS } from "../../assets";


export default (styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(15),
        flexDirection: 'row',
    },
    dayText: {
        fontFamily: Regular,
        fontSize: normalize(12),
        fontWeight: '500',
        color: COLORS.grey,
    },
    headerTitleText: { fontFamily: SemiBold, fontSize: normalize(30) },
    imageContainer: { alignItems: 'flex-end', width: '40%', justifyContent: 'flex-end', },
    imageParent: {
        height: normalize(35),
        width: normalize(35),

        borderRadius: normalize(22.5),
        overflow: 'hidden',
    },
    image: { height: normalize(35), width: normalize(35), }

}))