import {GET_DOCTORS, SEARCH_DOCTORS, GET_DOCTOR} from "../actions/types";

export const doctors = (state={}, action) => {
  switch(action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        doctorsData: !action.isFailed ? action.payload.doctors : [],
        specialities: !action.isFailed ? action.payload.specialities : [],
        cities: !action.isFailed ? action.payload.cities : [],
        errors: action.isFailed ? action.payload : []
      };
    case SEARCH_DOCTORS:
      return {
        ...state,
        doctorsSearch: !action.isFailed ? action.payload.doctors : [],
        errors: action.isFailed ? action.payload : []
      };
    case GET_DOCTOR:
      return {
        ...state,
        doctorData: !action.isFailed ? {
          ...action.payload.doctor,
          reviews: action.payload.reviews
        } : {},
        errors: action.isFailed ? action.payload : []
      }
    default:
      return state;
  }
}