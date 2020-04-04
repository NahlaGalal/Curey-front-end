import {
  SAGA_GET_MEDICATIONS,
  GET_MEDICATIONS,
  GET_PACKING,
  SAGA_GET_PACKING,
  MOVE_TO_DELIVERY,
  SAGA_MOVE_TO_DELIVERY,
  SAGA_GET_DASHBOARD,
  GET_DASHBOARD
} from "../actions/types";
import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";

function* getMedicationsList({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/stock?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_MEDICATIONS,
        payload: res.data.data,
        isFailed: false
      });
    else
      yield put({
        type: GET_MEDICATIONS,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* getPackingList({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/packing_list?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_PACKING,
        payload: res.data.data,
        isFailed: false
      });
    else
      yield put({
        type: GET_PACKING,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* postDeliveryOrder({ data }) {
  try {
    const res = yield call(() => axios.post("/api/web/order_ready", data));
    if (!res.data.isFailed)
      yield put({
        type: MOVE_TO_DELIVERY,
        payload: res.data.data,
        isFailed: false
      });
    else
      yield put({
        type: MOVE_TO_DELIVERY,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* getDashboard({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/pharmacy_dashboard?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_DASHBOARD,
        payload: res.data.data,
        isFailed: false
      });
    else
      yield put({
        type: GET_DASHBOARD,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchPharmacyDashboard() {
  yield takeEvery(SAGA_GET_MEDICATIONS, getMedicationsList);
  yield takeEvery(SAGA_GET_PACKING, getPackingList);
  yield takeEvery(SAGA_MOVE_TO_DELIVERY, postDeliveryOrder);
  yield takeEvery(SAGA_GET_DASHBOARD, getDashboard);
}
