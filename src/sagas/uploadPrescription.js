import { put, takeEvery, call } from "redux-saga/effects";
import axios from "../util/prescriptionInstance";
import { SCAN_PRESCRIPTION, SCAN_IMAGE } from "../actions/types";

function* scanPrescription({ file }) {
  try {
    const res = yield call(() =>
      axios.post("ai", file, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json"
        }
      })
    );
    yield put({ type: SCAN_IMAGE, payload: res.data });
  } catch (err) {
    yield console.log(err);
  }
}

export default function* watchScanPrescription(file) {
  yield takeEvery(SCAN_PRESCRIPTION, scanPrescription);
}
