import { all } from "redux-saga/effects";
import watchScanPrescription from './uploadPrescription';
import watchUserRegisteration from './userRegisterSaga';

export default function* rootSaga() {
  yield all([watchScanPrescription(), watchUserRegisteration()]);
}
