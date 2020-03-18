import { SET_ORGANIZER } from "../constant/redux.constant";

const DEFAULT_STATE = null;

function organizerReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_ORGANIZER:
      return action.payload;
    default:
      return state;
  }
}

export default organizerReducer;