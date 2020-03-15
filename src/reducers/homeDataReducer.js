import * as actions from "../actions/types";

export function homeData(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_HOME_DATA:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
