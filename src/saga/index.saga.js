import { all } from 'redux-saga/effects';

import logoutSaga from './logout.saga';
import gameSaga from './game.saga';
import tournamentSaga from './tournament.saga';
import battleSaga from './battle.saga';

export default function* rootSaga() {
    yield all([
        logoutSaga(),
        gameSaga(),
        tournamentSaga(),
        battleSaga()
    ])
}