import {
  SHOW_LOADER,
  LOGIN_FETCH_SUCCESS,
  LOGIN_FETCH_ERROR,
  LOGIN_FETCH,
  LOGOUT_FETCH,
  CURRENT_API,
} from "../../Common/StoreActionTypes";

export const LoginAction = (isLogin = null) => {
  return async (dispatch) => {
    // dispatch({ type: SHOW_LOADER, payload: true });
    // Promise.all(
    //     [getApi(users, GET_FIRST_USERS_DATA_FETCH),
    // ]

    // ).then(function (values) {
    //     dispatch({ type: SHOW_LOADER, payload: false })

    //     /* Handle Response of all Apis */
    //     fetchTodoSuccess(dispatch, values[0]);

    // }).catch(err => {
    //     /* Will be called in case of No internet or Unauthorised */
    //     fetchFail(dispatch, err);
    // });

    loginSuccess(dispatch, isLogin);
  };
};

const loginSuccess = (dispatch, res) => {
  dispatch({
    type: CURRENT_API,
    payload: LOGIN_FETCH,
  });

  if (res != null) {
    dispatch({
      type: LOGIN_FETCH_SUCCESS,
      payload: res,
    });
  } else {
    dispatch({
      type: LOGIN_FETCH_ERROR,
      payload: res.message,
    });
  }
};

export const LogoutAction = (isLogin = null) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });

    LogoutSuccess(dispatch, isLogin);
  };
};

const LogoutSuccess = (dispatch, res) => {
  dispatch({
    type: CURRENT_API,
    payload: LOGOUT_FETCH,
  });
  dispatch({
    type: LOGOUT_FETCH,
    payload: null,
  });
};
