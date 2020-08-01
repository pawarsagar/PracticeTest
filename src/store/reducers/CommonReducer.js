import { LOGIN_FETCH, LOGIN_FETCH_SUCCESS, LOGIN_FETCH_ERROR, CURRENT_API } from "../../Common/StoreActionTypes";

const INITIAL_STATE = {
    isLoader: false,
    apiType: null
};

export default function (state = INITIAL_STATE, action) {
    const { payload } = action
    switch (action.type) {
        case CURRENT_API: {
            return { ...state, message: null, apiType: payload }
            break;
        }

        default: return { ...state }

    }
}