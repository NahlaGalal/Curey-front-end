import { combineReducers } from "redux";
import { prescription } from "./prescriptionReducer";
import { user } from "./userRegisterReducer";
import { homeData } from "./homeDataReducer";

export default combineReducers({ prescription, user, homeData });
