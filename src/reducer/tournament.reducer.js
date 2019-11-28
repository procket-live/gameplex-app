import { SET_TOURNAMENTS, SET_TOURNAMENTS_LOADING } from "../constant/redux.constant";

const DEFAULT_STATE = {
    loading: false,
    list: [1, 2, 3, 4]
};

function tournamentReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_TOURNAMENTS:
            return { ...state, list: action.payload };
        case SET_TOURNAMENTS_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default tournamentReducer;