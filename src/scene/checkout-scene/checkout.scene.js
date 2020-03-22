import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Image, ScrollView } from 'react-native';
// import RNUpiPayment from 'react-native-upi-payment';
// import ImagePicker from 'react-native-image-picker';

import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { GREY_1, TEXT_COLOR, RED, GREEN, GREY_3, ON_PRIMARY, GREY_BG, PRIMARY_COLOR, GREY_2 } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigate, navigatePop } from '../../service/navigation.service';
import PrivateApi from '../../api/private.api';
import { fetchTournaments } from '../../action/tournament.action';
import { setUserAction } from '../../action/user.action';
import IconComponent from '../../component/icon/icon.component';
import NotifyService from '../../service/notify.service';

function CheckoutScene(props) {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});
    const tournament = props.navigation.getParam('tournament') || {};
    const user = props.user;
    const organizer = AccessNestedObject(tournament, 'organizer', {});
    const entryFee = AccessNestedObject(tournament, 'prize', []).find((item) => item.key == 'Entry Fee').value;
    const walletBalance = user.wallet_cash_balance;
    const hasLessMoney = parseInt(entryFee) > parseInt(walletBalance);
    const lessMoney = Math.abs(parseInt(entryFee) - parseInt(walletBalance));

    useEffect(function () {
        return function () {
        }
    }, [])

    async function join() {
        setLoading(true);
        const result = await PrivateApi.JoinTournament(tournament._id);
        setLoading(false);
        if (result.success) {
            updateUser();
        }
    }

    async function updateUser() {
        const result = await PrivateApi.GetUser();
        if (result.success) {
            const user = AccessNestedObject(result, 'response');
            props.setUserAction(user);
        }
        props.fetchTournaments();
        navigate('TabNavigator')
    }

    return (
        <View style={{ flex: 1 }} >
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} >
                <Text style={{ fontSize: 16, color: PRIMARY_COLOR }} >Note: Payment will be directly done to Gameplex</Text>
                <View style={{ flexDirection: 'row', height: 35 }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: GREY_3 }} >Organizer</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }} >
                        <Text style={{ fontSize: 16, color: TEXT_COLOR, paddingRight: 10 }} >{AccessNestedObject(organizer, 'organizer_name')}</Text>
                        <IconComponent font={'fontawesome'} size={15} focused tintColor={GREEN} name={"check-circle"} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 35 }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: GREY_3 }} >Entry Fee</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: TEXT_COLOR }} >{DisplayPrice(entryFee)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 35 }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: hasLessMoney ? RED : GREEN }} >Wallet Balance</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: TEXT_COLOR }} >{DisplayPrice(walletBalance)}</Text>
                    </View>
                </View>
                <View style={{ height: 1, borderTopWidth: 1, borderTopColor: GREY_1 }} />
            </ScrollView >
            {
                hasLessMoney ?
                    <TouchableOpacity
                        onPress={() => {
                            navigate('AddMoney', { amount: lessMoney });
                        }}
                        style={{ position: 'absolute', bottom: widthPercentageToDP(5 / 2), left: widthPercentageToDP(5 / 2), right: 0, width: widthPercentageToDP(95), height: 50, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} >
                        {
                            loading ?
                                <ActivityIndicator
                                    animating
                                    size="small"
                                    color={ON_PRIMARY}
                                /> :
                                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                                    ADD {DisplayPrice(lessMoney)} to join Tournament
                                </Text>
                        }
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={join}
                        style={{ position: 'absolute', bottom: widthPercentageToDP(5 / 2), left: widthPercentageToDP(5 / 2), right: 0, width: widthPercentageToDP(95), height: 50, backgroundColor: PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} >
                        {
                            loading ?
                                <ActivityIndicator
                                    animating
                                    size="small"
                                    color={ON_PRIMARY}
                                /> :
                                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                                    JOIN TOURNAMENT
                                </Text>
                        }
                    </TouchableOpacity>
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { fetchTournaments, setUserAction })(CheckoutScene);
