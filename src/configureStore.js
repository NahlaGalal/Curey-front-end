import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";

const defaultState = {
  prescription: [],
  user: {
    cities: [],
    success: "",
    errors: [],
    api_token: "",
    full_name: "",
    image: null,
    email: "",
    prescriptions: [],
    cart: []
  },
  doctors: {
    doctorsData: [],
    specialities: [],
    cities: [],
    doctorsSearch: [],
    doctorData: {
      degrees: [],
      reviews: []
    }
  },
  homeData: {
    top_doctors: [],
    top_products: [],
    errors: []
  },
  medicationsData: {
    products: [],
    keywords: [],
    medicationsSearch: [],
    medicationInfo: {
      product: {},
      pharmacies: []
    },
    medicationsSaved: [],
    orders: [],
    errors: []
  }
};

export const loadState = () =>
  localStorage.getItem("curey-state")
    ? JSON.parse(localStorage.getItem("curey-state"))
    : {
        api_token: "",
        full_name: "",
        image: null,
        email: "",
        cart: []
      };

export const saveState = state =>
  localStorage.setItem(
    "curey-state",
    JSON.stringify({
      api_token: state.user.api_token,
      full_name: state.user.full_name,
      image: state.user.image,
      email: state.user.email,
      cart: state.user.cart
    })
  );

export const deleteState = () => localStorage.removeItem("curey-state");

const initialState = () => {
  return {
    ...defaultState,
    user: {
      ...defaultState.user,
      api_token: loadState().api_token,
      full_name: loadState().full_name,
      image: loadState().image,
      email: loadState().email,
      cart: loadState().cart
    }
  };
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }
  const store = createStore(
    reducers,
    initialState(),
    applyMiddleware(...middlewares)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
