import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import { GREY_3, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, GREEN, RED } from '../../constant/color.constant';
import TextInput from '../../component/text-input/text-input.component';
import Button from '../../component/button/button.component';
import { navigatePop } from '../../service/navigation.service';
import { DisplayPrice } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';
import NotifyService from '../../service/notify.service';
import { refreshUser } from '../../action/user.action';

function WithdrawScene({ user, refreshUserObject }) {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const walletBalance = user.wallet_win_balance;

    function isDisabled() {
        return Number(amount) >= 10 && Number(amount) <= walletBalance;
    }

    async function withdraw() {
        setLoading(true);
        const result = await PrivateApi.AddWithdrawRequest(amount);
        setLoading(false);
        if (result.success) {
            refreshUserObject();
            NotifyService.notify({ title: "Success", message: "Withdraw request created.", type: 'success' });
            navigatePop();
        }
    }

    function onChangeText(text) {
        setAmount(text);

        if (text < 10) {
            setError(`Amount cannot be less than ${DisplayPrice(10)}`);
        } else if (text > walletBalance) {
            setError(`Amount cannot be greter than ${DisplayPrice(walletBalance)}`);
        } else {
            setError('');
        }
    }

    return (
        <ScrollView
            style={styles.container}
        >
            <View style={{ height: 100 }} >
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMini} >Current balance</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontH1} >Available: {DisplayPrice(walletBalance || 0)}</Text>
                </View>
            </View>
            <View style={{ height: 100 }} >
                <TextInput
                    label="Amount"
                    keyboardType="number-pad"
                    value={amount}
                    onChangeText={onChangeText}
                />
                <Text style={[styles.fontMini, { color: RED }]} >{error}</Text>
            </View>
            <View style={styles.buttonContainer} >
                <Button
                    loading={loading}
                    text="Withdraw"
                    disabled={loading || !isDisabled()}
                    onPress={withdraw}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    fontMini: {
        color: GREY_3,
        fontSize: 14,
        fontWeight: '500'
    },
    fontH1: {
        color: TEXT_COLOR,
        fontSize: 22,
        fontWeight: '500'
    },
    fontMiniLight: {
        color: GREY_3,
        fontSize: 14,
        fontWeight: '300'
    },
    inputTextContainer: {
        height: 100,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        height: 100,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    otpButtonContainer: {
        flexDirection: 'row',
        height: 100,
    },
    mobileNumberText: {
        fontSize: 14,
        color: PRIMARY_COLOR
    },
    editText: {
        color: SECONDARY_COLOR,
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: 10,
        paddingRight: 10
    },
    borderStyleHighLighted: {
        borderColor: PRIMARY_COLOR,
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: PRIMARY_COLOR,
    },
})

function mapStateToProps(state) {
    return ({
        user: state.user
    })
}

export default connect(mapStateToProps, { refreshUserObject: refreshUser })(WithdrawScene);

