import { GET_VIDEO_FETCH, GET_VIDEO_FETCH_SUCCESS, GET_VIDEO_FETCH_ERROR } from '../../Common/StoreActionTypes';

const INITIAL_STATE = {
    videoList: [],
    message: '',
};

export default function (state = INITIAL_STATE, action) {

    const { type, payload } = action

    switch (action.type) {
        case GET_VIDEO_FETCH:
            return { ...state, message: null, videoList: [] }
            break;
        case GET_VIDEO_FETCH_SUCCESS:
            return { ...state, message: null, videoList: payload.videos }
            break;
        case GET_VIDEO_FETCH_ERROR:
            return { ...state, message: payload, videoList: [] }
            break;


        default:
            return state;
    }
}