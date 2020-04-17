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
  SHOW_CART
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
        user_id: !action.isFailed ? action.payload.user_id : "",
        api_token: !action.isFailed ? action.payload.api_token : "",
        full_name: !action.isFailed ? action.payload.full_name : "",
        image: !action.isFailed
          ? `https://curey-backend.herokuapp.com/${action.payload.image}`
          : null,
        email: !action.isFailed ? action.payload.email : "",
        role: !action.isFailed ? action.payload.role : null,
        cart: [],
        errors: action.isFailed ? action.payload : {},
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
    case ADD_TO_CART:
      return {
        ...state,
        success: !action.isFailed ? action.payload.success : "",
        errors: action.isFailed ? action.payload : []
      };
    case SHOW_CART:
      return {
        ...state,
        cart: !action.isFailed
          ? [
              ...action.payload.map((medication) => ({
                ...medication,
                image: `https://curey-backend.herokuapp.com/${medication.image}`,
                pharmacy: {
                  ...medication.pharmacy,
                  image: `https://curey-backend.herokuapp.com/${medication.pharmacy.image}`,
                },
              })),
            ]
          : [],
        errors: action.isFailed ? action.payload : [],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        errors: action.isFailed ? action.payload : []
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.notification]
      };
    case READ_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications
      };
    default:
      return state;
  }
}
