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
  CHANGE_HOME_VISIT,
} from "../actions/types";

export const doctorData = (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: !action.isFailed ? action.payload : [],
        errors: action.isFailed
          ? action.payload.length
            ? action.payload
            : { error: "No schedule yet" }
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
        statement: !action.isFailed
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
                  image: `https://curey-backend.herokuapp.com/${patient.image}`,
                  date,
                  time,
                };
              }),
            ]
          : [],
        errors: action.isFailed ? action.payload : [],
      };
    case GET_DOCTOR_REQUESTS:
      return {
        ...state,
        requests: !action.isFailed
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
                  image: `https://curey-backend.herokuapp.com/${patient.image}`,
                  date,
                  time,
                };
              }),
            ]
          : [],
        errors: action.isFailed ? action.payload : [],
      };
    case GET_DOCTOR_REEXAMINATION:
      return {
        ...state,
        re_examinations: !action.isFailed
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
                  image: `https://curey-backend.herokuapp.com/${patient.image}`,
                  date,
                  time,
                };
              }),
            ]
          : [],
        errors: action.isFailed ? action.payload : [],
      };
    case GET_DOCTOR_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: !action.isFailed
          ? [
              ...action.payload.map((prescription) => {
                return {
                  ...prescription,
                  image: `https://curey-backend.herokuapp.com/${prescription.image}`,
                  details: [
                    ...prescription.details.map((detail) => ({
                      ...detail,
                      image: `https://curey-backend.herokuapp.com/${detail.image}`,
                    })),
                  ],
                };
              }),
            ]
          : [],
        errors: action.isFailed ? action.payload : [],
      };
    case CHANGE_HOME_VISIT:
      return {
        ...state,
        is_callup: !action.isFailed ? true : false,
        errors: action.isFailed ? action.payload : []
      }
    default:
      return state;
  }
};
