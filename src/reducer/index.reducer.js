import { combineReducers } from 'redux';

import user from './user.reducer';
import mode from './mode.reducer';
import game from './game.reducer';
import tournament from './tournament.reducer';
import organizer from './organizer.reducer';
import battle from './battle.reducer';
import allJoinedMatch from './all-match.reducer';
import online from './online.reducer';

const rootReducer = combineReducers({
    user,
    mode,
    game,
    tournament,
    organizer,
    battle,
    allJoinedMatch,
    online
});

export default rootReducer;