import * as actions from "../actions/types";

let products, index;

export function medicationsData(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_MEDICATIONS:
      return {
        ...state,
        products: !action.isFailed
          ? [
              ...state.products,
              ...action.payload.products.map((product) => ({
                ...product,
                image: `https://curey-backend.herokuapp.com/${product.image}`,
              })),
            ]
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
            ? [
                ...state.medicationsSearch,
                ...action.payload.products.map((product) => ({
                  ...product,
                  image: `https://curey-backend.herokuapp.com/${product.image}`,
                })),
              ]
            : [
                ...action.payload.products.map((product) => ({
                  ...product,
                  image: `https://curey-backend.herokuapp.com/${product.image}`,
                })),
              ]
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
          product: !action.isFailed
            ? {
                ...action.payload.product,
                image: `https://curey-backend.herokuapp.com/${action.payload.product.image}`,
              }
            : [],
          pharmacies: !action.isFailed
            ? [
                ...action.payload.pharmacies.map((pharmacy) => ({
                  ...pharmacy,
                  image: `https://curey-backend.herokuapp.com/${pharmacy.image}`,
                })),
              ]
            : [],
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
        medicationsSaved: !action.isFailed
          ? [
              ...action.payload.map((medication) => ({
                ...medication,
                image: `https://curey-backend.herokuapp.com/${medication.image}`,
              })),
            ]
          : [],
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
        products:
          !action.isFailed
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
        medicationsSearch:
          !action.isFailed
            ? Object.assign([], products, {
                [index]: {
                  ...products[index],
                  is_favourite: !products[index].is_favourite,
                },
              })
            : [...state.medicationsSearch],
        keywords: !action.isFailed ? state.keywords : [],
        medicationsDone: !action.isFailed && state.medicationsSearch.length < 8 ? true : false,
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
        orders: !action.isFailed
          ? [
              ...action.payload.map((order) => ({
                ...order,
                image: `https://curey-backend.herokuapp.com/${order.image}`,
              })),
            ]
          : [],
        errors: action.isFailed ? [action.payload] : [],
      };
    default:
      return state;
  }
}
