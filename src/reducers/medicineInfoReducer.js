import * as actions from "../actions/types";

export function medicationInfo(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_MEDICATION:
      return {
        ...state,
        product: !action.isFailed ? action.payload.product : [],
        pharmacies: !action.isFailed ? [...action.payload.pharmacies] : []
      };
    default:
      return state;
  }
}
