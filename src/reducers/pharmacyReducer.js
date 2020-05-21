import {
  GET_MEDICATIONS,
  GET_PACKING,
  MOVE_TO_DELIVERY,
  GET_DASHBOARD,
  GET_REQUESTS,
  ACCEPT_REQUEST,
  COMPLETE_PHARM_SIGNUP
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
        errors: action.isFailed
          ? action.payload
          : !action.payload.length
          ? { error: "No requests yet" }
          : [],
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
        errors: action.isFailed
          ? action.payload
          : !action.payload.performed.length
          ? { error: "No requests yet" }
          : [],
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
    case COMPLETE_PHARM_SIGNUP:
      return {
        ...state,
        success: !action.isFailed ? action.payload.success : "",
        errors: action.isFailed ? action.payload : []
      }
    default:
      return state;
  }
}
