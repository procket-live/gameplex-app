import { SET_BATTLE, SET_BATTLE_LOADING } from "../constant/redux.constant";

const DEFAULT_STATE = {
    loading: false,
    list: [1]
};

function battleReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_BATTLE:
            return { ...state, list: action.payload };
        case SET_BATTLE_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default battleReducer;