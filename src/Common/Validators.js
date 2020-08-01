import { Alert } from 'react-native';
export function EmailValidation(email) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
}


export function PasswordValidation(pwd) {
    if (pwd.length > 5) {
        return true;
    } else {
        return false;
    }

    // let pattern = /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,15})/
    // return pattern.test(pwd)
}

export function Phone(phone) {
    let pattern = /^[0]?[789]\d{9}$/;
    return pattern.test(phone)
}




export const validateEmail = (email, fieldName = "") => {
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email && email.length > 0) {
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(email)) {
            return true
        } else {
            Alert.alert('', fieldName + " is not valid")
            return false
        }
    } else if (fieldName != "") {
        Alert.alert('', "Please enter " + fieldName + ".")
    }
    return false;
}

export const isTextNotEmpty = (text, fieldName = "") => {
    if (text && text.trim().length > 0) {
        return true
    } else if (fieldName != "") {
        Alert.alert('', "Please enter " + fieldName + ".")
    }
    return false
}