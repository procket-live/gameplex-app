import { all } from 'redux-saga/effects';

import logoutSaga from './logout.saga';

export default function* rootSaga() {
    yield all([
        logoutSaga()
    ])
}