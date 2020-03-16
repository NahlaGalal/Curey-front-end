import {
  GET_CITIES,
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_PRESCRIPTION,
  ADD_PRESCRIPTION,
  DELETE_PRESCRIPTIONS
} from "../actions/types";

export function user(state = [], action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload
      };
    case SIGNUP_USER:
      return {
        ...state,
        success: !action.isFailed ? action.payload : "",
        errors: action.isFailed ? action.payload : {}
      };
    case LOGIN_USER:
      return {
        ...state,
        api_token: !action.isFailed ? action.payload.api_token : "",
        full_name: !action.isFailed ? action.payload.full_name : "",
        image: !action.isFailed ? action.payload.image : null,
        email: !action.isFailed ? action.payload.email : "",
        errors: action.isFailed ? action.payload : {}
      };
    case LOGOUT_USER:
      return {
        ...state,
        api_token: !action.isFailed ? "" : state.api_token,
        full_name: !action.isFailed ? "" : state.full_name,
        image: !action.isFailed ? "" : state.image,
        email: !action.isFailed ? "" : state.email
      };
    case GET_PRESCRIPTION:
      return {
        ...state,
        prescriptions: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : []
      };
    case ADD_PRESCRIPTION:
    case DELETE_PRESCRIPTIONS:
      return {
        ...state,
        errors: action.isFailed ? action.payload : []
      };
    default:
      return state;
  }
}
