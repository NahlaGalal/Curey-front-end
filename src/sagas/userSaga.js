import { put, takeEvery, call } from "redux-saga/effects";
import axios from "../util/axiosInstance";
import {
  SAGA_SIGNUP_USER,
  SIGNUP_USER,
  SAGA_GET_CITIES,
  GET_CITIES,
  LOGIN_USER,
  SAGA_LOGIN_USER,
  LOGOUT_USER,
  SAGA_LOGOUT_USER,
  SAGA_GET_PRESCRIPTION,
  GET_PRESCRIPTION,
  SAGA_ADD_PRESCRIPTION,
  ADD_PRESCRIPTION,
  SAGA_DELETE_PRESCRIPTIONS,
  DELETE_PRESCRIPTIONS,
  SAGA_ADD_TO_CART,
  ADD_TO_CART,
  SHOW_CART,
  SAGA_SHOW_CART,
  SAGA_REMOVE_FROM_CART,
  REMOVE_FROM_CART,
  GET_COMPLETE_SIGNUP,
  SAGA_GET_COMPLETE_SIGNUP,
} from "../actions/types";

function* signupUser({ data, history }) {
  try {
    const res = yield call(() => axios.post("/api/web/signup", data));
    if (!res.data.isFailed)
      yield put({
        type: SIGNUP_USER,
        payload: res.data.data.success,
        isFailed: false,
      });
    else
      yield put({
        type: SIGNUP_USER,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getCities({ history }) {
  try {
    const res = yield call(() => axios.get("/api/web/signup"));
    yield put({
      type: GET_CITIES,
      payload: res.data.data.cities,
    });
  } catch (err) {
    history.push("/error500");
  }
}

function* loginUser({ data, history }) {
  try {
    const res = yield call(() => axios.post("/api/web/login", data));
    if (!res.data.isFailed)
      yield put({
        type: LOGIN_USER,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: LOGIN_USER,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* logoutUser({ api_token, history }) {
  try {
    const res = yield call(() => axios.post("/api/web/logout", { api_token }));
    yield put({
      type: LOGOUT_USER,
      isFailed: res.data.isFailed,
    });
  } catch (err) {
    history.push("/error500");
  }
}

function* getPrescriptions({ api_token, history }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/prescriptions?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_PRESCRIPTION,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_PRESCRIPTION,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* postAddPrescription({ data, history }) {
  try {
    const res = yield call(() => axios.post("/api/web/add_prescription", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PRESCRIPTION,
        api_token: data.api_token,
      });
    else
      yield put({
        type: ADD_PRESCRIPTION,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* postDeletePrescriptions({ data, history }) {
  try {
    const res = yield call(() =>
      axios.post("/api/web/delete_prescription", data)
    );
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PRESCRIPTION,
        api_token: data.api_token,
      });
    else
      yield put({
        type: DELETE_PRESCRIPTIONS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* postAddToCart({ api_token, product, history }) {
  try {
    const res = yield call(() =>
      axios.post("/api/web/add_item", { api_token, product })
    );
    if (!res.data.isFailed)
      yield put({
        type: ADD_TO_CART,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: ADD_TO_CART,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getCart({ api_token, history }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/cart?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: SHOW_CART,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: SHOW_CART,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* postRemoveCartItem({ api_token, product_id, history }) {
  try {
    const res = yield call(() =>
      axios.post("/api/web/delete_item", { api_token, product_id })
    );
    if (!res.data.isFailed)
      yield put({
        type: SAGA_SHOW_CART,
        api_token,
      });
    else
      yield put({
        type: REMOVE_FROM_CART,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getCompleteSignup({ api_token, history }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/complete_signup?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_COMPLETE_SIGNUP,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_COMPLETE_SIGNUP,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

export default function* watchUser() {
  yield takeEvery(SAGA_SIGNUP_USER, signupUser);
  yield takeEvery(SAGA_GET_CITIES, getCities);
  yield takeEvery(SAGA_LOGIN_USER, loginUser);
  yield takeEvery(SAGA_LOGOUT_USER, logoutUser);
  yield takeEvery(SAGA_GET_PRESCRIPTION, getPrescriptions);
  yield takeEvery(SAGA_ADD_PRESCRIPTION, postAddPrescription);
  yield takeEvery(SAGA_DELETE_PRESCRIPTIONS, postDeletePrescriptions);
  yield takeEvery(SAGA_ADD_TO_CART, postAddToCart);
  yield takeEvery(SAGA_SHOW_CART, getCart);
  yield takeEvery(SAGA_REMOVE_FROM_CART, postRemoveCartItem);
  yield takeEvery(SAGA_GET_COMPLETE_SIGNUP, getCompleteSignup);
}
