import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Freshchat, ConversationOptions } from 'react-native-freshchat-sdk';

import { logoutUserAction } from '../../action/user.action';
import { setMode } from '../../action/mode.action';
import { navigate, resetToScreen } from '../../service/navigation.service';
import { HasRole, DisplayPrice } from '../../utils/common.util';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, GREEN, YELLOW, SECONDARY_COLOR, GREY_2, GREY_1, ON_PRIMARY, GREY_3 } from '../../constant/color.constant';
import IconComponent from '../../component/icon/icon.component';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

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
        return user.profile_image;
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

    }

    render() {
        const { user } = this.props;

        return (
            <>

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <View style={{ width: widthPercentageToDP(100), height: 250, flexDirection: 'row', paddingBottom: 10, paddingTop: 10 }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <View>
                                <View style={{ width: 100, height: 100, borderWidth: 5, borderColor: GREY_2, borderRadius: 100, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: GREY_1 }} >
                                    <FastImage resizeMode="contain" style={{ width: 80, height: 80 }} source={{ uri: this.getFullImage() }} />
                                </View>
                                <View style={{ width: 20, height: 20, backgroundColor: GREEN, borderRadius: 20, position: 'absolute', right: 10, bottom: 0, borderWidth: 4, borderColor: ON_PRIMARY, overflow: 'visible' }} />
                            </View>

                            <Text style={{ fontSize: 22, color: PRIMARY_COLOR, fontWeight: 'bold' }} >{user.name}</Text>
                            <Text style={{ fontSize: 16, color: SECONDARY_COLOR, fontWeight: '100' }} >@{user.username}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ fontSize: 18, color: GREY_3, marginRight: 5 }} >+91 {user.mobile}</Text>
                                <this.renderVerified success={user.is_mobile_verified} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ fontSize: 18, color: GREY_3, marginRight: 5 }} >{user.email}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        (HasRole(user, 'Organizer') || HasRole(user, 'Admin')) ?
                            <>
                                <View style={{ width: widthPercentageToDP(95), height: 80, flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <TouchableNativeFeedback
                                        onPress={this.organizer}
                                        style={{ width: widthPercentageToDP(95), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#B53471', borderRadius: 10 }} >
                                        <>
                                            <IconComponent size={18} focused tintColor={ON_PRIMARY} name={"swap"} />
                                            <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                                Switch to Organizer
                                        </Text>
                                        </>
                                    </TouchableNativeFeedback>
                                </View>
                                <View style={{ height: 20 }} />
                            </>
                            : null
                    }
                    <View style={{ width: widthPercentageToDP(95), height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#10ac84', borderRadius: 10, flexDirection: 'row' }} >
                        <View style={{ flex: 1 }} >
                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold' }} >
                                    {DisplayPrice(user.wallet_cash_balance)}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                                <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >Cash Amount</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold' }} >
                                    {DisplayPrice(user.wallet_bonous_balance)}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                                <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >Bonous Amount</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold' }} >
                                    {DisplayPrice(user.wallet_win_balance)}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                                <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >Win Balance</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={{ width: widthPercentageToDP(95), height: 80, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableNativeFeedback
                            onPress={this.navigateToJoinedTournaments}
                            style={{ width: widthPercentageToDP(45), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ee5253', borderRadius: 10 }} >
                            <>
                                <IconComponent size={18} font="fontawesome" focused tintColor={ON_PRIMARY} name={"list"} />
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                    Tournaments
                                </Text>
                            </>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.showFAQ}
                            style={{ width: widthPercentageToDP(45), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0abde3', borderRadius: 10 }} >
                            <>
                                <IconComponent size={18} font="fontawesome" focused tintColor={ON_PRIMARY} name={"question-circle"} />
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                    FAQ
                                </Text>
                            </>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={{ width: widthPercentageToDP(95), height: 80, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableNativeFeedback
                            onPress={this.shareApp}
                            style={{ width: widthPercentageToDP(45), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5f27cd', borderRadius: 10 }} >
                            <>
                                <IconComponent size={18} font="fontawesome" focused tintColor={ON_PRIMARY} name={"star"} />
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                    Invite & Earn
                                </Text>
                            </>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.showConversations}
                            style={{ width: widthPercentageToDP(45), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00d2d3', borderRadius: 10 }} >
                            <>
                                <IconComponent size={18} font="fontawesome" focused tintColor={ON_PRIMARY} name={"comment"} />
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                    Contact us
                                </Text>
                            </>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={{ width: widthPercentageToDP(95), height: 80, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableNativeFeedback
                            onPress={() => {
                                navigate('TNC')
                            }}
                            style={{ width: widthPercentageToDP(45), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#feca57', borderRadius: 10 }} >
                            <>
                                <IconComponent size={18} focused tintColor={ON_PRIMARY} name={"profile"} />
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                    TNC
                                </Text>
                            </>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.props.logoutUserAction}
                            style={{ width: widthPercentageToDP(45), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#222f3e', borderRadius: 10 }} >
                            <>
                                <IconComponent size={18} focused tintColor={ON_PRIMARY} name={"logout"} />
                                <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                    Logout
                                </Text>
                            </>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ height: 20 }} />
                    {/* <MenuItem
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
                        /> */}
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
