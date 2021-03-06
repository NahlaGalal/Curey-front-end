import axios from "../util/axiosInstance";
import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions/types";

function* getMedications({ api_token, skip, limit, history }) {
  try {
    let result = yield call(() =>
      axios.get(
        `/api/web/medications?api_token=${api_token}&skip=${skip}&limit=${limit}`
      )
    );
    if (!result.data.isFailed) {
      yield put({
        type: actions.RECIEVE_MEDICATIONS,
        payload: result.data.data,
        isFailed: false,
      });
    } else
      yield put({
        type: actions.RECIEVE_MEDICATIONS,
        payload: result.data.errors,
        isFailed: true,
      });
  } catch (e) {
    history.push("/error500");
  }
}

function* getMedicationsSearch({
  search,
  api_token,
  skip,
  limit,
  keywords,
  history,
}) {
  try {
    let res;
    if (keywords.length) {
      res = yield call(() =>
        axios.get(`/api/web/medications/search`, {
          params: {
            name: search,
            api_token,
            skip,
            limit,
            keywords,
          },
        })
      );
    } else {
      res = yield call(() =>
        axios.get(`/api/web/medications/search`, {
          params: {
            name: search,
            api_token,
            skip,
            limit,
          },
        })
      );
    }
    if (!res.data.isFailed) {
      yield put({
        type: actions.RECIEVE_SEARCH_MEDICATIONS,
        payload: res.data.data,
        skip,
        isFailed: false,
      });
    } else
      yield put({
        type: actions.RECIEVE_SEARCH_MEDICATIONS,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getMedication({ api_token, id, history }) {
  try {
    let result = yield call(() =>
      axios.get(`/api/web/medication?api_token=${api_token}&id=${id}`)
    );
    if (!result.data.isFailed) {
      yield put({
        type: actions.RECIEVE_MEDICATION,
        payload: result.data.data,
        isFailed: false,
      });
    } else
      yield put({
        type: actions.RECIEVE_MEDICATION,
        payload: result.data.errors,
        isFailed: true,
      });
  } catch (e) {
    history.push("/error500");
  }
}

function* postAddFavourite({ data, source, history }) {
  try {
    let res = yield call(() => axios.post("/api/web/add_favourites", data));
    if (!res.data.isFailed)
      if (source === "MedicationPage")
        yield put({
          type: actions.REQUEST_MEDICATION,
          id: data.product_id,
          api_token: data.api_token,
          isFailed: false,
        });
      else if (source === "MedicationsPage")
        yield put({
          type: actions.RELOAD_MEDICATIONS,
          product_id: data.product_id,
          isFailed: false,
        });
      else if (source === "MedicationsSearch")
        yield put({
          type: actions.RELOAD_SEARCH_MEDICATIONS,
          product_id: data.product_id,
          isFailed: false,
        });
      else
        yield put({
          type: actions.RELOAD_HOME_MEDICATIONS,
          product_id: data.product_id,
          isFailed: false,
        });
    else
      yield put({
        type: actions.ADD_FAVOURITE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* postDeleteFavourite({ data, source, history }) {
  try {
    let res = yield call(() => axios.post("/api/web/delete_favourites", data));
    if (!res.data.isFailed)
      if (source === "SavePage")
        yield put({
          type: actions.SAGA_GET_FAVOURITES,
          api_token: data.api_token,
          isFailed: false,
        });
      else if (source === "MedicationPage")
        yield put({
          type: actions.REQUEST_MEDICATION,
          id: data.product_id,
          api_token: data.api_token,
          isFailed: false,
        });
      else if (source === "MedicationsPage")
        yield put({
          type: actions.RELOAD_MEDICATIONS,
          product_id: data.product_id,
          isFailed: false,
        });
      else if (source === "MedicationsSearch")
        yield put({
          type: actions.RELOAD_SEARCH_MEDICATIONS,
          product_id: data.product_id,
          isFailed: false,
        });
      else
        yield put({
          type: actions.RELOAD_HOME_MEDICATIONS,
          product_id: data.product_id,
          isFailed: false,
        });
    else
      yield put({
        type: actions.DELETE_FAVOURITE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* getFavourites({ api_token, history }) {
  try {
    let res = yield call(() =>
      axios.get(`/api/web/favourites?api_token=${api_token}`)
    );
    if (!res.data.isFailed)
      yield put({
        type: actions.GET_FAVOURITES,
        payload: res.data.data,
        isFailed: false,
      });
    else
      yield put({
        type: actions.GET_FAVOURITES,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (err) {
    history.push("/error500");
  }
}

function* submitOrder({
  api_token,
  address,
  permenant,
  products,
  notificationData,
  history,
}) {
  let obj = { api_token, products };
  if (address) obj = { api_token, products, permenant, address };
  let notification = {};
  if (notificationData.order)
    notification = {
      read: false,
      time: Date.now(),
      order: 1,
      medicationName: notificationData.medicationName,
      medicationImage: notificationData.medicationImage,
      pharmacy: notificationData.pharmacy,
    };
  else
    notification = {
      read: false,
      time: Date.now(),
      order: 0,
    };
  try {
    let result = yield call(() => axios.post("/api/web/submit_order", obj));
    if (!result.data.isFailed) {
      yield put({
        type: actions.ADD_NOTIFICATION,
        notification,
      });
    } else {
      yield put({
        type: actions.SUBMIT_MEDICATION_ORDER_FAILED,
        payload: result.data.errors,
      });
    }
  } catch (e) {
    history.push("/error500");
  }
}

function* getOrders({ api_token, history }) {
  try {
    let result = yield call(() =>
      axios.get(`/api/web/orders?api_token=${api_token}`)
    );
    if (!result.data.isFailed) {
      yield put({
        type: actions.RECIEVE_ORDERS,
        payload: result.data.data.orders,
        isFailed: false,
      });
    } else
      yield put({
        type: actions.RECIEVE_ORDERS,
        payload: result.data.errors,
        isFailed: true,
      });
  } catch (e) {
    history.push("/error500");
  }
}

function* cancelOrder({ api_token, order_id, history }) {
  const data = { api_token, order_id };
  try {
    let result = yield call(() => axios.post(`/api/web/cancel_order`, data));
    if (!result.data.isFailed) {
      yield put({
        type: actions.REQUEST_ORDERS,
        api_token,
      });
    } else {
      yield put({
        type: actions.CANCEL_ORDER,
        payload: result.data.errors,
        isFailed: true,
      });
    }
  } catch (e) {
    history.push("/error500");
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
  yield takeEvery(actions.SAGA_CANCEL_ORDER, cancelOrder);
}
