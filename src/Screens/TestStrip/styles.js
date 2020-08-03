import React from "react";
import { StyleSheet } from "react-native";
import { normalize } from "../../Common/FontSize";
import COLORS from "../../assets/Colors";
import { Regular, SemiBold } from "../../assets/Fonts"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,


    },
    headerParent: {
        marginVertical: normalize(25),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nextButton: {
        width: '30%',
        height: normalize(30),
        backgroundColor: COLORS.gunMetalGrey,
        borderRadius: normalize(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleText: {
        fontFamily: SemiBold,
        fontSize: normalize(30),
        color: COLORS.darkBlue
    },
    nextButtonText: {
        fontFamily: Regular,
        fontSize: normalize(13.3),
        color: COLORS.white
    },
    box: {
        height: normalize(100),
        width: '100%',
        flexDirection: 'row',

    },
    selectedColorParent: {
        flex: 0.05,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: '#47535B',
        justifyContent: 'flex-end',
    },
    selectedColor: {
        width: '100%',
        height: normalize(20),
        backgroundColor: "red",
        marginBottom: normalize(25)
    },
    optionsParent: {
        flex: 0.95,
        paddingLeft: normalize(10)
    },


    infoContainer: {
        height: normalize(50),
        width: '100%',
        marginBottom: normalize(5),
        flexDirection: 'row',
    },
    infoTextParent: {
        width: '60%',
        flexDirection: 'row',
        marginTop: normalize(5),
        alignItems: 'center',
    },
    infoText: {
        fontFamily: SemiBold,
        // fontWeight: '500',
        fontSize: normalize(15.3),
        color: COLORS.grey
    },
    chemicalUnit: {
        fontFamily: Regular,
        fontSize: normalize(13.3),

        color: COLORS.grey
    },
    textInputParent: {
        width: '40%',
        alignItems: 'flex-end',
        padding: normalize(5)
    },
    textInput: {
        height: normalize(40),
        width: '70%',
        borderRadius: normalize(12),
        borderWidth: normalize(1),
        borderColor: COLORS.grey,
        paddingHorizontal: normalize(10),
        textAlign: 'center'
    },
    scrollViewStyle: {
        height: normalize(45),
        width: '100%',
    },
    scrollViewContent: {
        height: normalize(40),
        width: '100%',
    },
    palletContainer: {
        height: normalize(40),
        width: normalize(60),
        marginHorizontal: normalize(5),
    },

    pallet: {
        width: normalize(60),
        borderRadius: normalize(5),
        height: normalize(20),
        backgroundColor: "red",
    },
    palletValue: {
        width: normalize(60),
        height: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontFamily: SemiBold,
        color: COLORS.grey
    },



    /* Modal Styles */

    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalView: {
        top: normalize(30),
        margin: normalize(20),
        backgroundColor: "white",
        borderRadius: normalize(20),
        padding: normalize(20),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalSelectedValue: {
        borderWidth: 1,
        fontFamily: SemiBold,
        fontSize: normalize(15),
        marginHorizontal: normalize(5),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(5),

    }

})