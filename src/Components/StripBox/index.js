import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import CustomText from '../../Components/CustomText';
import styles from './styles';
import COLORS from "../../assets/Colors";
import _ from 'lodash'

export default class StripBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: this.props.item.values[0].color,
            selectedValue: this.props.item.values[0].value,
        };
        this.changingText = this.changingText.bind(this)
        this.onClickDelayed = _.debounce(this.changingText, 500);
    }


    changingText(text = 0, item) {
        try {
            const { item, onCreateObject = () => { } } = this.props
            const { values = [] } = item

            let itemValue = []

            values.map((elements, key) => {
                itemValue.push(elements.value)
            })

            const closest = itemValue.reduce((a, b) => {
                let aDiff = Math.abs(a - text);
                let bDiff = Math.abs(b - text);
                if (aDiff == bDiff) {
                    return a > b ? a : b;
                } else {
                    return bDiff < aDiff ? b : a;
                }
            });

            let selectedData = values.filter((item, index) => item.value == closest)

            this.setState({
                selectedColor: selectedData[0].color,
                selectedValue: selectedData[0].value
            }, () => {
                onCreateObject({ item, selectedColor: this.state.selectedColor, selectedValue: this.state.selectedValue })
            })

        }
        catch (err) {
            console.log(err, '<---- err');
        }
    }


    render() {
        const { item, onCreateObject = () => { } } = this.props
        const { values = [] } = item
        const { selectedColor } = this.state
        return (
            <View style={styles.box}>
                <View style={styles.selectedColorParent}>
                    <View
                        style={[styles.selectedColor,
                        {
                            backgroundColor: this.state.selectedColor
                        }]} />
                </View>
                <View style={styles.optionsParent}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoTextParent}>
                            <CustomText
                                text={item.name}
                                style={styles.infoText}
                            />
                            <CustomText
                                text={` (${item.unit})`}
                                style={styles.chemicalUnit}
                            />
                        </View>
                        <View style={styles.textInputParent}>
                            <TextInput
                                value={this.state.selectedValue}
                                style={styles.textInput}
                                keyboardType='decimal-pad'
                                onChangeText={(text) => {
                                    this.setState({ selectedValue: text }, () => { this.onClickDelayed(text, item) })
                                }
                                }
                            />
                        </View>
                    </View>

                    <View>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            contentContainerStyle={styles.scrollViewContent}
                            style={styles.scrollViewStyle}
                        >

                            {values.map((elements, key) => {
                                return <TouchableOpacity
                                    key={key}
                                    onPress={() => {
                                        this.setState({
                                            selectedColor: elements.color,
                                            selectedValue: elements.value
                                        }, () => {
                                            onCreateObject({ item, selectedColor: this.state.selectedColor, selectedValue: this.state.selectedValue })
                                        })
                                    }}
                                    style={styles.palletContainer}>
                                    <View style={[styles.pallet, {
                                        backgroundColor: elements.color,
                                        borderWidth: selectedColor == elements.color ? 4 : 0,
                                        borderColor: COLORS.green
                                    }]} />
                                    <View style={styles.palletValue}>
                                        <CustomText
                                            text={elements.value}
                                            style={styles.valueText}
                                        />
                                    </View>
                                </TouchableOpacity>
                            })}

                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
