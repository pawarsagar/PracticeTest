import React, { Component } from 'react';
import { View, Modal, FlatList, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import styles from './styles';
import CustomText from '../../Components/CustomText';
import Form from '../../Components/FormView';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getStripAction } from '../../store/actions/TestStripActions';
import { GET_STRIP_FETCH } from '../../Common/StoreActionTypes';
import { normalize } from '../../Common/FontSize';
import { StripBox } from '../../Components';
import { COLORS } from '../../assets';
import _ from 'lodash'
import { SemiBold } from '../../assets/Fonts';

const NUmber = [1, 2, 3, 4, 5]
class TestStrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colourPallete: [],
            isFetching: false,
            allSelectedObject: {},
            allSelectedJson: [],

            modalVisible: false
        };
    }

    componentDidMount = () => {
        this.props.getStripAction()
    };

    onRefresh() {
        this.setState({
            isFetching: true
        }, () => {
            this.props.getStripAction()
        })
    }

    handleObjectCreation = (value) => {
        const { allSelectedObject = {} } = this.state
        let reDefine = {
            ...allSelectedObject,
            [value.item.name]: {
                unit: value.item.unit,
                color: value.selectedColor,
                value: value.selectedValue
            }
        }

        let jsonObject = _.values(_.mapKeys(reDefine, function (value, key) { value.title = key; return value; }));

        this.setState({
            allSelectedObject: reDefine,
            allSelectedJson: [...this.state.allSelectedJson, { ...jsonObject[0] }]
        })
    }

    renderBox({ item }) {
        const { values = [] } = item
        return (
            <StripBox
                item={item}
                key={item.index} onCreateObject={this.handleObjectCreation} />
        )
    }


    renderList({ item }) {
        return <View style={{
            height: normalize(30),
            width: '100%',
            flexDirection: 'row',
            marginVertical: normalize(20),
            alignItems: 'center',
        }}>
            <CustomText
                text={item.title}
                style={styles.modalSelectedValue}
            />
            <CustomText
                text={item.unit}
                style={styles.modalSelectedValue}
            />

            <View style={{
                height: normalize(20),
                width: normalize(25),
                backgroundColor: item.color,
                borderWidth: 1,
            }} />
        </View>
    }


    render() {
        const { allSelectedJson = [] } = this.state
        console.log(this.state.allSelectedJson);
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, marginHorizontal: normalize(15), justifyContent: 'center', }}>

                    <View style={styles.headerParent}>
                        <CustomText
                            style={styles.headerTitleText}
                            text='Test Strip'
                        />
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={() => { allSelectedJson.length > 0 ? this.setState({ modalVisible: true }) : alert('Please select the Chemicals.') }}
                        >
                            <CustomText
                                style={styles.nextButtonText}
                                text='Next'
                            />
                        </TouchableOpacity>
                    </View>
                    <Form>
                        <FlatList
                            contentContainerStyle={{ paddingBottom: normalize(75) }}
                            data={this.state.colourPallete}
                            renderItem={(item, index) => { return this.renderBox(item) }}
                            refreshing={this.state.isFetching}
                            onRefresh={() => this.onRefresh()}
                        />
                    </Form>
                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <FlatList
                                contentContainerStyle={{ paddingBottom: normalize(75) }}
                                data={allSelectedJson}
                                renderItem={(item, index) => { return this.renderList(item) }}

                            />
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState({ modalVisible: false });
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Selection</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </Modal>
            </View>
        );
    }

    async componentWillReceiveProps(nextProps) {
        const { CommonReducer, HomeScreenFeed, ColourPalleteReducer } = nextProps;
        if (nextProps.CommonReducer.isLoading || (this.props.CommonReducer.isLoading != nextProps.CommonReducer.isLoading)) {
            return
        }
        switch (CommonReducer.apiType) {
            case GET_STRIP_FETCH: {
                if (ColourPalleteReducer.colourPallete.length > 0) {
                    this.setState({ colourPallete: ColourPalleteReducer.colourPallete, isFetching: false })
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
            getStripAction: getStripAction
        },
        dispatch
    );
}

function mapStateToProps(state) {
    return {
        CommonReducer: state.CommonReducer,
        HomeScreenFeed: state.HomeScreenFeed,
        ColourPalleteReducer: state.ColourPalleteReducer
    };
}

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(TestStrip);
