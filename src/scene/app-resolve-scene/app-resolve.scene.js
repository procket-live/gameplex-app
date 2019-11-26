import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { resetToScreen } from '../../service/navigation.service';
import APP from '../../constant/app.constant';
import { IsUserDetailsSet } from '../../utils/common.util';

class AppResolve extends PureComponent {
    componentDidMount = () => {
        setTimeout(this.init, 100);
    }

    init = () => {
        const { user } = this.props;

        if (user == null) {
            resetToScreen('Login')
            SplashScreen.hide();
        } else {
            const token = user.token;
            APP.TOKEN = token;

            const result = IsUserDetailsSet(user, true);
            console.log('result',result)
            if (!result.allStepDone) {
                resetToScreen('UserDetailInput', { step: result.step });
            }

            SplashScreen.hide();
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(AppResolve);