import {
  SAGA_GET_MEDICATIONS,
  GET_MEDICATIONS,
  GET_PACKING,
  SAGA_GET_PACKING,
  MOVE_TO_DELIVERY,
  SAGA_MOVE_TO_DELIVERY,
  SAGA_GET_DASHBOARD,
  GET_DASHBOARD,
  SAGA_GET_REQUESTS,
  GET_REQUESTS,
  SAGA_ACCEPT_REQUEST,
} from "../actions/types";
import { takeEvery, put, call } from "redux-saga/effects";
import axios from "../util/axiosInstance";

function* getMedicationsList({ api_token }) {
  try {
    const res = yield call(() =>
      axios.get(`/api/web/stock?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: GET_MEDICATIONS,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: GET_MEDICATIONS,
        payload: res.data.errors,
        isFailed: true,
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
        isFailed: false,
      });
    else
      yield put({
        type: GET_PACKING,
        payload: res.data.errors,
        isFailed: true,
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
        isFailed: false,
      });
    else
      yield put({
        type: MOVE_TO_DELIVERY,
        payload: res.data.errors,
        isFailed: true,
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
        isFailed: false,
      });
    else
      yield put({
        type: GET_DASHBOARD,
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
      axios.get(`/api/web/requests?api_token=${api_token}`)
    );
    if (!res.data.isFailed) {
      yield put({
        type: GET_REQUESTS,
        payload: res.data.data,
        isFailed: false,
      });
    } else {
      yield put({
        type: GET_REQUESTS,
        payload: res.data.errors,
        isFailed: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* postAcceptOrder({ api_token, id }) {
  try {
    const res = yield call(() =>
      axios.post("/api/web/accept_request", api_token, id)
    );
    if (!res.data.isFailed) {
      alert(res.data.data.success);
    } else {
      alert(res.data.data.errors.error);
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* watchPharmacyDashboard() {
  yield takeEvery(SAGA_GET_MEDICATIONS, getMedicationsList);
  yield takeEvery(SAGA_GET_PACKING, getPackingList);
  yield takeEvery(SAGA_MOVE_TO_DELIVERY, postDeliveryOrder);
  yield takeEvery(SAGA_GET_DASHBOARD, getDashboard);
  yield takeEvery(SAGA_GET_REQUESTS, getRequests);
  yield takeEvery(SAGA_ACCEPT_REQUEST, postAcceptOrder);
}
