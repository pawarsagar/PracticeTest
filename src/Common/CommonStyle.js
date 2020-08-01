
import { StyleSheet } from 'react-native';
import { normalize } from './FontSize';

export const commonStyle = StyleSheet.create({
    shadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: normalize(3.3),
        shadowOpacity: normalize(2),
        elevation: normalize(1),
    }
})