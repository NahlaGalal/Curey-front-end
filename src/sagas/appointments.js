import axios from "../util/axiosInstance";
import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions/types";

function* getAppointments({ api_token, history }) {
  try {
    let result = yield call(() =>
      axios.get(`/api/web/appointments?api_token=${api_token}`)
    );
    if (!result.data.isFailed) {
      yield put({
        type: actions.RECIEVE_APPOINTMENTS,
        payload: result.data.data,
        isFailed: false
      });
    } else
      yield put({
        type: actions.RECIEVE_APPOINTMENTS,
        payload: result.data.errors,
        isFailed: true
      });
  } catch (e) {
    history.push("/error500");
  }
}

function* bookAppointment({ data, history }) {
  try {
    let res = yield call(() => axios.post("/api/web/book_appointment", data));
    if (!res.data.isFailed)
      yield put({
        type: actions.BOOK_APPOINTMENT_RES,
        payload: res.data.data,
        isFailed: false
      });
    else
      yield put({
        type: actions.BOOK_APPOINTMENT_RES,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (e) {
    history.push("/error500");
  }
}

export default function* watchAppointments() {
  yield takeEvery(actions.REQUEST_APPOINTMENTS, getAppointments);
  yield takeEvery(actions.BOOK_APPOINTMENT, bookAppointment);
}
