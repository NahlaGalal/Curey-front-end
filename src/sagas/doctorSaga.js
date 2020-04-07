import {
  SAGA_GET_SCHEDULE,
  GET_SCHEDULE,
  ADD_SCHEDULE,
  SAGA_ADD_SCHEDULE,
  SAGA_EDIT_SCHEDULE,
  EDIT_SCHEDULE,
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

function* postAddSchedule({ data }) {
  try {
    const res = yield call(() => axios.post("/api/web/add_schedule", data));
    if (!res.data.isFailed)
      yield put({
        type: SAGA_GET_SCHEDULE,
        api_token: data.api_token
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
    console.log(res)
    if(!res.data.isFailed)
      yield put({
        type: SAGA_GET_SCHEDULE,
        api_token: data.api_token
      })
    else
      yield put({
        type: EDIT_SCHEDULE,
        payload: res.data.errors,
        isFailed: true
      })
  }catch(err) {
    console.log(err)
  }
}

export default function* watchDoctorDashboard() {
  yield takeEvery(SAGA_GET_SCHEDULE, getSchedule);
  yield takeEvery(SAGA_ADD_SCHEDULE, postAddSchedule);
  yield takeEvery(SAGA_EDIT_SCHEDULE, postEditSchedule)
}
