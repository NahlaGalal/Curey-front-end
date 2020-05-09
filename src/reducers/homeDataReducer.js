import * as actions from "../actions/types";

export function homeData(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_HOME_DATA:
      return {
        ...state,
        top_doctors: !action.isFailed ? action.payload.top_doctors : [],
        top_products: !action.isFailed ? action.payload.top_products : [],
        errors: action.isFailed ? action.payload : [],
      };
    case actions.RELOAD_HOME_MEDICATIONS:
      let products = [...state.top_products],
        index;
      if (!action.isFailed) {
        index = products.findIndex(
          (product) => product.id === action.product_id
        );
      }

      return {
        ...state,
        top_products: !action.isFailed
          ? Object.assign([], products, {
              [index]: {
                ...products[index],
                is_favourite: !products[index].is_favourite,
              },
            })
          : [],
        errors: action.isFailed ? action.payload : [],
      };
    default:
      return state;
  }
}
