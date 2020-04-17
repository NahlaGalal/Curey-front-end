import { createStore, applyMiddleware, compose } from "redux";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";

const defaultState = {
  prescription: {
    medications: [],
  },
  user: {
    cities: [],
    success: "",
    errors: [],
    api_token: "",
    full_name: "",
    image: null,
    email: "",
    prescriptions: [],
    cart: [],
    notifications: [],
    role: null,
  },
  doctors: {
    doctorsData: [],
    specialities: [],
    cities: [],
    doctorsSearch: [],
    doctorData: {
      degrees: [],
      reviews: [],
      id: 0,
      is_callup: 0,
      appointments: {
        first_day: {},
        second_day: {},
      },
    },
    doctorsDone: false,
  },
  homeData: {
    top_doctors: [],
    top_products: [],
    errors: [],
  },
  medicationsData: {
    products: [],
    keywords: [],
    medicationsSearch: [],
    medicationInfo: {
      product: {},
      pharmacies: [],
    },
    medicationsSaved: [],
    orders: [],
    errors: [],
    medicationsDone: false,
  },
  appointments: {
    appointments: [],
    errors: [],
    success: "",
  },
  pharmacyData: {
    medications: [],
    packing: [],
    errors: [],
    dashboard: [],
    requests: [],
  },
  doctorData: {
    schedule: [],
    statement: [],
    requests: [],
    prescriptions: [],
    re_examinations: [],
    is_callup: false,
    errors: [],
  },
};

export const loadState = () =>
  localStorage.getItem("curey-state")
    ? JSON.parse(localStorage.getItem("curey-state"))
    : {
        id: "",
        api_token: "",
        full_name: "",
        image: null,
        email: "",
        role: null
      };

export const saveState = (state) =>
  localStorage.setItem(
    "curey-state",
    JSON.stringify({
      user_id: state.user.user_id,
      api_token: state.user.api_token,
      full_name: state.user.full_name,
      image: state.user.image,
      email: state.user.email,
      role: state.user.role
    })
  );

export const deleteState = () => localStorage.removeItem("curey-state");

const initialState = () => {
  const state = loadState();

  return {
    ...defaultState,
    user: {
      ...defaultState.user,
      user_id: state.user_id,
      api_token: state.api_token,
      full_name: state.full_name,
      image: state.image,
      email: state.email,
      role: state.role
    },
  };
};

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }
  const store = createStore(
    reducers,
    initialState(),
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
