import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions/types";

function* getAppointments({ api_token }) {
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
      console.log(result.data.data);
    } else
      yield put({
        type: actions.RECIEVE_APPOINTMENTS,
        payload: result.data.errors,
        isFailed: true
      });
  } catch (e) {
    console.log(e);
  }
}

export default function* watchAppointments() {
  yield takeEvery(actions.REQUEST_APPOINTMENTS, getAppointments);
}
