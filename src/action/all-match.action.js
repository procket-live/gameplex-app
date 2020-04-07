import { FETCH_ALL_JOINED_MATCH, SET_ALL_JOINED_MATCH } from "../constant/redux.constant";

export const fetchAllJoinedMatchAction = () => {
    return {
        type: FETCH_ALL_JOINED_MATCH
    }
}

export const setAllJoinedMatchAction = (payload) => {
    return {
        type: SET_ALL_JOINED_MATCH,
        payload
    }
}