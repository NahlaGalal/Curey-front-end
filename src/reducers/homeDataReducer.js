import * as actions from "../actions/types";

export function homeData(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_HOME_DATA:
      return {
        ...state,
        top_doctors: !action.isFailed ? action.payload.top_doctors : [],
        top_medications: !action.isFailed ? action.payload.top_medications : [],
        errors: action.isFailed ? action.payload : []
      };
    default:
      return state;
  }
}
