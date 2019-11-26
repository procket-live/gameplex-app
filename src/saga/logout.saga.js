import { put, takeLatest } from 'redux-saga/effects';
import { LOGOUT_USER, CLEAR_USER } from "../constant/redux.constant";
import { resetToScreen } from '../service/navigation.service';

function* logoutUser() {
    yield put({ type: CLEAR_USER });
    resetToScreen('Login');
}

export default function* () {
    yield takeLatest(LOGOUT_USER, logoutUser)
}