import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import MenuItem from '../../component/menu-item/menu-item.component';
import { logoutUserAction } from '../../action/user.action';

class MenuScene extends Component {
    render() {
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

export default connect(null, { logoutUserAction })(MenuScene);
