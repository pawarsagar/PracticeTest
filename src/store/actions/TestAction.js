import {
  GET_FIRST_USERS_DATA_FETCH_SUCCESS,
  GET_FIRST_USERS_DATA_FETCH_ERROR,
  GET_FIRST_USERS_DATA_FETCH,
} from "../../Common/StoreActionTypes";
import { SHOW_LOADER } from "../../Common/StoreActionTypes";
import { users } from "../../Common/ApiConfig";
import { getApi } from "./ApiCallFunction";
import { fetchFail } from "./CommonAction";

/* Redux Action to call multiple APIs Simultaneously */
export const FetchUserTodoAction = () => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([getApi(users, GET_FIRST_USERS_DATA_FETCH)])
      .then(function(values) {
        dispatch({ type: SHOW_LOADER, payload: false });

        /* Handle Response of all Apis */
        fetchTodoSuccess(dispatch, values[0]);
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

const fetchTodoSuccess = (dispatch, res) => {
  if (res != null) {
    dispatch({
      type: GET_FIRST_USERS_DATA_FETCH_SUCCESS,
      payload: res,
    });
  } else {
    dispatch({
      type: GET_FIRST_USERS_DATA_FETCH_ERROR,
      payload: res.message,
    });
  }
};
