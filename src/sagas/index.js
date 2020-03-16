import { all } from "redux-saga/effects";
import watchScanPrescription from "./uploadPrescription";
import watchUserRegisteration from "./userRegisterSaga";
import watchDoctors from "./getDoctorsSaga";
import watchHomeData from "./homeData";
import watchMedications from "./medicationsPage";

export default function* rootSaga() {
  yield all([
    watchScanPrescription(),
    watchUserRegisteration(),
    watchDoctors(),
    watchHomeData(),
    watchMedications(),
  ]);
}
