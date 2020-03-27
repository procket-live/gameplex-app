import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ON_PRIMARY, SECONDARY_COLOR, GREY_3, TEXT_COLOR, GREEN, YELLOW, PRIMARY_COLOR, GREY_2 } from '../../constant/color.constant';
import { DisplayPrice, AccessNestedObject } from '../../utils/common.util';
import moment from 'moment';
import ParticipentsCircle from '../participents-circle/participents-circle.component';

function BattleCard({ item: match = {}, joinMatch, queueEntry, disableButton = false, proceedToChat }) {
    function onPress() {
        if (disableButton) {
            return;
        }

        if (joinMatch) {
            joinMatch(match);
        }

        if (proceedToChat) {
            proceedToChat(queueEntry);
        }
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.container} >
            <View style={{ flex: 0.5, backgroundColor: SECONDARY_COLOR, overflow: 'hidden', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} >
                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'flex-start' }} ></View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 5 }} >
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: ON_PRIMARY, transform: [{ rotate: '90deg' }], width: 100 }} >
                        {match.match_type}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 3, padding: 10 }} >
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }} >
                    <Text style={styles.textBoldLight} >{match.name}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }} >
                    {
                        match.winning_amount == 0 ?
                            < Text style={styles.textBold} >PRACTICE MATCH</Text> :
                            <Text style={styles.textBoldBig} >WIN<Text style={{ color: GREEN }} > {DisplayPrice(match.winning_amount)}</Text></Text>
                    }
                </View>
            </View>
            <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center', padding: 10, paddingRight: 20 }} >
                {
                    queueEntry ?
                        <>
                            <Text style={{ fontSize: 14, color: PRIMARY_COLOR, fontWeight: 'bold' }} >
                                YOU PAID {DisplayPrice(match.entry_fee)}
                            </Text>
                            {
                                queueEntry ?
                                    <ParticipentsCircle participents={AccessNestedObject(queueEntry, 'tournament.participents')} />
                                    : null
                            }
                            <Text style={{ fontSize: 12, color: GREY_2, fontWeight: 'bold' }} >
                                {moment(queueEntry.created_at).format('lll')}
                            </Text>
                        </>
                        :
                        match.entry_fee == 0 ?
                            <FreeButton /> :
                            <PrizeButton prize={match.entry_fee} />
                }
            </View>
        </TouchableOpacity>
    )
}

function PrizeButton({ prize, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: 'bold' }} >
                    {DisplayPrice(prize)}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 14, color: ON_PRIMARY, fontWeight: 'bold' }} >
                    PER MATCH
                </Text>
            </View>
        </TouchableOpacity>
    )
}

function FreeButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, { backgroundColor: YELLOW }]} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 14, color: TEXT_COLOR, fontWeight: 'bold' }} >
                    FREE
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(95),
        height: 80,
        borderRadius: 5,
        backgroundColor: ON_PRIMARY,
        marginBottom: 10,
        elevation: 2,
        flexDirection: 'row'
    },
    textBoldLight: {
        fontSize: 14,
        fontWeight: 'bold',
        color: GREY_3
    },
    textBoldBig: {
        fontSize: 25,
        fontWeight: 'bold',
        color: TEXT_COLOR
    },
    textBold: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR
    },
    buttonContainer: {
        width: 100,
        height: 50,
        borderRadius: 5,
        backgroundColor: GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    }
})

export default BattleCard;