import jwtDecode from "jwt-decode";
import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP, GET_ERRORS, CLEAR_ERROR, DELETE_USER_ACCOUNT } from "../types";
import api from "../api";
import setAuthToken from "../utils/setAuthToken";
import { clearCurrent } from "./profiles";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const userSignedUp = user => ({
  type: USER_SIGNED_UP,
  user: {
    isAuthenticated: false,
    user
  }
});

export const deleteAccount = () => ({
  type: DELETE_USER_ACCOUNT,
  user: {
    isAuthenticated: false
  }
});

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err.response.data
});

export const clearError = () => ({
  type: CLEAR_ERROR,
  payload: {}
})

export const login = (credentials) => (dispatch) =>
  api.user
    .login(credentials)
    .then(user => {
      localStorage.blueHubJwt = user.token;
      setAuthToken(user.token)
      dispatch(userLoggedIn(jwtDecode(user.token)));
    })
    .catch(err => {
      dispatch(getErrors(err))
    });

export const clearReduxError = () => (dispatch) => {
  dispatch(clearError());
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("blueHubJwt");
  setAuthToken(false);
  dispatch(userLoggedOut());
}

export const signup = (addUser) => (dispatch) =>
  api.user.signup(addUser).then(user => {
    dispatch(userSignedUp(user));
  });

export const deleteUserAccount = () => (dispatch) => {
  if (window.confirm('Do you want to delete your account')) {
    api.user
      .delete()
      .then(() => {
        dispatch(deleteAccount());
        dispatch(clearCurrent());
      })
  }

}
