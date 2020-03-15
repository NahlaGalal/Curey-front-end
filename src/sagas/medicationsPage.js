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

export default function* watchMedications() {
  yield takeEvery(actions.REQUEST_MEDICATIONS, getMedications);
}
