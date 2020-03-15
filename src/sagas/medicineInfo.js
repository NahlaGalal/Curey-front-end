import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions/types";

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
      console.log(result.data.data);
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

export default function* watchMedicationPage() {
  yield takeEvery(actions.REQUEST_MEDICATION, getMedication);
}
