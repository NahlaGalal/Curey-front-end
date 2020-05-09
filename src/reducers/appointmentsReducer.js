import * as actions from "../actions/types";

export function appointments(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_APPOINTMENTS:
      return {
        ...state,
        appointments: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case actions.BOOK_APPOINTMENT_RES:
      return {
        ...state,
        success: !action.isFailed ? action.payload.success : "",
        errors: action.isFailed ? action.payload : [],
      };
    case actions.BOOK_APPOINTMENT:
      return {
        ...state,
        success: "",
        errors: "",
      };
    default:
      return state;
  }
}
