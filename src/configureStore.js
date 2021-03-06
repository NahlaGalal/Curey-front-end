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
    specialities: [],
    address: "",
    phone: "",
    is_complete: 0,
    city_id: 0,
    work_address: ""
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
    dashboard: {
      pharmacy: {},
      performed: []
    },
    requests: [],
    success: ""
  },
  doctorData: {
    schedule: [],
    statement: [],
    requests: [],
    prescriptions: [],
    re_examinations: [],
    is_callup: false,
    reviews: {
      number: 0,
      total: 0
    },
    searchMedication: [],
    success: "",
    errors: [],
  },
};

export const loadState = () =>
  localStorage.getItem("curey-state")
    ? JSON.parse(localStorage.getItem("curey-state"))
    : {
        api_token: "",
        full_name: "",
        image: null,
        email: "",
        role: null,
        is_complete: 0,
        no_reviews: 0,
        rating: 0
      };

export const saveState = (state) =>
  localStorage.setItem(
    "curey-state",
    JSON.stringify({
      api_token: state.user.api_token,
      full_name: state.user.full_name,
      image: state.user.image,
      email: state.user.email,
      role: state.user.role,
      is_complete: state.user.is_complete,
      no_reviews: state.doctorData.reviews.number,
      rating: state.doctorData.reviews.total
    })
  );

export const deleteState = () => localStorage.removeItem("curey-state");

const initialState = () => {
  const state = loadState();

  return {
    ...defaultState,
    user: {
      ...defaultState.user,
      api_token: state.api_token,
      full_name: state.full_name,
      image: state.image,
      email: state.email,
      role: state.role,
      is_complete: state.is_complete,
    },
    doctorData: {
      ...defaultState.doctorData,
      reviews: {
        number: state.no_reviews,
        total: state.rating
      }
    }
  };
};

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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
