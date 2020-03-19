import {
  GET_DOCTORS,
  SEARCH_DOCTORS,
  GET_DOCTOR,
  CALL_UP_DOCTOR,
  BOOK_WITHOUT_CALL_UP
} from "../actions/types";

export const doctors = (state = {}, action) => {
  switch (action.type) {
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
        doctorData: !action.isFailed
          ? {
              ...state.doctorData,
              ...action.payload.doctor,
              reviews: action.payload.reviews
            }
          : {},
        errors: action.isFailed ? action.payload : []
      };
    case CALL_UP_DOCTOR:
      return {
        ...state,
        doctorData: {
          ...state.doctorData,
          is_callup: 1
        }
      };
    case BOOK_WITHOUT_CALL_UP:
      return {
        ...state,
        doctorData: {
          ...state.doctorData,
          is_callup: 0
        }
      };
    default:
      return state;
  }
};
