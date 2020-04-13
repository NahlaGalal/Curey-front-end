import {
  SAGA_GET_SCHEDULE,
  GET_SCHEDULE,
  ADD_SCHEDULE,
  SAGA_ADD_SCHEDULE,
  SAGA_EDIT_SCHEDULE,
  EDIT_SCHEDULE,
  SET_RE_EXAMINATION,
  SAGA_SET_RE_EXAMINAION,
  SEND_PRESCRIPTION,
  SAGA_SEND_PRESCRIPTION,
  SAGA_GET_DOCTOR_STATEMENT,
  GET_DOCTOR_STATEMENT,
  SAGA_GET_DOCTOR_REQUESTS,
  GET_DOCTOR_REQUESTS,
  SAGA_GET_DOCTOR_REEXAMINATION,
  GET_DOCTOR_REEXAMINATION,
  SAGA_GET_DOCTOR_PRESCRIPTIONS,
  GET_DOCTOR_PRESCRIPTIONS,
} from "../actions/types";
import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";

function* getSchedule({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/schedule?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_SCHEDULE,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_SCHEDULE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* getDoctorStatement({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/doctor_dashboard?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DOCTOR_STATEMENT,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_DOCTOR_STATEMENT,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postAddSchedule({ data }) {
  try {
    const res = yield call(() => axios.post("/api/web/add_schedule", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_SCHEDULE,
        api_token: data.api_token,
      });
    else
      yield put({
        type: ADD_SCHEDULE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postEditSchedule({ data }) {
  try {
    const res = yield call(() => axios.post("/api/web/update_day", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_SCHEDULE,
        api_token: data.api_token,
      });
    else
      yield put({
        type: EDIT_SCHEDULE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* getReExaminations({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/doctor/reExaminations?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DOCTOR_REEXAMINATION,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_DOCTOR_REEXAMINATION,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postSetReExamination({ data }) {
  try {
    const res = yield call(() =>
      axios.post("/api/web/doctor/set_reExamination", data)
    );
    console.log(res);
    if (!res.data.isFailed)
      yield put({
        type: SET_RE_EXAMINATION,
      });
    else
      yield put({
        type: SET_RE_EXAMINATION,
        payload: res.data.errors,
        isFailed: false,
      });
  } catch (err) {
    console.log(err);
  }
}

function* getRequests({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/doctor/requests?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DOCTOR_REQUESTS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_DOCTOR_REQUESTS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* postSendPrescription({ data }) {
  try {
    const res = yield call(() =>
      axios.post("/api/web/doctor/send_prescription", data)
    );
    console.log(res);
    if (!res.data.isFailed)
      yield put({
        type: SEND_PRESCRIPTION,
        isFailed: false,
      });
    else
      yield put({
        type: SEND_PRESCRIPTION,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

function* getPrescriptions({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/doctor/prescriptions?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DOCTOR_PRESCRIPTIONS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_DOCTOR_PRESCRIPTIONS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchDoctorDashboard() {
  yield takeEvery(SAGA_GET_SCHEDULE, getSchedule);
  yield takeEvery(SAGA_ADD_SCHEDULE, postAddSchedule);
  yield takeEvery(SAGA_EDIT_SCHEDULE, postEditSchedule);
  yield takeEvery(SAGA_SET_RE_EXAMINAION, postSetReExamination);
  yield takeEvery(SAGA_SEND_PRESCRIPTION, postSendPrescription);
  yield takeEvery(SAGA_GET_DOCTOR_STATEMENT, getDoctorStatement);
  yield takeEvery(SAGA_GET_DOCTOR_REEXAMINATION, getReExaminations);
  yield takeEvery(SAGA_GET_DOCTOR_REQUESTS, getRequests);
  yield takeEvery(SAGA_GET_DOCTOR_PRESCRIPTIONS, getPrescriptions);
}
