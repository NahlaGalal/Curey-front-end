import * as actions from "../actions/types";

export function homeData(state = {}, action) {
  switch (action.type) {
    case actions.RECIEVE_HOME_DATA:
      return {
        ...state,
        top_doctors: !action.isFailed
          ? action.payload.top_doctors.map((doctor) => ({
              ...doctor,
              image: `https://curey-backend.herokuapp.com/${doctor.image}`,
            }))
          : [],
        top_products: !action.isFailed
          ? action.payload.top_products.map((product) => ({
              ...product,
              image: `https://curey-backend.herokuapp.com/${product.image}`,
            }))
          : [],
        errors: action.isFailed ? action.payload : [],
      };
    default:
      return state;
  }
}
