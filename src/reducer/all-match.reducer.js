import { SET_ALL_JOINED_MATCH_LOADING, SET_ALL_JOINED_MATCH } from "../constant/redux.constant";

const DEFAULT_STATE = {
    loading: false,
    list: [1]
};

function allMatchReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_ALL_JOINED_MATCH:
            return { ...state, list: action.payload };
        case SET_ALL_JOINED_MATCH_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default allMatchReducer;