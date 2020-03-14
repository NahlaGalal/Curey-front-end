import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions/types";

function* getHomeData() {
  try {
    let result = yield call(() =>
      axios.get(
        "/api/web/home?api_token=mWyMg2UhivzahRIYrNzFxwCt7xyBVjZWUPRxISk75cJvBb246tuN15WPRg3CcVlKjdRJJRbAerZ3gMil"
      )
    );
    console.log(result.data.data);
    yield put({ type: actions.RECIEVE_HOME_DATA, payload: result.data.data });
  } catch (e) {
    console.log(e);
  }
}

export default function* watchHomeData() {
  yield takeEvery(actions.REQUEST_HOME_DATA, getHomeData);
}
