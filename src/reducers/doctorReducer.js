import {
  GET_SCHEDULE,
  ADD_SCHEDULE,
  EDIT_SCHEDULE,
  SET_RE_EXAMINATION,
  SEND_PRESCRIPTION,
  GET_DOCTOR_PRESCRIPTIONS,
  GET_DOCTOR_REEXAMINATION,
  GET_DOCTOR_REQUESTS,
  GET_DOCTOR_STATEMENT,
  SEARCH_MEDICATION,
  COMPLETE_DOCTOR_SIGNUP,
} from "../actions/types";

export const doctorData = (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule:
          !action.isFailed && action.payload.length ? action.payload : [],
        errors: action.isFailed
          ? action.payload
          : !action.payload.length
          ? { error: "No schedule yet" }
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
    case GET_DOCTOR_STATEMENT:
      return {
        ...state,
        statement:
          !action.isFailed && action.payload.performed[0] !== "empty"
            ? [
                ...action.payload.performed.map((patient) => {
                  let time = new Date(patient.timestamp)
                    .toLocaleTimeString()
                    .split(" ");
                  time[0] = time[0].slice(0, -3);
                  time = time.join(" ");
                  let date = new Date(patient.timestamp)
                    .toDateString()
                    .split(" ");
                  date[2] = `${date[2]},`;
                  date = date.slice(1).join(" ");
                  return {
                    ...patient,
                    date,
                    time,
                  };
                }),
              ]
            : [],
        reviews: {
          number: !action.isFailed ? action.payload.doctor.no_reviews : 0,
          total: !action.isFailed ? action.payload.doctor.rating : 0,
        },
        errors: action.isFailed
          ? action.payload
          : action.payload.performed[0] === "empty"
          ? { error: "You don't have any requests yet" }
          : [],
      };
    case GET_DOCTOR_REQUESTS:
      return {
        ...state,
        requests:
          !action.isFailed && action.payload.length
            ? [
                ...action.payload.map((patient) => {
                  let time = new Date(patient.timestamp)
                    .toLocaleTimeString()
                    .split(" ");
                  time[0] = time[0].slice(0, -3);
                  time = time.join(" ");
                  let date = new Date(patient.timestamp)
                    .toDateString()
                    .split(" ");
                  date[2] = `${date[2]},`;
                  date = date.slice(1).join(" ");
                  return {
                    ...patient,
                    date,
                    time,
                  };
                }),
              ]
            : [],
        errors: action.isFailed
          ? action.payload
          : !action.payload.length
          ? { error: "You don't have any requests yet" }
          : [],
      };
    case GET_DOCTOR_REEXAMINATION:
      return {
        ...state,
        re_examinations:
          !action.isFailed && action.payload.length
            ? [
                ...action.payload.map((patient) => {
                  let time = new Date(patient.timestamp)
                    .toLocaleTimeString()
                    .split(" ");
                  time[0] = time[0].slice(0, -3);
                  time = time.join(" ");
                  let date = new Date(patient.timestamp)
                    .toDateString()
                    .split(" ");
                  date[2] = `${date[2]},`;
                  date = date.slice(1).join(" ");
                  return {
                    ...patient,
                    date,
                    time,
                  };
                }),
              ]
            : [],
        errors: action.isFailed
          ? action.payload
          : !action.payload.length
          ? { error: "You don't have any re-examination requestd yet" }
          : [],
      };
    case GET_DOCTOR_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions:
          !action.isFailed && action.payload.length
            ? [
                ...action.payload.map((prescription) => {
                  return {
                    ...prescription,
                    details: [
                      ...prescription.details.map((detail) => ({
                        ...detail,
                      })),
                    ],
                  };
                }),
              ]
            : [],
        errors: action.isFailed
          ? action.payload
          : !action.payload.length
          ? { error: "You don't have any prescriptions yet" }
          : [],
      };
    case SEARCH_MEDICATION:
      return {
        ...state,
        searchMedication: !action.isFailed ? action.payload.products : [],
        errors: action.isFailed ? action.payload : []
      }
    case COMPLETE_DOCTOR_SIGNUP:
      return {
        ...state,
        success: !action.isFailed ? action.payload.success : "",
        errors: action.isFailed ? action.payload : [],
      };
    default:
      return state;
  }
};
