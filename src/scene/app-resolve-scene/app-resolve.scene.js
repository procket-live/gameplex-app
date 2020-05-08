import { PureComponent } from 'react';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { Freshchat, FreshchatUser } from 'react-native-freshchat-sdk';
import messaging from '@react-native-firebase/messaging';
// import notification from '@react-native-firebase'
import { PermissionsAndroid, AppState } from 'react-native';


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
import { GetSocket } from '../../utils/soket.utils';
SplashScreen.hide();
const socket = GetSocket();
class AppResolve extends PureComponent {
    constructor(props) {
        super(props);
        this.userId = null;
    }
    componentDidMount = () => {
        AppState.addEventListener('change', this._handleAppStateChange);
        setTimeout(this.getInitialNotification, 100);
        this.askPermission();
    }

    init = () => {
        const { user, mode } = this.props;

        if (user == null) {
            resetToScreen('Login')
            SplashScreen.hide();
        } else {
            const token = user.token;
            this.userId = user._id;
            APP.TOKEN = token;
            this.updateUser(token);
            this.setFiretoken();
            this.connectSocket();

            const result = IsUserDetailsSet(user, true);
            if (!result.allStepDone) {
                resetToScreen('UserDetailInput', { step: result.step });
            } else {
                if (mode == 'user') {
                    this.props.fetchGames();
                    this.props.fetchTournaments();
                    this.props.fetchBattle();
                    this.props.fetchAllJoinedMatchAction();
                    resetToScreen('TabNavigator');
                } else {
                    resetToScreen('Dashboard');
                }
            }

            this.setFreshchatUser(user);

            SplashScreen.hide();
        }
    }

    askPermission = async () => {
        await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
        this.props.InitFreshchat();
    }

    connectSocket = () => {
        const userId = this.userId;
        if (userId) {
            socket.emit('online', { userId });
            socket.on('online_user_list', (data) => {
                this.props.setOnlineList(data);
            })
        }
    }

    componentWillUnmount = () => {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.appClose();
    }

    appClose = () => {
        const userId = this.userId;
        if (userId) {
            socket.emit('offline', { userId });
            socket.off();
            socket.emit("disconnect");
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'inactive' || nextAppState === 'background') {
            this.appClose();
        }
    };

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
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            PrivateApi.SetUser({ firebase_token: fcmToken });
        }
    }

    getInitialNotification = async () => {
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

        this.getInitialLink();
    }

    getInitialLink = async () => {
        const link = await firebase.links().getInitialLink();
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

export default connect(mapStateToProps, { setUserAction, fetchGames, fetchTournaments, fetchBattle, fetchAllJoinedMatchAction, setOnlineList })(AppResolve);