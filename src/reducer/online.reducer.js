import { SET_ONLINE } from "../constant/redux.constant";

const DEFAULT_STATE = [];

function onlineReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_ONLINE:
            return action.payload;
        default:
            return state;
    }
}

export default onlineReducer;