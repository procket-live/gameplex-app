import React, { Component, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Freshchat, ConversationOptions } from 'react-native-freshchat-sdk';

import { logoutUserAction } from '../../action/user.action';
import { setMode } from '../../action/mode.action';
import { navigate, resetToScreen } from '../../service/navigation.service';
import { HasRole, DisplayPrice, AccessNestedObject } from '../../utils/common.util';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, GREEN, YELLOW, SECONDARY_COLOR, GREY_2, GREY_1, ON_PRIMARY, GREY_3 } from '../../constant/color.constant';
import IconComponent from '../../component/icon/icon.component';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import DiamondIcon from '../../assets/svg/diamong';
import TicketIcon from '../../assets/svg/ticket';
import CoinIcon from '../../assets/svg/coin';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UserQuery } from '../../graphql/graphql.query';
import { LogoutMutation } from '../../graphql/graphql-mutation';

function ProfileScene() {
    const [mode, setMode] = useState(false);
    const [user, setUser] = useState({});

    const { data, loading, error } = useQuery(UserQuery, {
        onCompleted({ me }) {
            setUser(me);
        }
    });

    console.log('data', data, loading, error)

    const [logout] = useMutation(LogoutMutation);

    function logoutApp() {
        logout();
    }

    function organizer() {
        resetToScreen('Dashboard');
    }

    function showFAQ() {
        Freshchat.showFAQs();
    }

    function showConversations() {
        const conversationOptions = new ConversationOptions();
        conversationOptions.tags = ["normal"];
        conversationOptions.filteredViewTitle = "Contact us";
        Freshchat.showConversations(conversationOptions);
    }

    function navigateToJoinedTournaments() {
        navigate('JoinedTournament');
    }

    function shareApp() {

    }

    function getFullImage() {
        return AccessNestedObject(user, 'profile_image');
    }

    function RenderVerified({ success }) {
        if (success) {
            return (
                <IconComponent size={15} font="fontawesome" focused tintColor={GREEN} name="check-circle" />
            )
        }

        return (
            <IconComponent size={15} font="fontawesome" focused tintColor={YELLOW} name="exclamation-triangle" />
        )
    }

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
                                <FastImage resizeMode="contain" style={{ width: 80, height: 80 }} source={{ uri: getFullImage() }} />
                            </View>
                            <View style={{ width: 20, height: 20, backgroundColor: GREEN, borderRadius: 20, position: 'absolute', right: 10, bottom: 0, borderWidth: 4, borderColor: ON_PRIMARY, overflow: 'visible' }} />
                        </View>

                        <Text style={{ fontSize: 22, color: PRIMARY_COLOR, fontWeight: 'bold' }} >{AccessNestedObject(user, 'name')}</Text>
                        <Text style={{ fontSize: 16, color: SECONDARY_COLOR, fontWeight: '100' }} >@{AccessNestedObject(user, 'username')}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontSize: 18, color: GREY_3, marginRight: 5 }} >+91 {AccessNestedObject(user, 'mobile')}</Text>
                            <RenderVerified success={AccessNestedObject(user, 'is_mobile_verified')} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontSize: 18, color: GREY_3, marginRight: 5 }} >{AccessNestedObject(user, 'email')}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: widthPercentageToDP(95), height: 80, flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableNativeFeedback
                        onPress={organizer}
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
                <TouchableOpacity
                    onPress={() => navigate('WalletScene')}
                    style={{ width: widthPercentageToDP(95), height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#10ac84', borderRadius: 10, flexDirection: 'row' }} >
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                            <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 5 }} >
                                {DisplayPrice(AccessNestedObject(user, 'wallet.wallet_cash_balance'))}
                            </Text>
                            {/* <DiamondIcon width={15} height={15} /> */}
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                            <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >
                                Cash Balance
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                            <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 5 }} >
                                {DisplayPrice(AccessNestedObject(user, 'wallet.wallet_bonous_balance'))}
                            </Text>
                            {/* <TicketIcon width={20} height={20} /> */}
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                            <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >
                                Bonous Balance
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                            <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 5 }} >
                                {DisplayPrice(AccessNestedObject(user, 'wallet.wallet_win_balance'))}
                            </Text>
                            {/* <CoinIcon width={20} height={20} /> */}
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                            <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >
                                Win Balance
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 20 }} />
                <View style={{ width: widthPercentageToDP(95), height: 80, flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableNativeFeedback
                        onPress={showFAQ}
                        style={{ width: widthPercentageToDP(94), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0abde3', borderRadius: 10 }} >
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
                        onPress={shareApp}
                        style={{ width: widthPercentageToDP(45), height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5f27cd', borderRadius: 10 }} >
                        <>
                            <IconComponent size={18} font="fontawesome" focused tintColor={ON_PRIMARY} name={"star"} />
                            <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingTop: 10 }} >
                                Invite & Earn
                                </Text>
                        </>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={showConversations}
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
                        onPress={logout}
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
            </ScrollView>
        </>
    )
}

export default ProfileScene;
