import {
  GET_DOCTORS,
  SEARCH_DOCTORS,
  GET_DOCTOR,
  GET_DOCTOR_APPOINTMENTS,
} from "../actions/types";

export const doctors = (state = {}, action) => {
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        doctorsData: !action.isFailed
          ? [
              ...state.doctorsData,
              ...action.payload.doctors.map((doctor) => ({
                ...doctor,
                image: `https://curey-backend.herokuapp.com/${doctor.image}`,
              })),
            ]
          : [],
        specialities: !action.isFailed ? action.payload.specialities : [],
        cities: !action.isFailed ? action.payload.cities : [],
        doctorsDone:
          !action.isFailed && !action.payload.doctors.length < 8 ? true : false,
        errors: action.isFailed ? action.payload : [],
      };
    case SEARCH_DOCTORS:
      return {
        ...state,
        doctorsSearch: !action.isFailed
          ? [
              ...state.doctorsSearch,
              ...action.payload.doctors.map((doctor) => ({
                ...doctor,
                image: `https://curey-backend.herokuapp.com/${doctor.image}`,
              })),
            ]
          : [],
        doctorsDone:
          !action.isFailed && action.payload.doctors.length < 8 ? true : false,
        errors: action.isFailed ? action.payload : [],
      };
    case GET_DOCTOR:
      return {
        ...state,
        doctorData: !action.isFailed
          ? {
              ...state.doctorData,
              ...action.payload.doctor,
              image: `https://curey-backend.herokuapp.com/${action.payload.doctor.image}`,
              reviews: action.payload.reviews,
            }
          : {},
        errors: action.isFailed ? action.payload : [],
      };
    case GET_DOCTOR_APPOINTMENTS:
      return {
        ...state,
        doctorData: !action.isFailed
          ? {
              ...state.doctorData,
              appointments: {
                first_day: action.payload.first_day,
                second_day: action.payload.second_day,
              },
            }
          : {},
        errors: action.isFailed ? action.payload : [],
      };
    default:
      return state;
  }
};
