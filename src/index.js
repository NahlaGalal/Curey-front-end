import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Router from "./containers/Router";
import * as serviceWorker from "./serviceWorker";
import configureStore, { saveState } from "./configureStore";
import "./sass/main.scss";

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  let flag = false;
  // Object.values(state).forEach(obj => {
  //   if(obj.errors && obj.errors.auth) {
  //     // deleteState();
  //     flag = true;
  //     return <Route exact component={Error} />
  //   }
  // })
  if(!flag) saveState(state);
});

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
