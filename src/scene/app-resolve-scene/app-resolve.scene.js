import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { resetToScreen } from '../../service/navigation.service';
import APP from '../../constant/app.constant';
import { IsUserDetailsSet, AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';
import { setUserAction } from '../../action/user.action';
import { fetchGames } from '../../action/game.action';
import { fetchTournaments } from '../../action/tournament.action';

class AppResolve extends PureComponent {
    componentDidMount = () => {
        setTimeout(this.init, 100);
    }

    init = () => {
        const { user, mode } = this.props;

        if (user == null) {
            resetToScreen('Login')
            SplashScreen.hide();
        } else {
            const token = user.token;
            APP.TOKEN = token;
            this.updateUser(token);

            const result = IsUserDetailsSet(user, true);
            if (!result.allStepDone) {
                resetToScreen('UserDetailInput', { step: result.step });
            } else {
                if (mode == 'user') {
                    this.props.fetchGames();
                    this.props.fetchTournaments();
                    resetToScreen('TabNavigator');
                } else {
                    resetToScreen('Dashboard');
                }
            }

            SplashScreen.hide();
        }
    }

    updateUser = async (token) => {
        const result = await PrivateApi.GetUser();
        if (result.success) {
            const user = AccessNestedObject(result, 'response');
            const newUser = Object.assign(user, { token });
            this.props.setUserAction(newUser);
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    user: state.user,
    mode: state.mode
})

export default connect(mapStateToProps, { setUserAction, fetchGames, fetchTournaments })(AppResolve);