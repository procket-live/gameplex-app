import { put, takeLatest, call } from 'redux-saga/effects';
import { REFRESH_USER } from "../constant/redux.constant";
import PrivateApi from '../api/private.api';
import { setUserAction } from '../action/user.action';
import { TOKEN } from '../constant/app.constant';
import { AccessNestedObject } from '../utils/common.util';

function* refreshUserSaga() {
    const result = yield call(PrivateApi.GetUser);
    if (result.success) {
        const token = TOKEN;
        const user = AccessNestedObject(result, 'response');
        const newUser = Object.assign(user, { token });
        yield put(setUserAction(newUser));
    }
}

export default function* () {
    yield takeLatest(REFRESH_USER, refreshUserSaga)
}