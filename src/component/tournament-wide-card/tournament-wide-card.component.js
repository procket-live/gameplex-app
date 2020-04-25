import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ON_PRIMARY, SECONDARY_COLOR, GREY_3, TEXT_COLOR, GREEN, YELLOW, PRIMARY_COLOR, GREY_2 } from '../../constant/color.constant';
import { DisplayPrice, AccessNestedObject } from '../../utils/common.util';
import moment from 'moment';
import ParticipentsCircle from '../participents-circle/participents-circle.component';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { navigate } from '../../service/navigation.service';

function TournamentWideCard({ item: tournament = {}, loading }) {
    function onPress() {
        navigate('Tournament', { tournament })
    }

    function getEntryFee() {
        let entryFee = 0;
        const prizeMeta = tournament.prize || [];
        prizeMeta.forEach((item) => {
            if (item.key == "Entry Fee") {
                entryFee = item.value;
            }
        })

        return entryFee;
    }

    function getWinningAmount() {
        let winningAmount = 0;
        const prizeMeta = tournament.prize || [];
        prizeMeta.forEach((item) => {
            if (item.key == "Win Amount") {
                winningAmount = item.value;
            }
        })

        return winningAmount;
    }

    const entryFee = getEntryFee();
    const winningAmount = getWinningAmount();
    const startTime = moment(tournament.tournament_start_time).format('hh:mm A');
    const endTime = moment(tournament.registration_closing).format('hh:mm A');

    if (loading) {
        return (
            <Placeholder
                Animation={Fade}
            >
                <View style={styles.container}>

                    <View style={{ flex: 0.5, backgroundColor: PRIMARY_COLOR, overflow: 'hidden', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} >
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'flex-start' }} ></View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 5 }} >

                        </View>
                    </View>
                    <View style={{ flex: 3, padding: 10 }} >
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }} >
                            <PlaceholderLine width={50} height={10} />
                        </View>
                        <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }} >
                            <PlaceholderLine height={10} width={80} />
                            <PlaceholderLine height={10} width={80} />
                        </View>
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center', padding: 10, paddingRight: 20 }} >
                        <PlaceholderLine style={[styles.buttonContainer, { backgroundColor: GREY_3 }]} />
                    </View>
                </View>
            </Placeholder>
        )
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.container} >
            <View style={{ flex: 0.2, backgroundColor: PRIMARY_COLOR, overflow: 'hidden', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} >
                <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'flex-start' }} ></View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 5 }} >
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: ON_PRIMARY, transform: [{ rotate: '90deg' }], width: 100 }} >
                        Tournament
                    </Text>
                </View>
            </View>
            <View style={{ flex: 3 }} >
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <View style={{ flex: 3, padding: 10 }} >
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }} >
                            <Text style={styles.textBoldLight} >{AccessNestedObject(tournament, 'tournament_name')}</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                            {
                                winningAmount == 0 ?
                                    < Text style={styles.textBold} >PRACTICE MATCH</Text> :
                                    <Text style={styles.textBoldBig} >WIN<Text style={{ color: GREEN }} > {DisplayPrice(winningAmount)}</Text></Text>
                            }
                        </View>
                    </View>
                    <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-start', padding: 10 }} >
                        {
                            entryFee == 0 ?
                                <FreeButton /> :
                                <PrizeButton prize={entryFee} />
                        }
                    </View>
                </View>
                <View style={{ flex: 0.3, padding: 10, paddingRight: 10, flexDirection: 'row' }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 14, fontWeight: 'bold', borderBottomWidth: 1, }} >{startTime} - {endTime}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <ParticipentsCircle participents={AccessNestedObject(tournament, 'participents')} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function PrizeButton({ prize }) {
    return (
        <View style={styles.buttonContainer} >
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
        </View>
    )
}

function FreeButton() {
    return (
        <View style={[styles.buttonContainer, { backgroundColor: YELLOW }]} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 14, color: TEXT_COLOR, fontWeight: 'bold' }} >
                    FREE
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(95),
        height: 100,
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

export default TournamentWideCard;