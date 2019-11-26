import { SET_USER, SET_AUTH_TOKEN, CLEAR_USER } from "../constant/redux.constant";

const DEFAULT_STATE = null;

function userReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.user };
        case SET_AUTH_TOKEN:
            return { ...state, token: action.token };
        case CLEAR_USER:
            return DEFAULT_STATE;
        default:
            return state;
    }
}

export default userReducer;