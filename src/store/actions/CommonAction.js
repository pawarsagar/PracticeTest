import {
  FETCH_FAILED,
  UN_AUTHORISED,
  NOT_ACTIVATED,
  SEARCH_LOADER,
  TOGGLE_TOUCHID,
  NOT_FOUND,
} from "../../Common/StoreActionTypes";

export const fetchFail = (dispatch, err) => {
  if (err.responseCode == 401) {
    dispatch({
      type: UN_AUTHORISED,
      payload: err.message,
    });
  }
  /*    if (err.responseCode == 400) {
        dispatch({
            type: NOT_ACTIVATED,
            payload: err.message
        })
    } */
  // else if (err.responseCode == 404) {
  //     dispatch({
  //         type: UN_AUTHORISED,
  //         payload: err.message
  //     });

  // }
  else {
    dispatch({
      type: FETCH_FAILED,
      payload: err.message,
    });
  }
};

export const stopSearchLoader = () => {
  return (dispatch) => {
    dispatch({ type: SEARCH_LOADER, payload: false });
  };
};

export const touchId = (payload) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_TOUCHID, payload: payload });
  };
};
