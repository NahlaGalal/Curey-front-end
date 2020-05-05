import { takeEvery, put, call } from "redux-saga/effects";
import axios from "../util/axiosInstance";
import { SAGA_GET_PROFILE, GET_PROFILE } from "../actions/types";

function* getProfile({ api_token }) {
  try {
    let res = yield call(() =>
      axios.get(`/api/web/profile?api_token=${api_token}`)
    );
    console.log(res)
    if (!res.data.isFailed) {
      yield put({
        type: GET_PROFILE,
        payload: res.data.data,
        isFailed: false,
      });
    } else
      yield put({
        type: GET_PROFILE,
        payload: res.data.errors,
        isFailed: true,
      });
  } catch (e) {
    console.log(e);
  }
}

export default function* watchProfile() {
  yield takeEvery(SAGA_GET_PROFILE, getProfile);
}
