import * as actions from "../actions/types";

export function appointments(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_APPOINTMENTS:
      return {
        ...state,
        appointments: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : []
      };
    default:
      return state;
  }
}
