import * as actions from "../actions/types";

export function medicationsData(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_MEDICATIONS:
      return {
        ...state,
        products: !action.isFailed ? action.payload.products : [],
        keywords: !action.isFailed ? action.payload.keywords : [],
        errors: action.isFailed ? action.payload : []
      };
    default:
      return state;
  }
}
