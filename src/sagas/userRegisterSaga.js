import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";
import {
  SAGA_SIGNUP_USER,
  SIGNUP_USER,
  SAGA_GET_CITIES,
  GET_CITIES,
  LOGIN_USER,
  SAGA_LOGIN_USER,
  LOGOUT_USER,
  SAGA_LOGOUT_USER
} from "../actions/types";

function* signupUser({ data }) {
  try {
    const res = yield call(() => axios.post("/api/web/signup", data));
    if (!res.data.isFailed)
      yield put({
        type: SIGNUP_USER,
        payload: res.data.data.success,
        isFailed: false
      });
    else
      yield put({
        type: SIGNUP_USER,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* getCities() {
  try {
    const res = yield call(() => axios.get("/api/web/signup"));
    yield put({
      type: GET_CITIES,
      payload: res.data.data.cities
    });
  } catch (err) {
    console.log(err);
  }
}

function* loginUser({ data }) {
  try {
    const res = yield call(() => axios.post("/api/web/userLogin", data));
    if (!res.data.isFailed)
      yield put({
        type: LOGIN_USER,
        payload: res.data.data,
        isFailed: false
      });
    else
      yield put({
        type: LOGIN_USER,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* logoutUser({ api_token }) {
  try {
    const res = yield call(() => axios.post("/api/web/logout", { api_token }));
    yield put({
      type: LOGOUT_USER,
      isFailed: res.data.isFailed
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchUserRegisteration(data) {
  yield takeEvery(SAGA_SIGNUP_USER, signupUser);
  yield takeEvery(SAGA_GET_CITIES, getCities);
  yield takeEvery(SAGA_LOGIN_USER, loginUser);
  yield takeEvery(SAGA_LOGOUT_USER, logoutUser);
}
