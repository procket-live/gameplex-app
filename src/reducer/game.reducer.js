import { SET_GAMES, SET_GAMES_LOADING } from "../constant/redux.constant";

const DEFAULT_STATE = {
    loading: false,
    list: [1, 2, 3, 4]
};

function gameReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_GAMES:
            return { ...state, list: action.payload };
        case SET_GAMES_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default gameReducer;