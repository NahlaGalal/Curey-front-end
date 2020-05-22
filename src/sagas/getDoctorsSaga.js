import { put, takeEvery, call } from "redux-saga/effects";
import axios from "../util/axiosInstance";
import {
  SAGA_GET_DOCTORS,
  GET_DOCTORS,
  SAGA_SEARCH_DOCTORS,
  SEARCH_DOCTORS,
  SAGA_GET_DOCTOR,
  GET_DOCTOR,
  SAGA_GET_DOCTOR_APPOINTMENTS,
  GET_DOCTOR_APPOINTMENTS,
} from "../actions/types";

function* getAllDoctors({ api_token, skip, limit, history }) {
  try {
    const res = yield call(() =>
      axios.get(
        `/api/web/doctors?api_token=${api_token}&skip=${skip}&limit=${limit}`
      )
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DOCTORS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_DOCTORS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getDoctorsSearch({
  search,
  api_token,
  skip,
  limit,
  city_id,
  speciality_id,
  history,
}) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/doctors/search`, {
        params: {
          name: search,
          api_token,
          skip,
          limit,
          city_id,
          speciality_id,
        },
      })
    );
    if (!res.data.isFailed)
      yield put({
        type: SEARCH_DOCTORS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: SEARCH_DOCTORS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getDoctorData({ id, api_token, history }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/doctor?api_token=${api_token}&id=${id}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DOCTOR,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_DOCTOR,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getDoctorAppointments({ api_token, doctor_id, history }) {
  try {
    const res = yield call(() =>
      axios.get(
        `/api/web/book_appointment?api_token=${api_token}&doctor_id=${doctor_id}`
      )
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DOCTOR_APPOINTMENTS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_DOCTOR_APPOINTMENTS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

export default function* watchDoctors() {
  yield takeEvery(SAGA_GET_DOCTORS, getAllDoctors);
  yield takeEvery(SAGA_SEARCH_DOCTORS, getDoctorsSearch);
  yield takeEvery(SAGA_GET_DOCTOR, getDoctorData);
  yield takeEvery(SAGA_GET_DOCTOR_APPOINTMENTS, getDoctorAppointments);
}
