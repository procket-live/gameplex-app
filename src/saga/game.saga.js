import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_GAMES, SET_GAMES_LOADING, SET_GAMES } from "../constant/redux.constant";
import PublicApi from '../api/public.api';

function* gameSaga() {
    yield put({ type: SET_GAMES_LOADING, payload: true });
    const result = yield call(PublicApi.GetGames);
    yield put({ type: SET_GAMES_LOADING, payload: false });
    if (result.success) {
        yield put({ type: SET_GAMES, payload: result.response });
    }
}

export default function* () {
    yield takeLatest(FETCH_GAMES, gameSaga)
}