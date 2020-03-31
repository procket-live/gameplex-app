import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Freshchat, ConversationOptions } from 'react-native-freshchat-sdk';
import Share from 'react-native-share';

import MenuItem from '../../component/menu-item/menu-item.component';
import { logoutUserAction } from '../../action/user.action';
import { setMode } from '../../action/mode.action';
import { navigate, resetToScreen } from '../../service/navigation.service';
import { HasRole } from '../../utils/common.util';
import HeaderComponent from '../../component/header/header.component';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { TEXT_COLOR, PRIMARY_COLOR, GREEN, YELLOW, GREY_BG } from '../../constant/color.constant';
import IconComponent from '../../component/icon/icon.component';
import { PLAYSTORE_LINK } from '../../config/app.config';

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

    showFAQ = () => {
        Freshchat.showFAQs();
    }

    showConversations = () => {
        const conversationOptions = new ConversationOptions();
        conversationOptions.tags = ["normal"];
        conversationOptions.filteredViewTitle = "Contact us";
        Freshchat.showConversations(conversationOptions);
    }

    navigateToJoinedTournaments = () => {
        navigate('JoinedTournament');
    }

    getFullImage = () => {
        const { user } = this.props;
        return user.profile_image.replace("head", "body")
    }

    renderVerified = ({ success }) => {
        if (success) {
            return (
                <IconComponent size={15} font="fontawesome" focused tintColor={GREEN} name="check-circle" />
            )
        }

        return (
            <IconComponent size={15} font="fontawesome" focused tintColor={YELLOW} name="exclamation-triangle" />
        )
    }

    shareApp = () => {
        Share.open({
            url: PLAYSTORE_LINK,
            message: "Hello, I am playing PUBG, Ludo, 8 Ball pool and Fantasy Cricket on Gameplex and winning cash daily! Download the app and start earning.",
            title: "Hello, I am playing PUBG, Ludo, 8 Ball pool and Fantasy Cricket on Gameplex and winning cash daily! Download the app and start earning."
        })
    }

    render() {
        const { user } = this.props;

        return (
            <>
                <HeaderComponent onProfile />
                <ScrollView style={{ flex: 1, }}>
                    <View style={{ width: widthPercentageToDP(100), height: 150, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: GREY_BG, paddingBottom: 10, paddingTop: 10 }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <FastImage resizeMode="contain" style={{ width: 100, height: 110 }} source={{ uri: this.getFullImage() }} />
                        </View>
                        <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 18, color: TEXT_COLOR }} >{user.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ fontSize: 18, color: PRIMARY_COLOR, marginRight: 5 }} >{user.mobile}</Text>
                                <this.renderVerified success={user.is_mobile_verified} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ fontSize: 18, color: PRIMARY_COLOR, marginRight: 5 }} >{user.email}</Text>
                                <this.renderVerified success={true} />
                            </View>

                        </View>
                    </View>
                    <MenuItem
                        iconName="list"
                        font="fontawesome"
                        name="Joined Tournaments"
                        detail="List of all joined tournaments"
                        onPress={this.navigateToJoinedTournaments}
                    />
                    <MenuItem
                        iconName="profile"
                        name="Terms and Conditions"
                        detail="A primer on the & regulation"
                        onPress={() => {
                            navigate('TNC')
                        }}
                    />
                    <MenuItem
                        font="fontawesome"
                        iconName="question-circle"
                        name="FAQ"
                        detail="Commonly asked questions"
                        onPress={this.showFAQ}
                    />
                    <MenuItem
                        iconName="star"
                        name="Invite friends"
                        detail="Get your friends playing"
                        onPress={this.shareApp}
                    />
                    <MenuItem
                        font="fontawesome"
                        iconName="comment"
                        name="Contact us"
                        detail="We would love to hear from you"
                        onPress={this.showConversations}
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
            </>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode,
    user: state.user
})

export default connect(mapStateToProps, { logoutUserAction, setMode })(MenuScene);
