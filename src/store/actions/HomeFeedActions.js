import {
    SHOW_LOADER,
    CURRENT_API,
    GET_VIDEO_FETCH,
    GET_VIDEO_FETCH_SUCCESS,
    GET_VIDEO_FETCH_ERROR,
} from "../../Common/StoreActionTypes";
import { videoUrl } from "../../Common/ApiConfig";
import { fetchFail } from "./CommonAction";
import { getApi } from "./ApiCallFunction";

export const getVideoAction = (isLogin = null) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all(
            [getApi(videoUrl, GET_VIDEO_FETCH),
            ]

        ).then(function (values) {
            dispatch({ type: SHOW_LOADER, payload: false })
            getVideoSuccess(dispatch, values[0]);

        }).catch(err => {
            fetchFail(dispatch, err);
        });


    };
};

const getVideoSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_API,
        payload: GET_VIDEO_FETCH,
    });

    if (res != null) {
        dispatch({
            type: GET_VIDEO_FETCH_SUCCESS,
            payload: res,
        });
    } else {
        dispatch({
            type: GET_VIDEO_FETCH_ERROR,
            payload: res,
        });
    }
};