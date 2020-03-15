import { combineReducers } from "redux";
import { prescription } from "./prescriptionReducer";
import { user } from "./userRegisterReducer";
import { doctors } from "./getDoctorsReducer";

export default combineReducers({ prescription, user, doctors });
