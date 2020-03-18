import { combineReducers } from 'redux';

import user from './user.reducer';
import mode from './mode.reducer';
import game from './game.reducer';
import tournament from './tournament.reducer';
import organizer from './organizer.reducer';

const rootReducer = combineReducers({
    user,
    mode,
    game,
    tournament,
    organizer,
});

export default rootReducer;