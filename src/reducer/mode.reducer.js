import { SWITCH_MODE } from "../constant/redux.constant";

const DEFAULT_STATE = 'user';

function userReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SWITCH_MODE:
            return action.mode;
        default:
            return state;
    }
}

export default userReducer;