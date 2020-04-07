import { takeLatest, call } from 'redux-saga/effects';
import { CHECK_UPDATE } from "../constant/redux.constant";
import PublicApi from '../api/public.api';
import { getReadableVersion } from 'react-native-device-info';
import compareVersion from 'compare-versions';
import APP_CONFIG from '../config/app.config';
import { navigate } from '../service/navigation.service';
import { AccessNestedObject } from '../utils/common.util';
import { Alert } from 'react-native';
import AppUpdate from 'react-native-appupdate';

function* updateSaga() {
    const result = yield call(PublicApi.GetLatestApp);

    if (result.success) {
        const versionBlock = AccessNestedObject(result, 'response', {});
        if (Object.keys(versionBlock).length) {
            const versionNumber = versionBlock.version;
            const currentVersion = getReadableVersion();

            if (compareVersion.compare(String(currentVersion), String(versionNumber), '<')) {
                APP_CONFIG.DONWLOAD_LINK = versionBlock.app_delivery_link;
                navigate('Update')
            }
        }
    }
}

export default function* () {
    yield takeLatest(CHECK_UPDATE, updateSaga)
}