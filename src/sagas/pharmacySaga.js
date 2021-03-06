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
  ACCEPT_REQUEST,
  COMPLETE_PHARM_SIGNUP,
  SAGA_COMPLETE_PHARM_SIGNUP,
} from "../actions/types";
import { takeEvery, put, call } from "redux-saga/effects";
import axios from "../util/axiosInstance";

function* getMedicationsList({ api_token, history }) {
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
    history.push("/error500");
  }
}

function* getPackingList({ api_token, history }) {
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
    history.push("/error500");
  }
}

function* postDeliveryOrder({ data, history }) {
  try {
    const res = yield call(() => axios.post("/api/web/order_ready", data));
    if (!res.data.isFailed)
      yield put({
        type: MOVE_TO_DELIVERY,
        isFailed: false,
      });
    else
      yield put({
        type: MOVE_TO_DELIVERY,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getDashboard({ api_token, history }) {
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
    history.push("/error500");
  }
}

function* getRequests({ api_token, history }) {
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
    history.push("/error500");
  }
}

function* postAcceptOrder({ data, history }) {
  try {
    const res = yield call(() => axios.post("/api/web/accept_request", data));
    if (!res.data.isFailed) {
      getPackingList({ api_token: data.api_token, history });
    } else {
      yield put({
        type: ACCEPT_REQUEST,
        payload: res.data.errors,
        isFailed: true,
      });
    }
  } catch (err) {
    history.push("/error500");
  }
}

function* postCompleteSignUp({ data, history }) {
  try {
    const res = yield call(() => axios.post("/api/web/complete_signup", data));
    if (!res.data.isFailed) {
      yield put({
        type: COMPLETE_PHARM_SIGNUP,
        payload: res.data.data,
        isFailed: false,
      });
    } else {
      yield put({
        type: COMPLETE_PHARM_SIGNUP,
        payload: res.data.errors,
        isFailed: true,
      });
    }
  } catch (err) {
    history.push("/error500");
  }
}

export default function* watchPharmacyDashboard() {
  yield takeEvery(SAGA_GET_MEDICATIONS, getMedicationsList);
  yield takeEvery(SAGA_GET_PACKING, getPackingList);
  yield takeEvery(SAGA_MOVE_TO_DELIVERY, postDeliveryOrder);
  yield takeEvery(SAGA_GET_DASHBOARD, getDashboard);
  yield takeEvery(SAGA_GET_REQUESTS, getRequests);
  yield takeEvery(SAGA_ACCEPT_REQUEST, postAcceptOrder);
  yield takeEvery(SAGA_COMPLETE_PHARM_SIGNUP, postCompleteSignUp);
}
