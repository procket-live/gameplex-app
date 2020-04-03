import { takeLatest, call } from 'redux-saga/effects';
import { CHECK_UPDATE } from "../constant/redux.constant";
import PublicApi from '../api/public.api';
import { getReadableVersion } from 'react-native-device-info';
import compareVersion from 'compare-versions';
import APP_CONFIG from '../config/app.config';
import { navigate } from '../service/navigation.service';
import { AccessNestedObject } from '../utils/common.util';

function* updateSaga() {
    const result = yield call(PublicApi.GetLatestApp);

    if (result.success) {
        const versionBlock = AccessNestedObject(result, 'response', {});
        const versionNumber = versionBlock.version;
        const currentVersion = getReadableVersion();

        if (compareVersion(currentVersion, versionNumber, '<')) {
            APP_CONFIG.DONWLOAD_LINK = versionBlock.app_delivery_link;
            navigate('Update')
        }
    }
}

export default function* () {
    yield takeLatest(CHECK_UPDATE, updateSaga)
}