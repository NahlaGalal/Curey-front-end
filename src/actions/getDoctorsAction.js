import {
  SAGA_GET_DOCTORS,
  SAGA_SEARCH_DOCTORS,
  SAGA_GET_DOCTOR
} from "./types";

export const getAllDoctors = api_token => ({
  type: SAGA_GET_DOCTORS,
  api_token
});

export const getDoctorsSearch = ({ search, api_token }) => ({
  type: SAGA_SEARCH_DOCTORS,
  search,
  api_token
});

export const getDoctorData = ({ id, api_token }) => ({
  type: SAGA_GET_DOCTOR,
  id,
  api_token
});
