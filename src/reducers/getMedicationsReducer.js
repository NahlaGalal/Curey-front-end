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
    case actions.RECIEVE_SEARCH_MEDICATIONS:
      return {
        ...state,
        medicationsSearch: !action.isFailed ? action.payload.products : [],
        errors: action.isFailed ? action.payload : []
      };
    case actions.RECIEVE_MEDICATION:
      return {
        ...state,
        medicationInfo: {
          ...state.medicationInfo,
          product: !action.isFailed ? action.payload.product : [],
          pharmacies: !action.isFailed ? [...action.payload.pharmacies] : []
        },
        errors: action.isFailed ? action.payload : []
      };
    case actions.ADD_FAVOURITE:
      return {
        ...state,
        errors: action.isFailed ? action.payload : []
      };
    case actions.DELETE_FAVOURITE:
      return {
        ...state,
        errors: action.isFailed ? action.payload : []
      };
    case actions.GET_FAVOURITES:
      return {
        ...state,
        medicationsSaved: !action.isFailed ? action.payload[0] : [],
        errors: action.isFailed ? action.payload : []
      };

    case actions.SUBMIT_MEDICATION_ORDER_FAILED:
      return {
        ...state,
        errors: action.payload
      };
    case actions.RECIEVE_ORDERS:
      return {
        ...state,
        orders: !action.isFailed ? [...action.payload] : [],
        errors: action.isFailed ? [action.payload] : []
      };

    default:
      return state;
  }
}
