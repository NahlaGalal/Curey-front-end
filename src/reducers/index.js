import { combineReducers } from "redux";
import { prescription } from "./prescriptionReducer";
import { user } from "./userReducer";
import { doctors } from "./getDoctorsReducer";
import { homeData } from "./homeDataReducer";
import { medicationsData } from "./getMedicationsReducer";
import { appointments } from "./appointmentsReducer";
import { pharmacyData } from "./pharmacyReducer"

export default combineReducers({
  prescription,
  user,
  doctors,
  homeData,
  medicationsData,
  appointments,
  pharmacyData
});
