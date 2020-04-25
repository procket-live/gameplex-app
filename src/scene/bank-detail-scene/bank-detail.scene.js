import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { GREY_3, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, GREEN } from '../../constant/color.constant';
import TextInput from '../../component/text-input/text-input.component';
import Button from '../../component/button/button.component';
import { navigatePop } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';
import NotifyService from '../../service/notify.service';
import IconComponent from '../../component/icon/icon.component';
import HeaderBattleComponent from '../../component/header/header-battle.component';

function BankDetailScene() {
    const [accountNumber, setAccountNumber] = useState('');
    const [repeatAccountNumber, setRepeatAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState(String(''));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);


    useEffect(() => {
        getBankDetails();
    }, [])

    function isDisabled() {
        const regex = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
        const isCorrentifsc = ifsc.match(regex);
        const isCorrectName = name.length > 3;

        return !(accountNumber == repeatAccountNumber && isCorrentifsc && isCorrectName);
    }

    async function getBankDetails() {
        setLoading(true);
        const result = await PrivateApi.GetBankDetail();
        setLoading(false);
        if (result.success) {
            const response = AccessNestedObject(result, 'response', {});
            const { accont_number, user_name, ifsc } = response;
            setAccountNumber(accont_number || '');
            setRepeatAccountNumber(accont_number || '');
            setIfsc(ifsc || '');
            setName(user_name || '');
            setSaved(!!Object.keys(response).length);
        } else {
            setSaved(false);
        }
    }

    async function saveBankDetails() {
        setLoading(true);
        const result = await PrivateApi.SetBankDetail({ accont_number: accountNumber, user_name: name, ifsc });
        setLoading(false);
        if (result.success) {
            NotifyService.notify({ title: "Bank account", message: "Bank account details submitted.", type: 'success' });
            navigatePop();
        }
    }

    function RenderSuccess() {
        return <IconComponent font={'fontawesome'} size={20} focused tintColor={GREEN} name={'check-circle'} />
    }

    return (
        <>
            <HeaderBattleComponent
                name={"Bank Details"}
            />
            <ScrollView
                style={styles.container}
            >
                <View style={{ height: 100 }} >
                    <TextInput
                        editable={!saved}
                        label="Account number"
                        secure
                        keyboardType="number-pad"
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        RenderRight={saved ? RenderSuccess : null}
                    />
                </View>
                <View style={{ height: 100 }} >
                    <TextInput
                        editable={!saved}
                        label="Repeat account number"
                        keyboardType="number-pad"
                        value={repeatAccountNumber}
                        onChangeText={setRepeatAccountNumber}
                        RenderRight={saved ? RenderSuccess : null}
                    />
                </View>
                <View style={{ height: 100 }} >
                    <TextInput
                        editable={!saved}
                        label="IFSC"
                        value={ifsc}
                        onChangeText={setIfsc}
                        RenderRight={saved ? RenderSuccess : null}
                    />
                </View>
                <View style={{ height: 100 }} >
                    <TextInput
                        editable={!saved}
                        label="Name"
                        value={name}
                        onChangeText={setName}
                        RenderRight={saved ? RenderSuccess : null}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Button
                        loading={loading}
                        disabled={saved || isDisabled()}
                        text={saved ? 'SAVED' : 'SAVE'}
                        onPress={saveBankDetails}
                    />
                </View>
            </ScrollView>
        </>
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

export default BankDetailScene;

