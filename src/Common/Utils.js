import { Platform, Linking, Alert } from 'react-native';
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

export const isTextsSame = (text1, text2, fieldName1 = "", fieldName2 = "") => {
    if (text1 == text2) {
        return true
    } else {
        Alert.alert('', fieldName1 + " and " + fieldName2 + " are not same")
    }
    return false
}

export const isAndroid = () => {
    return Platform.OS == "android";
}

export const getAddress = (address = {}) => {
    var newAddress = '';
    newAddress += address.street_1 != null && address.street_1 != "" ? address.street_1 + ", " : ''
    newAddress += address.street_2 != null && address.street_2 != "" ? address.street_2 + ", " : ''
    newAddress += address.cities != null && address.cities != "" && address.cities.name != null ? address.cities.name + ", " : ''
    newAddress += address.zip_code != null && address.zip_code != "" ? address.zip_code + ", " : ''
    newAddress += address.states != null && address.states != "" && address.states.name != null ? address.states.name + ", " : ''
    newAddress += address.countries != null && address.countries != "" && address.countries.name != null ? address.countries.name + ", " : ''
    return newAddress.length > 1 ? newAddress.slice(0, -2) : newAddress
}

export const getGoogleAddress = (address = {}) => {
    // convertedGoogleData.area || (convertedGoogleData.streetNumber + " " + convertedGoogleData.route + " " + convertedGoogleData.locality) || convertedGoogleData.city
    var newAddress = '';
    newAddress += address.area != null ? address.area + ", " : ''
    newAddress += address.streetNumber != null && address.area == null ? address.streetNumber + ", " : ''
    newAddress += address.route != null ? address.route + ", " : ''
    newAddress += address.locality != null ? address.locality + ", " : ''
    newAddress += address.city != null && address.locality == null ? address.city + ", " : ''

    return newAddress.length > 1 ? newAddress.slice(0, -2) : newAddress
}

export const getStreet1 = (address = {}) => {
    var newAddress = '';
    if (address.streetNumber != null) {
        newAddress += address.streetNumber != null ? address.streetNumber + ", " : ''
        newAddress += address.route != null ? address.route + ", " : ''
        newAddress += address.locality != null ? address.locality + ", " : ''
    } else {
        newAddress += address.society != null ? address.society + ", " : ''
        newAddress += address.area != null ? address.area + ", " : ''
    }
    return newAddress.length > 1 ? newAddress.slice(0, -2) : newAddress
}

var month_names = ["Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"];

function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};


//01-Aug-2019
export const getDateTime = (date) => {
    var time = date.split(" ");
    var newDate = new Date(time[0]);
    var day = newDate.getDate();
    var month_index = newDate.getMonth();
    var year = newDate.getFullYear();
    return "" + day + "-" + month_names[month_index] + "-" + year + "\n" + tConv24(time[1]);
}

export const getDate = (date) => {
    var time = date.split(" ");
    var newDate = new Date(time[0]);
    var day = newDate.getDate();
    var month_index = newDate.getMonth();
    var year = newDate.getFullYear();
    return "" + day + "-" + month_names[month_index] + "-" + year;
}


//yyyy-mm-dd
export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


export const openMap = (address) => {
    const label = address;

    const url = Platform.select({
        ios: "maps://?q=" + label,
        android: "geo://?q=" + label
    });

    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            return Linking.openURL(url);
        } else {
            var browser_url =
                "https://www.google.de/maps?q=" +
                label;
            return Linking.openURL(browser_url);
        }
    });
}

export const dialCall = (phone) => {

    var phoneNumber = `tel:${phone}`;

    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('', 'Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => Alert.alert('', err));

};

export const getBoxesList = (box = []) => {
    var boxes = JSON.parse(box);
    if (!Array.isArray(boxes)) { return "" }
    var boxesText = "";
    for (var i = 0; i < boxes.length; i++) {
        boxesText += boxes[i].quantity + " x " + boxes[i].name + "\n"
    }
    return boxesText;
}

export const getBoxes = (box = []) => {
    var boxes = JSON.parse(box);
    if (!Array.isArray(boxes)) { return [] }
    var newBoxes = [];
    for (var i = 0; i < boxes.length; i++) {
        newBoxes[i] = { qty: boxes[i].quantity, name: boxes[i].name, id: boxes[i].id }
    }
    return newBoxes;
}

export const callNumber = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    }
    else {
        phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => console.log(err));
};


export const tConv24FromDate = (date) => {
    var time = date.split(" ");
    var time24 = time[1]
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};

var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getDayDate = (date) => {
    var time = date.split(" ");
    var newDate = new Date(time[0]);
    var day = newDate.getDate();
    var month_index = newDate.getMonth();
    var year = newDate.getFullYear();
    return day_names[newDate.getDay()] + "  " + day + "-" + month_names[month_index] + "-" + year;
}


export const humanize = (str = '') => {
    var frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}