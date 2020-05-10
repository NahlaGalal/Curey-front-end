import { takeEvery, put, call } from "redux-saga/effects";
import axios from "../util/axiosInstance";
import {
  SAGA_GET_PROFILE,
  GET_PROFILE,
  CHANGE_NAME,
  CHANGE_IMAGE,
  CHANGE_ADDRESS,
  CHANGE_PASSWORD,
  CHANGE_PHONE,
  CHANGE_SPECIALITY,
  CHANGE_FEES,
  CHANGE_EMAIL,
  SAGA_CHANGE_NAME,
  SAGA_CHANGE_IMAGE,
  SAGA_CHANGE_ADDRESS,
  SAGA_CHANGE_PASSWORD,
  SAGA_CHANGE_SPECIALITY,
  SAGA_CHANGE_FEES,
  SAGA_CHANGE_EMAIL,
  SAGA_CHANGE_PHONE,
  SAGA_CHANGE_DURATION,
  CHANGE_DURATION,
  CHANGE_HOME_VISIT_FEES,
  SAGA_CHANGE_HOME_VISIT_FEES,
} from "../actions/types";

function* getProfile({ api_token }) {
  try {
    let res = yield call(() =>
      axios.get(`/api/web/profile?api_token=${api_token}`)
    );
    if (!res.data.isFailed) {
      yield put({
        type: GET_PROFILE,
        payload: res.data.data,
        isFailed: false,
      });
    } else
      yield put({
        type: GET_PROFILE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (e) {
    console.log(e);
  }
}

function* postChangeName({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_name", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_NAME,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangeImage({ data }) {
  console.log(data)
  try {
    let res = yield call(() => axios.post("/api/web/change_image", data, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
      }
    }));
    console.log(res)
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_IMAGE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangeAddress({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_address", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_ADDRESS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangePassword({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_password", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_PASSWORD,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangePhone({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_phone", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_PHONE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangeSpeciality({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_speciality", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_SPECIALITY,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangeFees({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_fees", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_FEES,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangeDuration({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_duration", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_DURATION,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangeEmail({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_email", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_EMAIL,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postChangeHomeVisitFees({ data }) {
  try {
    let res = yield call(() => axios.post("/api/web/change_hv", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_PROFILE,
        api_token: data.api_token
      });
    else
      yield put({
        type: CHANGE_HOME_VISIT_FEES,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchProfile() {
  yield takeEvery(SAGA_GET_PROFILE, getProfile);
  yield takeEvery(SAGA_CHANGE_NAME, postChangeName);
  yield takeEvery(SAGA_CHANGE_IMAGE, postChangeImage);
  yield takeEvery(SAGA_CHANGE_ADDRESS, postChangeAddress);
  yield takeEvery(SAGA_CHANGE_PASSWORD, postChangePassword);
  yield takeEvery(SAGA_CHANGE_PHONE, postChangePhone);
  yield takeEvery(SAGA_CHANGE_SPECIALITY, postChangeSpeciality);
  yield takeEvery(SAGA_CHANGE_FEES, postChangeFees);
  yield takeEvery(SAGA_CHANGE_DURATION, postChangeDuration);
  yield takeEvery(SAGA_CHANGE_EMAIL, postChangeEmail);
  yield takeEvery(SAGA_CHANGE_HOME_VISIT_FEES, postChangeHomeVisitFees);
}
