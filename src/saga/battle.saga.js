import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_BATTLE, SET_BATTLE, SET_BATTLE_LOADING } from "../constant/redux.constant";
import PublicApi from '../api/public.api';

function* battleSaga() {
    yield put({ type: SET_BATTLE_LOADING, payload: true });
    const result = yield call(PublicApi.GetBattle);
    yield put({ type: SET_BATTLE_LOADING, payload: false });
    if (result.success) {
        yield put({ type: SET_BATTLE, payload: result.response });
    }
}

export default function* () {
    yield takeLatest(FETCH_BATTLE, battleSaga)
}