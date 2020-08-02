import { CURRENT_API, FETCH_FAILED, SHOW_LOADER } from "../../Common/StoreActionTypes";

const INITIAL_STATE = {

    apiType: null,
    isLoading: false,
    isSearchLoading: false,
    fetchFailed: false,
    unauthorised: false,
    message: '',
};

export default function (state = INITIAL_STATE, action) {
    const { payload } = action
    switch (action.type) {
        case CURRENT_API: {
            return { ...state, message: null, apiType: payload }
            break;
        }
        case FETCH_FAILED:
            return { ...state, apiType: FETCH_FAILED, isLoading: false, isSearchLoading: false, fetchFailed: true, unauthorised: false, message: action.payload }
        case SHOW_LOADER:
            return { ...state, isLoading: action.payload, }

        default: return { ...state }

    }
}