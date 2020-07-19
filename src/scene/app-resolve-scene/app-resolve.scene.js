import { useEffect } from 'react';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { Freshchat, FreshchatUser } from 'react-native-freshchat-sdk';
import messaging from '@react-native-firebase/messaging';
import links from '@react-native-firebase/dynamic-links';
import { PermissionsAndroid, AppState } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { resetToScreen } from '../../service/navigation.service';
import APP from '../../constant/app.constant';
import { IsUserDetailsSet, AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';
import { setUserAction } from '../../action/user.action';
import { fetchGames } from '../../action/game.action';
import { setOnlineList } from '../../action/online.action';
import { fetchTournaments } from '../../action/tournament.action';
import { fetchBattle } from '../../action/battle.action';
import { fetchAllJoinedMatchAction } from '../../action/all-match.action';
import { UserIdQuery } from '../../graphql/graphql.query';
import { SetFirebaseToken } from '../../graphql/graphql-mutation';

function AppResolve(props) {
    const [setFirebaseToken] = useMutation(SetFirebaseToken);
    const { data } = useQuery(UserIdQuery, {
        onCompleted({ me }) {
            setTimeout(() => {
                if (me && me.id) {
                    resetToScreen('TabNavigator');
                    setFiretoken();
                } else {
                    resetToScreen('Login');
                }
            }, 100)
            SplashScreen.hide();
        },
        onError() {
            SplashScreen.hide();
            resetToScreen('Login');
        }
    });

    useEffect(() => {
        // AppState.addEventListener('change', _handleAppStateChange);
        // setTimeout(getInitialNotification, 100);
        askPermission();

        return componentWillUnmount;
    }, [])

    // function init() {
    //     const { user, mode } = props;

    //     if (user == null) {
    //         resetToScreen('Login')
    //         SplashScreen.hide();
    //     } else {
    //         const token = user.token;
    //         userId = user._id;
    //         APP.TOKEN = token;
    //         updateUser(token);
    //         setFiretoken();

    //         const result = IsUserDetailsSet(user, true);
    //         if (!result.allStepDone) {
    //             resetToScreen('UserDetailInput', { step: result.step });
    //         } else {
    //             if (mode == 'user') {
    //                 props.fetchGames();
    //                 props.fetchTournaments();
    //                 props.fetchBattle();
    //                 props.fetchAllJoinedMatchAction();
    //               
    //             } else {
    //               
    //             }
    //         }

    //         setFreshchatUser(user);

    //         SplashScreen.hide();
    //     }
    // }

    async function askPermission() {
        await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
        props.InitFreshchat();
    }

    function componentWillUnmount() {
        AppState.removeEventListener('change', _handleAppStateChange);
        // appClose();
    }
    function _handleAppStateChange(nextAppState) {
        if (nextAppState === 'inactive' || nextAppState === 'background') {
            // appClose();
        }
    };

    function setFreshchatUser() {
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

    async function updateUser(token) {
        const result = await PrivateApi.GetUser();
        if (result.success) {
            const user = AccessNestedObject(result, 'response');
            const newUser = Object.assign(user, { token });
            props.setUserAction(newUser);
        }
    }

    async function setFiretoken() {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            setFirebaseToken({ variables: { firebaseToken: fcmToken } });
        }
    }

    async function getInitialNotification() {
        const notificationOpen = await messaging().getInitialNotification();

        if (notificationOpen) {
            const data = notificationOpen.notification.data;

            if (AccessNestedObject(data, 'route') == "BattleQueue") {
                APP.REDIRECT_TO = {
                    route: 'BattleChat',
                    payload: {
                        id: AccessNestedObject(data, 'value')
                    }
                }
            }

            if (AccessNestedObject(data, 'route') == "Tournament") {
                APP.REDIRECT_TO = {
                    route: 'Tournament',
                    payload: {
                        id: AccessNestedObject(data, 'value')
                    }
                }
            }
        }

        getInitialLink();
    }

    async function getInitialLink() {
        const link = await links().getInitialLink();
        if (link) {
            if (link.includes('tournament')) {
                const parts = link.split('/');
                const id = parts[4];

                APP.REDIRECT_TO = {
                    route: 'Tournament',
                    payload: {
                        id
                    }
                }
            }
        }

        init()
    }


    return null;
}

const mapStateToProps = state => ({
    user: state.user,
    mode: state.mode
})

export default connect(mapStateToProps, { setUserAction, fetchGames, fetchTournaments, fetchBattle, fetchAllJoinedMatchAction, setOnlineList })(AppResolve);