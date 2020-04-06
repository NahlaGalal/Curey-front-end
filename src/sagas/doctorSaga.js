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

export default function* watchDoctorDashboard() {
  yield takeEvery(actions.SAGA_GET_DOCTOR_STATEMENT, getDoctorStatement);
}
