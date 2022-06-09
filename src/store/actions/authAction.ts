import { SET_AUTH_USER, UNSET_AUTH_USER } from "./actionTypes";

export const setAuthUser = (username: string) => ({ type: SET_AUTH_USER, payload: username });
export const unsetAuthUser = () => ({ type: UNSET_AUTH_USER });
