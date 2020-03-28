import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { TEXT_COLOR, ON_PRIMARY, PRIMARY_COLOR, GREEN } from '../../constant/color.constant';
import { DisplayPrice } from '../../utils/common.util';
import { navigate } from '../../service/navigation.service';
import BattleCard from '../battle-card/battle-card.component';

function JoinBattleComponent({ match, walletBalance, entryFee, lessAmount, isLessAmount, makeApiCall }) {
    return (
        <View style={styles.contentContainer}  >
            <View style={{ height: 100, alignItems: 'center', justifyContent: 'flex-start', padding: 10 }} >
                <BattleCard item={match} disableButton />
            </View>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'flex-start', padding: 10 }} >
                <RenderItem name={"Wallet Balance"} value={DisplayPrice(walletBalance)} />
                <RenderItem name={"Entry Fee"} value={DisplayPrice(entryFee)} />
                {
                    isLessAmount ?
                        <TouchableOpacity
                            onPressIn={() => {
                                navigate('AddMoney', { amount: lessAmount });
                            }}
                            style={[styles.buttonContainer, { backgroundColor: PRIMARY_COLOR }]} >
                            <Text style={styles.boldText} >ADD {DisplayPrice(lessAmount)} TO JOIN</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPressIn={makeApiCall}
                            style={styles.buttonContainer} >
                            <Text style={styles.boldText} >{entryFee == 0 ? 'JOIN BATTLE' : `JOIN BATTLE FOR ${DisplayPrice(entryFee)}`}</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}

function RenderItem({ name, value }) {
    return (
        <View style={{ flex: 1, flexDirection: 'row', width: widthPercentageToDP(100), padding: 10, paddingLeft: 20, paddingRight: 20 }} >
            <View style={{ alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text style={{ fontWeight: 'bold', color: TEXT_COLOR, fontSize: 16 }} >
                    {name}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                <Text style={{ fontWeight: '100', color: TEXT_COLOR, fontSize: 16 }} >
                    {value}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        width: widthPercentageToDP(100),
        height: 250,
        backgroundColor: ON_PRIMARY,
    },
    buttonContainer: {
        width: widthPercentageToDP(95),
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GREEN
    },
    boldText: {
        color: ON_PRIMARY,
        fontWeight: 'bold',
        fontSize: 20
    },
})

export default JoinBattleComponent;
