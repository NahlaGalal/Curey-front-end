import {
  GET_CITIES,
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_PRESCRIPTION,
  ADD_PRESCRIPTION,
  DELETE_PRESCRIPTIONS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_NOTIFICATION,
  READ_NOTIFICATION,
  SHOW_CART,
  GET_PROFILE,
  RECIEVE_HOME_DATA,
} from "../actions/types";

export function user(state = [], action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case SIGNUP_USER:
      return {
        ...state,
        success: !action.isFailed ? action.payload : "",
        errors: action.isFailed ? action.payload : {},
      };
    case LOGIN_USER:
      return {
        ...state,
        api_token: !action.isFailed ? action.payload.api_token : "",
        full_name: !action.isFailed ? action.payload.full_name : "",
        image: !action.isFailed ? action.payload.image : null,
        email: !action.isFailed ? action.payload.email : "",
        role: !action.isFailed ? action.payload.role : null,
        is_complete: !action.isFailed ? action.payload.is_complete || 0 : 0,
        cart: [],
        errors: action.isFailed ? action.payload : {},
      };
    case RECIEVE_HOME_DATA:
      return {
        ...state,
        name: !action.isFailed ? action.payload.user_data.name : "",
        image: !action.isFailed ? action.payload.user_data.image : "",
      };
    case LOGOUT_USER:
      return {
        ...state,
        api_token: !action.isFailed ? "" : state.api_token,
        full_name: !action.isFailed ? "" : state.full_name,
        image: !action.isFailed ? "" : state.image,
        email: !action.isFailed ? "" : state.email,
        role: !action.isFailed ? "" : state.role,
        success: "",
      };
    case GET_PRESCRIPTION:
      return {
        ...state,
        prescriptions: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case ADD_PRESCRIPTION:
    case DELETE_PRESCRIPTIONS:
      return {
        ...state,
        errors: action.isFailed ? action.payload : [],
      };
    case ADD_TO_CART:
      return {
        ...state,
        success: !action.isFailed ? action.payload.success : "",
        errors: action.isFailed ? action.payload : [],
      };
    case SHOW_CART:
      return {
        ...state,
        cart: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        errors: action.isFailed ? action.payload : [],
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    case READ_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications,
      };
    case GET_PROFILE:
      let doctorData = {};
      if (!action.isFailed && action.payload.profile.role === 3) {
        doctorData = {
          callup: !action.isFailed ? action.payload.profile.callup : false,
          callup_fees: !action.isFailed
            ? action.payload.profile.callup_fees
            : 0,
          degrees: !action.isFailed ? action.payload.profile.degrees : [],
          duration: !action.isFailed ? action.payload.profile.duration : 0,
          fees: !action.isFailed ? action.payload.profile.fees : 0,
          speciality: !action.isFailed ? action.payload.profile.speciality : "",
        };
      }
      return {
        ...state,
        full_name: !action.isFailed ? action.payload.profile.name : "",
        email: !action.isFailed ? action.payload.profile.email : "",
        image: !action.isFailed ? action.payload.profile.image : "",
        role: !action.isFailed ? action.payload.profile.role : null,
        address: !action.isFailed ? action.payload.profile.address : "",
        phone: !action.isFailed ? action.payload.profile.phone : "",
        cities: !action.isFailed ? action.payload.cities : state.cities,
        specialities: !action.isFailed ? action.payload.specialities : [],
        city_id: !action.isFailed ? action.payload.profile.city_id : 0,
        ...doctorData,
      };
    default:
      return state;
  }
}
