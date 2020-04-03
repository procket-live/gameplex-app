import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { Freshchat, FreshchatUser } from 'react-native-freshchat-sdk';
import firebase from 'react-native-firebase';
import RNFS from 'react-native-fs';
import ApkInstaller from 'react-native-apk-install';
import { getReadableVersion } from 'react-native-device-info';

import { resetToScreen } from '../../service/navigation.service';
import APP from '../../constant/app.constant';
import { IsUserDetailsSet, AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';
import { setUserAction } from '../../action/user.action';
import { fetchGames } from '../../action/game.action';
import { fetchTournaments } from '../../action/tournament.action';
import { fetchBattle } from '../../action/battle.action';
import PublicApi from '../../api/public.api';

class AppResolve extends PureComponent {
    componentDidMount = () => {
        setTimeout(this.getInitialNotification, 100);
    }

    init = () => {
        const { user, mode } = this.props;

        this.getAppUpdate();

        if (user == null) {
            resetToScreen('Login')
            SplashScreen.hide();
        } else {
            const token = user.token;
            APP.TOKEN = token;
            this.updateUser(token);
            this.setFiretoken();

            const result = IsUserDetailsSet(user, true);
            if (!result.allStepDone) {
                resetToScreen('UserDetailInput', { step: result.step });
            } else {
                if (mode == 'user') {
                    this.props.fetchGames();
                    this.props.fetchTournaments();
                    this.props.fetchBattle();
                    resetToScreen('TabNavigator');
                } else {
                    resetToScreen('Dashboard');
                }
            }

            this.setFreshchatUser(user);

            SplashScreen.hide();
        }
    }

    getAppUpdate = async () => {

        console.log('getAppUpdate');
        const currentVersion = getReadableVersion();

        const result = await PublicApi.GetLatestApp();
        if (result.success) {
            const versionBlock = AccessNestedObject(result, 'response', {});
            const versionNumber = versionBlock.version;
            console.log('versionBlock', versionBlock)
            if (versionNumber != currentVersion) {
                try {
                    var filePath = RNFS.CachesDirectoryPath + '/com.gameplexapp.apk';
                    var download = RNFS.downloadFile({
                        fromUrl: versionBlock.link,
                        toFile: filePath,
                        progress: res => {
                            console.log((res.bytesWritten / res.contentLength).toFixed(2));
                        },
                        progressDivider: 1
                    });

                    download.promise.then(result => {
                        if (result.statusCode == 200) {
                            console.log(filePath);
                            ApkInstaller.install(filePath);
                        }
                    });
                }
                catch (error) {
                    console.warn(error);
                }
            }
        }
    }

    setFreshchatUser = (user) => {
        const freshchatUser = new FreshchatUser();
        freshchatUser.firstName = user.name;
        freshchatUser.lastName = "";
        freshchatUser.email = user.email;
        freshchatUser.phoneCountryCode = "+91";
        freshchatUser.phone = user.mobile;
        Freshchat.setUser(freshchatUser, (error) => {
            console.log(error);
        });
    }

    updateUser = async (token) => {
        const result = await PrivateApi.GetUser();
        if (result.success) {
            const user = AccessNestedObject(result, 'response');
            const newUser = Object.assign(user, { token });
            this.props.setUserAction(newUser);
        }
    }

    setFiretoken = async () => {
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            PrivateApi.SetUser({ firebase_token: fcmToken });
        }
    }

    getInitialNotification = async () => {
        const notificationOpen = await firebase.notifications().getInitialNotification();
        console.log('notificationOpen', notificationOpen);
        if (notificationOpen) {
            const data = notificationOpen.notification.data;
            console.log('a', data);
            if (AccessNestedObject(data, 'route') == "BattleQueue") {
                APP.REDIRECT_TO = {
                    route: 'BattleChat',
                    payload: {
                        id: AccessNestedObject(data, 'value')
                    }
                }
            }
        }

        this.getInitialLink();
    }

    getInitialLink = async () => {
        const link = await firebase.links().getInitialLink();
        if (link) {
            // if (link.includes('bloodRequest')) {
            //     const parts = link.split('/');
            //     const id = parts[4];

            //     APP.REDIRECT_TO = {
            //         route: 'BloodRequest',
            //         payload: {
            //             id
            //         }
            //     }
            // }
        }

        this.init()
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    user: state.user,
    mode: state.mode
})

export default connect(mapStateToProps, { setUserAction, fetchGames, fetchTournaments, fetchBattle })(AppResolve);