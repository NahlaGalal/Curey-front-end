import * as actions from "../actions/types";

export function doctorDashboard(state = {}, action) {
  switch (action.type) {
    case actions.GET_DOCTOR_STATEMENT:
      return {
        ...state,
        statement: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case actions.GET_DOCTOR_REQUESTS:
      return {
        ...state,
        requests: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    default:
      return {
        ...state,
      };
  }
}
