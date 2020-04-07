import { all } from 'redux-saga/effects';

import logoutSaga from './logout.saga';
import gameSaga from './game.saga';
import tournamentSaga from './tournament.saga';
import battleSaga from './battle.saga';
import refreshUserSaga from './refresh-user.saga';
import updateSaga from './update.saga';
import allMatchSaga from './all-match.saga';

export default function* rootSaga() {
    yield all([
        logoutSaga(),
        gameSaga(),
        tournamentSaga(),
        battleSaga(),
        refreshUserSaga(),
        updateSaga(),
        allMatchSaga(),
    ])
}