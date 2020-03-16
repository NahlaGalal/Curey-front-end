import { all } from "redux-saga/effects";
import watchScanPrescription from "./uploadPrescription";
import watchUser from "./userSaga";
import watchDoctors from "./getDoctorsSaga";
import watchHomeData from "./homeData";

export default function* rootSaga() {
  yield all([
    watchScanPrescription(),
    watchUser(),
    watchDoctors(),
    watchHomeData()
  ]);
}
