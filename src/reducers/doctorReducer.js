import { GET_SCHEDULE, ADD_SCHEDULE, EDIT_SCHEDULE, SET_RE_EXAMINATION, SEND_PRESCRIPTION } from "../actions/types";

export const doctorData = (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: !action.isFailed ? action.payload : [],
        errors: action.isFailed
          ? action.payload.length ? action.payload : { error: "No schedule yet" }
          : [],
      };
    case ADD_SCHEDULE:
    case EDIT_SCHEDULE:
    case SET_RE_EXAMINATION:
    case SEND_PRESCRIPTION:
      return {
        ...state,
        errors: action.isFailed ? action.payload : [],
      };
    default:
      return state;
  }
};
