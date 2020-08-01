import {
  LOGIN_FETCH,
  LOGIN_FETCH_SUCCESS,
  LOGIN_FETCH_ERROR,
  LOGOUT_FETCH,
} from "../../Common/StoreActionTypes";

const INITIAL_STATE = {
  loginCredential: null,
  message: null,
};

export default function(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    case LOGIN_FETCH: {
      return { ...state, message: null, loginCredential: null };
      break;
    }

    case LOGIN_FETCH_SUCCESS: {
      return { ...state, message: null, loginCredential: payload };
      break;
    }

    case LOGIN_FETCH_ERROR: {
      return { ...state, message: payload, loginCredential: null };
    }
    case LOGOUT_FETCH: {
      return { ...state, message: "Logout Success", loginCredential: null };
    }

    default:
      return { ...state };
  }
}
