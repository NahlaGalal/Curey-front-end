import { SAGA_SIGNUP_USER, SAGA_GET_CITIES, SAGA_LOGIN_USER, SAGA_LOGOUT_USER } from "./types";

export const postSignup = data => ({ type: SAGA_SIGNUP_USER, data });

export const getCities = () => ({ type: SAGA_GET_CITIES });

export const postLogin = data => ({ type: SAGA_LOGIN_USER, data });

export const postLogout = api_token => ({ type: SAGA_LOGOUT_USER, api_token });