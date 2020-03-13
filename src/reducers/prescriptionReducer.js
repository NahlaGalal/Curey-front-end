import { SCAN_IMAGE } from "../actions/types";

export function prescription(state = [], action) {
  switch (action.type) {
    case SCAN_IMAGE:
      return {
        ...state,
        medications: action.payload
      };
    default:
      return state;
  }
}
