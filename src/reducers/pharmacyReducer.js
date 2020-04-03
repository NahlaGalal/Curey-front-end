import { GET_MEDICATIONS, GET_PACKING, MOVE_TO_DELIVERY } from "../actions/types";

export function pharmacyData(state = {}, action) {
  switch (action.type) {
    case GET_MEDICATIONS:
      return {
        ...state,
        medications: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : []
      };
    case GET_PACKING:
      return {
        ...state,
        packing: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : []
      }
    case MOVE_TO_DELIVERY:
      return {
        ...state,
        errors: action.isFailed ? action.payload : []
      }
    default:
      return state;
  }
}
