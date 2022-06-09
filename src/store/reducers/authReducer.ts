
import { SET_AUTH_USER, UNSET_AUTH_USER } from "../actions/actionTypes";

const initialState = {
    user: null,
};

export default function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                user: action.payload,
            }
        case UNSET_AUTH_USER:
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}
