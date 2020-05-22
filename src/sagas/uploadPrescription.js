import { put, takeEvery, call } from "redux-saga/effects";
import axios from "../util/prescriptionInstance";
import { SCAN_PRESCRIPTION, SCAN_IMAGE } from "../actions/types";

function* scanPrescription({ file, history }) {
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
    history.push("/error500");
  }
}

export default function* watchScanPrescription() {
  yield takeEvery(SCAN_PRESCRIPTION, scanPrescription);
}
