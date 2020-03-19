import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions/types";

function* getMedications({ api_token }) {
  try {
    let result = yield call(() =>
      axios.get(`/api/web/medications?api_token=${api_token}`)
    );
    if (!result.data.isFailed) {
      yield put({
        type: actions.RECIEVE_MEDICATIONS,
        payload: result.data.data,
        isFailed: false
      });
      console.log(result.data.data);
    } else
      yield put({
        type: actions.RECIEVE_MEDICATIONS,
        payload: result.data.errors,
        isFailed: true
      });
  } catch (e) {
    console.log(e);
  }
}

function* getMedicationsSearch({ search, api_token }) {
  try {
    const res = yield call(() =>
      axios.get(
        `/api/web/medications/search?name=${search}&api_token=${api_token}`
      )
    );
    if (!res.data.isFailed) {
      yield put({
        type: actions.RECIEVE_SEARCH_MEDICATIONS,
        payload: res.data.data,
        isFailed: false
      });
      console.log(res.data.data);
    } else
      yield put({
        type: actions.RECIEVE_SEARCH_MEDICATIONS,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* getMedication({ api_token, id }) {
  try {
    let result = yield call(() =>
      axios.get(`/api/web/medication?api_token=${api_token}&id=${id}`)
    );
    if (!result.data.isFailed) {
      yield put({
        type: actions.RECIEVE_MEDICATION,
        payload: result.data.data,
        isFailed: false
      });
    } else
      yield put({
        type: actions.RECIEVE_MEDICATION,
        payload: result.data.errors,
        isFailed: true
      });
  } catch (e) {
    console.log(e);
  }
}

function* postAddFavourite({ data, source }) {
  try {
    let res = yield call(() => axios.post("/api/web/add_favourites", data));
    if (!res.data.isFailed)
      if (source === "MedicationPage")
        yield put({
          type: actions.REQUEST_MEDICATION,
          id: data.product_id,
          api_token: data.api_token,
          isFailed: false
        });
      else if (source === "MedicationsPage")
        yield put({
          type: actions.REQUEST_MEDICATIONS,
          api_token: data.api_token,
          isFailed: false
        });
      else
        yield put({
          type: actions.REQUEST_HOME_DATA,
          api_token: data.api_token,
          isFailed: false
        });
    else
      yield put({
        type: actions.ADD_FAVOURITE,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* postDeleteFavourite({ data, source }) {
  try {
    let res = yield call(() => axios.post("/api/web/delete_favourites", data));
    if (!res.data.isFailed)
      if (source === "SavePage")
        yield put({
          type: actions.SAGA_GET_FAVOURITES,
          api_token: data.api_token,
          isFailed: false
        });
      else if (source === "MedicationPage")
        yield put({
          type: actions.REQUEST_MEDICATION,
          id: data.product_id,
          api_token: data.api_token,
          isFailed: false
        });
      else if (source === "MedicationsPage")
        yield put({
          type: actions.REQUEST_MEDICATIONS,
          api_token: data.api_token,
          isFailed: false
        });
      else
        yield put({
          type: actions.REQUEST_HOME_DATA,
          api_token: data.api_token,
          isFailed: false
        });
    else
      yield put({
        type: actions.DELETE_FAVOURITE,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* getFavourites({ api_token }) {
  try {
    let res = yield call(() =>
      axios.get(`/api/web/favourites?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: actions.GET_FAVOURITES,
        payload: res.data.data,
        isFailed: false
      });
    else
      yield put({
        type: actions.GET_FAVOURITES,
        payload: res.data.errors,
        isFailed: true
      });
  } catch (err) {
    console.log(err);
  }
}

function* submitOrder({ api_token, data }) {
  const obj = { api_token: api_token, products: data };
  try {
    let result = yield call(() => axios.post("/api/web/submit_order", obj));
    if (!result.data.isFailed) {
      alert(result.data.data.success);
    } else {
      put({
        type: actions.SUBMIT_MEDICATION_ORDER_FAILED,
        payload: result.data.errors
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getOrders({ api_token }) {
  try {
    let result = yield call(() =>
      axios.get(`/api/web/orders?api_token=${api_token}`)
    );
    if (!result.data.isFailed) {
      yield put({
        type: actions.RECIEVE_ORDERS,
        payload: result.data.data.orders,
        isFailed: false
      });
      console.log(result.data);
    } else
      yield put({
        type: actions.RECIEVE_ORDERS,
        payload: result.data.errors,
        isFailed: true
      });
  } catch (e) {
    console.log(e);
  }
}

export default function* watchMedications() {
  yield takeEvery(actions.REQUEST_MEDICATIONS, getMedications);
  yield takeEvery(actions.SEARCH_MEDICATIONS, getMedicationsSearch);
  yield takeEvery(actions.REQUEST_MEDICATION, getMedication);
  yield takeEvery(actions.SAGA_ADD_FAVOURITE, postAddFavourite);
  yield takeEvery(actions.SAGA_DELETE_FAVOURITE, postDeleteFavourite);
  yield takeEvery(actions.SAGA_GET_FAVOURITES, getFavourites);
  yield takeEvery(actions.SUBMIT_MEDICATION_ORDER, submitOrder);
  yield takeEvery(actions.REQUEST_ORDERS, getOrders);
}
