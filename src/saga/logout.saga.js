import { put, takeLatest } from 'redux-saga/effects';
import { LOGOUT_USER, CLEAR_USER, SET_ORGANIZER } from "../constant/redux.constant";
import { resetToScreen } from '../service/navigation.service';

function* logoutUser() {
    yield put({ type: CLEAR_USER });
    yield put({ type: SET_ORGANIZER, payload: null })
    resetToScreen('Login');
}

export default function* () {
    yield takeLatest(LOGOUT_USER, logoutUser)
}