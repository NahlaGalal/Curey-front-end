import { all } from "redux-saga/effects";
import watchScanPrescription from './uploadPrescription';

function* start() {
  yield console.log("Start");
}

export default function* rootSaga() {
  yield all([start(), watchScanPrescription()]);
}
