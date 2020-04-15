import axios from "../util/axiosInstance";
import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions/types";

function* getHomeData({ api_token }) {
  try {
    let result = yield call(() =>
      axios.get(`/api/web/home?api_token=${api_token}`)
    );
    if (!result.data.isFailed)
      yield put({
        type: actions.RECIEVE_HOME_DATA,
        payload: result.data.data,
        isFailed: false
      });
    else
      yield put({
        type: actions.RECIEVE_HOME_DATA,
        payload: result.data.errors,
        isFailed: true
      });
  } catch (e) {
    console.log(e);
  }
}

export default function* watchHomeData() {
  yield takeEvery(actions.REQUEST_HOME_DATA, getHomeData);
}
