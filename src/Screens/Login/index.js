import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LoginAction } from "../../store/actions/AuthAction";
import { LOGIN_FETCH } from "../../Common/StoreActionTypes";
import AsyncStorage from "@react-native-community/async-storage";
import { storeItem, getItem } from "../../Common/AsyncConfig";
import { normalize } from "../../Common/FontSize";
import Colors from "../../assets/Colors";
import CustomText from "../../Components/CustomText";
import { SemiBold } from "../../assets/Fonts";
import { validateEmail } from "../../Common/Utils";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Sagar@gmail.com",
      password: "helloWorld",

      changeUsername: '',
      changePassword: ''
    };
  }

  componentDidMount = async () => {
    let userData = await getItem("LoginDetails");

    if (userData != false) {
      this.props.navigation.navigate("App");
    }
  };


  handleAuth = () => {
    const { changeUsername, changePassword, username, password } = this.state;
    if (username != changeUsername) {           // Static condition , In real scenario it won't exits 
      if (validateEmail(changeUsername, 'Email')) {
        alert("Invalid username");
      }
    }
    else if (password != changePassword) {
      alert("Invalid password");
    }
    else {
      this.props.LoginAction({
        username: "Sagar@gmail.com",
        password: "helloWorld",
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.textIputParent}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ changeUsername: text })}
            value={this.state.changeUsername}
            placeholder='Username'
            keyboardType='email-address'
            placeholderTextColor={Colors.white}
          />
        </View>
        <View style={styles.textIputParent}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ changePassword: text })}
            value={this.state.changePassword}
            placeholder='Password'
            keyboardType='default'
            secureTextEntry={true}
            placeholderTextColor={Colors.white}
          />
        </View>


        <TouchableOpacity
          style={styles.button}
          onPress={this.handleAuth}
        >
          <CustomText text='Login' style={styles.loginText} />
        </TouchableOpacity>

      </View>
    );
  }

  async componentWillReceiveProps(nextProps) {
    const { CommonReducer, AuthReducer } = nextProps;

    switch (CommonReducer.apiType) {
      case LOGIN_FETCH: {
        if (AuthReducer.loginCredential != null) {
          this.props.navigation.navigate("App");
          storeItem("LoginDetails", AuthReducer);
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
      LoginAction: LoginAction,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    AuthReducer: state.AuthReducer,
    CommonReducer: state.CommonReducer,
  };
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Login);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: normalize(10),
    justifyContent: 'center',
    backgroundColor: Colors.gunMetalGrey
  },
  textIputParent: {
    marginVertical: normalize(10),
    width: '60%',
    alignSelf: 'center',
  },
  textInput: {
    height: normalize(40),
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: normalize(15),
    borderRadius: normalize(12),
    color: Colors.white
  },
  button: {
    height: normalize(50),
    width: '60%',
    backgroundColor: Colors.green,
    alignSelf: 'center',
    borderRadius: normalize(12),
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: SemiBold,
    fontSize: normalize(20),
    textAlign: 'center',
    color: Colors.white
  }
})