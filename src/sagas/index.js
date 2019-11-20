import { all } from "redux-saga/effects";

function* start() {
  yield console.log("Start");
}

export default function* rootSaga() {
  yield all([start()]);
}
