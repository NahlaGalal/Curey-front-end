import { all } from "redux-saga/effects";
import watchScanPrescription from "./uploadPrescription";
import watchUserRegisteration from "./userRegisterSaga";
import watchHomeData from "./homeData";

export default function* rootSaga() {
  yield all([
    watchScanPrescription(),
    watchUserRegisteration(),
    watchHomeData()
  ]);
}
