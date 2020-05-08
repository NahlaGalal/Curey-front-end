import * as actions from "../actions/types";

let products, index;

export function medicationsData(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_MEDICATIONS:
      return {
        ...state,
        products: !action.isFailed
          ? [...state.products, ...action.payload.products]
          : [],
        keywords: !action.isFailed ? action.payload.keywords : [],
        medicationsDone:
          !action.isFailed && action.payload.products.length < 8 ? true : false,
        errors: action.isFailed ? action.payload : [],
      };
    case actions.RECIEVE_SEARCH_MEDICATIONS:
      return {
        ...state,
        medicationsSearch: !action.isFailed
          ? action.skip
            ? [...state.medicationsSearch, ...action.payload.products]
            : [...action.payload.products]
          : [],
        medicationsDone:
          !action.isFailed && action.payload.products.length < 8 ? true : false,
        errors: action.isFailed ? action.payload : [],
      };
    case actions.RECIEVE_MEDICATION:
      return {
        ...state,
        medicationInfo: {
          ...state.medicationInfo,
          product: !action.isFailed ? action.payload.product : [],
          pharmacies: !action.isFailed ? action.payload.pharmacies : [],
        },
        errors: action.isFailed ? action.payload : [],
      };
    case actions.ADD_FAVOURITE:
      return {
        ...state,
        errors: action.isFailed ? action.payload : [],
      };
    case actions.DELETE_FAVOURITE:
      return {
        ...state,
        errors: action.isFailed ? action.payload : [],
      };
    case actions.GET_FAVOURITES:
      return {
        ...state,
        medicationsSaved: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? action.payload : [],
      };
    case actions.RELOAD_MEDICATIONS:
      products = [...state.products];
      if (!action.isFailed) {
        index = products.findIndex(
          (product) => product.id === action.product_id
        );
      }

      return {
        ...state,
        products: !action.isFailed
          ? Object.assign([], products, {
              [index]: {
                ...products[index],
                is_favourite: !products[index].is_favourite,
              },
            })
          : [...state.products],
        keywords: !action.isFailed ? state.keywords : [],
        medicationsDone: !action.isFailed && products.length < 8 ? true : false,
        errors: action.isFailed ? action.payload : [],
      };
    case actions.RELOAD_SEARCH_MEDICATIONS:
      products = [...state.medicationsSearch];
      if (!action.isFailed) {
        index = products.findIndex(
          (product) => product.id === action.product_id
        );
      }

      return {
        ...state,
        medicationsSearch: !action.isFailed
          ? Object.assign([], products, {
              [index]: {
                ...products[index],
                is_favourite: !products[index].is_favourite,
              },
            })
          : [...state.medicationsSearch],
        keywords: !action.isFailed ? state.keywords : [],
        medicationsDone:
          !action.isFailed && state.medicationsSearch.length < 8 ? true : false,
        errors: action.isFailed ? action.payload : [],
      };
    case actions.SUBMIT_MEDICATION_ORDER_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
    case actions.RECIEVE_ORDERS:
      return {
        ...state,
        orders: !action.isFailed ? action.payload : [],
        errors: action.isFailed ? [action.payload] : [],
      };
    case actions.CANCEL_ORDER:
      return {
        ...state,
        errors: action.isFailed ? action.payload : []
      }
    default:
      return state;
  }
}
