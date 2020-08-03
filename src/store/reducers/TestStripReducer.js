import { GET_STRIP_FETCH, GET_STRIP_FETCH_SUCCESS, GET_STRIP_FETCH_ERROR } from '../../Common/StoreActionTypes';

const INITIAL_STATE = {
    colourPallete: [],
    message: null
};

export default function (state = INITIAL_STATE, action) {

    const { type, payload } = action

    switch (action.type) {
        case GET_STRIP_FETCH:
            return { ...state, message: null, colourPallete: [] }
            break;
        case GET_STRIP_FETCH_SUCCESS:
            return { ...state, message: null, colourPallete: payload }
            break;
        case GET_STRIP_FETCH_ERROR:
            return { ...state, message: payload, colourPallete: [] }
            break;


        default:
            return state;
    }
}