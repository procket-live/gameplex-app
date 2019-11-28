import { put, takeLatest, call } from 'redux-saga/effects';
import { SET_TOURNAMENTS_LOADING, SET_TOURNAMENTS, FETCH_TOURNAMENTS } from "../constant/redux.constant";
import PrivateApi from '../api/private.api';

function* tournamentSaga() {
    yield put({ type: SET_TOURNAMENTS_LOADING, payload: true });
    const result = yield call(PrivateApi.UpcomingTournament);
    yield put({ type: SET_TOURNAMENTS_LOADING, payload: false });
    if (result.success) {
        yield put({ type: SET_TOURNAMENTS, payload: result.response });
    }
}

export default function* () {
    yield takeLatest(FETCH_TOURNAMENTS, tournamentSaga)
}