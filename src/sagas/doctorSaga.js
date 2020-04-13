import * as actions from "../actions/types";
import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";

function* getDoctorStatement({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/doctor_dashboard?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: actions.GET_DOCTOR_STATEMENT,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: actions.GET_DOCTOR_STATEMENT,
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
        type: actions.GET_DOCTOR_REEXAMINATION,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: actions.GET_DOCTOR_REEXAMINATION,
        payload: res.data.errors,
        isFailed: true,
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
        type: actions.GET_DOCTOR_REQUESTS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: actions.GET_DOCTOR_REQUESTS,
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
        type: actions.GET_DOCTOR_PRESCRIPTIONS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: actions.GET_DOCTOR_PRESCRIPTIONS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchDoctorDashboard() {
  yield takeEvery(actions.SAGA_GET_DOCTOR_STATEMENT, getDoctorStatement);
  yield takeEvery(actions.SAGA_GET_DOCTOR_REEXAMINATION, getReExaminations);
  yield takeEvery(actions.SAGA_GET_DOCTOR_REQUESTS, getRequests);
  yield takeEvery(actions.SAGA_GET_DOCTOR_PRESCRIPTIONS, getPrescriptions);
}
