import {
    SHOW_LOADER,
    CURRENT_API,
    GET_STRIP_FETCH,
    GET_STRIP_FETCH_SUCCESS,
    GET_STRIP_FETCH_ERROR
} from "../../Common/StoreActionTypes";
import { videoUrl, testStripUrl } from "../../Common/ApiConfig";
import { fetchFail } from "./CommonAction";
import { getApi } from "./ApiCallFunction";

export const getStripAction = (isLogin = null) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all(
            [getApi(testStripUrl, GET_STRIP_FETCH),
            ]

        ).then(function (values) {
            dispatch({ type: SHOW_LOADER, payload: false })
            getStripActionSuccess(dispatch, values[0]);

        }).catch(err => {
            fetchFail(dispatch, err);
        });


    };
};

const getStripActionSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_API,
        payload: GET_STRIP_FETCH,
    });

    if (res != null) {
        dispatch({
            type: GET_STRIP_FETCH_SUCCESS,
            payload: res,
        });
    } else {
        dispatch({
            type: GET_STRIP_FETCH_ERROR,
            payload: res,
        });
    }
};