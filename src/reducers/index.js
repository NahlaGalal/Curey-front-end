import { combineReducers } from "redux";
import { prescription } from "./prescriptionReducer";
import { user } from "./userRegisterReducer";
import { doctors } from "./getDoctorsReducer";
import { homeData } from "./homeDataReducer";
import { medicationsData } from "./getMedicationsReducer";

export default combineReducers({
  prescription,
  user,
  doctors,
  homeData,
  medicationsData
});
