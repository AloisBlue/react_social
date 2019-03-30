import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap'
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./rootReducer";
import { userLoggedIn, logout } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import { clearCurrentProfile } from "./actions/profiles";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.blueHubJwt) {
  // set authorization headers
  setAuthToken(localStorage.blueHubJwt)
  // set user & isAuthenticated
  store.dispatch(userLoggedIn(jwtDecode(localStorage.blueHubJwt)));

  // check expiration
  const currentTime = Date.now() /1000;
  if(jwtDecode(localStorage.blueHubJwt).exp < currentTime) {
    store.dispatch(logout());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/';
  }

}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
