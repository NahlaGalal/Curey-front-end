import { combineReducers } from "redux";
import { prescription } from "./prescriptionReducer";
import { user } from './userRegisterReducer';

export default combineReducers({ prescription, user });
