import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import MenuItem from '../../component/menu-item/menu-item.component';
import { logoutUserAction } from '../../action/user.action';
import { setMode } from '../../action/mode.action';
import { navigate, resetToScreen } from '../../service/navigation.service';
import { HasRole } from '../../utils/common.util';

class MenuScene extends Component {
    organizer = () => {
        const { mode } = this.props;

        if (mode == 'user') {
            this.props.setMode('organizer');
            resetToScreen('Dashboard');
        } else {
            this.props.setMode('user');
            resetToScreen('TabNavigator');
        }
    }

    render() {
        const { user } = this.props;
        
        return (
            <ScrollView style={{ flex: 1, }}>
                <MenuItem
                    iconName="profile"
                    name="Terms and Conditions"
                    detail="A primer on the & regulation"
                />
                <MenuItem
                    iconName="setting"
                    name="Settings"
                    detail="Finetune your experience"
                />
                <MenuItem
                    iconName="question"
                    name="FAQ"
                    detail="Commonly asked questions"
                />
                <MenuItem
                    iconName="star"
                    name="Invite friends"
                    detail="Get your friends playing"
                />
                <MenuItem
                    iconName="wifi"
                    name="Contact us"
                    detail="We would love to hear from you"
                />
                {
                    (HasRole(user, 'Organizer') || HasRole(user, 'Admin')) ?
                        <MenuItem
                            iconName="swap"
                            name={this.props.mode == 'user' ? "Switch to organizer mode" : "Switch to user mode"}
                            detail="Switch to Organizer"
                            onPress={this.organizer}
                        /> : null
                }
                <MenuItem
                    iconName="logout"
                    name="Logout"
                    detail="Logout from account"
                    onPress={this.props.logoutUserAction}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode,
    user: state.user
})

export default connect(mapStateToProps, { logoutUserAction, setMode })(MenuScene);
