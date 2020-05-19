import {
  GET_MEDICATIONS,
  GET_PACKING,
  MOVE_TO_DELIVERY,
  GET_DASHBOARD,
  GET_REQUESTS,
  ACCEPT_REQUEST,
} from "../actions/types";

export function pharmacyData(state = {}, action) {
  switch (action.type) {
    case GET_MEDICATIONS:
      return {
        ...state,
        medications: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case GET_PACKING:
      return {
        ...state,
        packing: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case MOVE_TO_DELIVERY:
    case ACCEPT_REQUEST:
      return {
        ...state,
        errors: action.isFailed ? action.payload : [],
      };
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case GET_REQUESTS:
      return {
        ...state,
        requests: !action.isFailed ? action.payload : [],
        errors: action.isFailed
          ? action.payload
          : !action.payload.length
          ? { error: "No requests yet" }
          : [],
      };
    default:
      return state;
  }
}
