import NetInfo from "@react-native-community/netinfo";
import { store } from "../../../App";

/* GET Api Call */
export async function getFetch(apiUrl, actionType, header = {}, body = {}) {
    const { isConnected } = await NetInfo.fetch();
    console.log(isConnected, '<----- isConnected');

    if (isConnected) {
        console.log({
            url: apiUrl,
            body: body,
            header: header,
            type: 'GET'
        }, '<-------------- SERVER CHUNK');
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...header
                // 'Authorization': 'Basic ' + btoa(userHeader + ':' + passwordHeader)
            },
        }).then((response) => {
            console.log(response, '<----- response');

            return response.json()
        }).then((responseJson) => {
            console.log(responseJson, '<----- responseJson');
            return responseJson;
        }).catch((error) => {
            console.log(error)
            return { responseCode: 404, message: "Network Error! Please try again later." }
        });
        return response;
    } else {
        return false;
    }
}

/* Api wrapper for GET Request */
export var getApi = (apiUrl, actionType, header = {}, body = {}) => {
    return new Promise(async (resolve, reject) => {
        const resData = await getFetch(apiUrl, actionType, header, body);
        // console.log("Get Response:- " + JSON.stringify(resData))
        console.log(resData, '<------ reSData');


        /* For this Particular API ONlY */

        if (resData == false /* || resData.responseCode == 404 */) {
            reject({ responseCode: 404, message: "Network Error! Please try again later." })
        }
        else {
            resolve(resData)
        }
        /* For this Particular API ONlY */

        /* General API FLOW */

        // if (resData == false || resData.responseCode == 404) {
        //     reject({ responseCode: 404, message: "Network Error! Please try again later." })
        // } else if (resData.responseCode == 401) {
        //     reject(resData)
        // } else {
        //     resolve(resData)
        // }

        /* General API FLOW */
    });
}




/* POST Api Call */
export async function postFetch(apiUrl, actionType, header = {}, body = {}) {
    const isConnected = await NetInfo.isConnected.fetch();
    if (isConnected) {
        console.log({
            url: apiUrl,
            body: body,
            header: header,
            type: 'POST'
        }, '<-------------- CHUNK');

        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...header
                // 'Authorization': 'Basic ' + btoa(userHeader + ':' + passwordHeader)
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        })
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {

                return { responseCode: 404, message: "Network Error! Please try again later." }
            });
        return response;
    } else {
        return false;
    }
}


/* Api wrapper for POST Request */
export var postApi = (apiUrl, actionType, header = {}, body = {}) => {
    return new Promise(async (resolve, reject) => {
        const resData = await postFetch(apiUrl, actionType, header, body);
        if (resData == false) {
            reject({ responseCode: 404, message: "Network Error! Please try again later." })
        } else if (resData.responseCode == 401) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}



/* Delete Api Call */
export async function deleteFetch(apiUrl, actionType, header = {}, body = {}) {
    const isConnected = await NetInfo.isConnected.fetch();
    if (isConnected) {
        console.log({
            url: apiUrl,
            body: body,
            header: header,
            type: 'DELETE'
        }, '<-------------- SERVER CHUNK');
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...header
                // 'Authorization': 'Basic ' + btoa(userHeader + ':' + passwordHeader)
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        })
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {

                return { responseCode: 404, message: "Network Error! Please try again later." }
            });
        return response;
    } else {
        return false;
    }
}



/* Api wrapper for DELETE Request */
export var deleteApi = (apiUrl, actionType, header = {}, body = {}) => {
    return new Promise(async (resolve, reject) => {
        const resData = await deleteFetch(apiUrl, actionType, header, body);
        if (resData == false) {
            reject({ responseCode: 404, message: "Network Error! Please try again later." })
        } else if (resData.responseCode == 401) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}