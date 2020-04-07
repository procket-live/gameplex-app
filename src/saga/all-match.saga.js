import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_ALL_JOINED_MATCH, SET_ALL_JOINED_MATCH_LOADING, SET_ALL_JOINED_MATCH } from "../constant/redux.constant";
import PrivateApi from '../api/private.api';

function* allMatchSaga() {
    yield put({ type: SET_ALL_JOINED_MATCH_LOADING, payload: true });
    const result = yield call(PrivateApi.GetAllJoinedBattle);
    yield put({ type: SET_ALL_JOINED_MATCH_LOADING, payload: false });
    if (result.success) {
        yield put({ type: SET_ALL_JOINED_MATCH, payload: result.response });
    }
}

export default function* () {
    yield takeLatest(FETCH_ALL_JOINED_MATCH, allMatchSaga)
}