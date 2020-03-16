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
      console.log(res.data);
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

export default function* watchMedications() {
  yield takeEvery(actions.REQUEST_MEDICATIONS, getMedications);
  yield takeEvery(actions.SEARCH_MEDICATIONS, getMedicationsSearch);
}
