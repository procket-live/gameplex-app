import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { GREY_BG, TEXT_COLOR, GREY_3, ON_PRIMARY, PRIMARY_COLOR, YELLOW, RED, GREEN } from '../../constant/color.constant';
import IconComponent from '../icon/icon.component';
import TournamentCardPlaceholder from './tournament.card.placeholder';
import { AccessNestedObject, DisplayPrice, Camelize, Capitalize, GetReadableDate } from '../../utils/common.util';
import moment from 'moment';
import { navigate } from '../../service/navigation.service';
import ParticipentsCircle from '../participents-circle/participents-circle.component';
import { GetTournamentStatus, IsJoined } from '../../utils/tournament.utils';
console.disableYellowBox = true;

const WIDTH = 93;
const positions = ['flex-start', 'center', 'flex-end'];

const TournamentCard = ({ item: tournament = {}, loading = false }) => {
    if (loading) {
        return <TournamentCardPlaceholder />
    }

    const isJoined = false;

    const name = AccessNestedObject(tournament, 'name');
    const imageUrl = AccessNestedObject(tournament, 'game.wallpaper');
    const date = GetReadableDate(tournament?.tournament_start, 'MMM DD');
    const time = GetReadableDate(tournament?.tournament_end, 'HH:mm A');

    const registrationStartDate = GetReadableDate(tournament?.registration_start, 'MMM DD');
    const registrationStartTime = GetReadableDate(tournament?.registration_start, 'hh:mm A');

    const participents = AccessNestedObject(tournament, 'participents', []);
    const tournamentStatus = GetTournamentStatus(tournament);
    const size = AccessNestedObject(tournament, 'max_size');
    const organizerName = AccessNestedObject(tournament, 'organizer.organizer_name', '')
    const tournamentMeta = AccessNestedObject(tournament, 'tournament_meta', []);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigate('Tournament', { id: tournament.id })}
        >
            {
                isJoined ?
                    <View style={{ height: 20, backgroundColor: GREEN, position: 'absolute', top: 0, right: -2, zIndex: 1, borderTopRightRadius: 10, paddingLeft: 10, paddingRight: 10 }} >
                        <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                            Joined
                        </Text>
                    </View> : null
            }
            <View style={styles.imageContainer} >
                <Image
                    style={styles.image}
                    source={{ uri: imageUrl }}
                />
            </View>
            <View style={styles.detailsContainer} >
                <View style={{ height: 40, paddingTop: 2, paddingBottom: 2, flexDirection: 'row' }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                            {`${date} - STARTING AT ${time}`}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }} >
                        <IconComponent
                            font="fontawesome"
                            size={12}
                            name="cog"
                            tintColor={GREEN}
                            focused
                        />
                        <Text style={{ fontSize: 12, color: GREEN, paddingLeft: 3 }} >
                            Organized by
                        </Text>
                        <Text style={{ fontSize: 12, color: TEXT_COLOR, paddingLeft: 5, fontWeight: 'bold' }} >
                            {organizerName}
                        </Text>
                    </View>
                </View>
                <View style={{ height: 40, paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center' }} >
                    <IconComponent
                        font="fontawesome"
                        size={20}
                        name="mobile"
                    />
                    <Text style={{ fontSize: 16, color: GREY_3, marginLeft: 10, fontWeight: '500' }} >
                        {name}
                    </Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', height: 50 }} >
                    {
                        tournamentMeta.map((item, index) => (
                            <View style={{ flex: 1 }} >
                                <View style={{ flex: 1, alignItems: positions[index] }} >
                                    <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                        {item.key}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: positions[index] }} >
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                        {Capitalize(item.value)}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', height: 50 }} >
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: positions[0] }} >
                            <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                Entry Fee
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: positions[0] }} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                {DisplayPrice(AccessNestedObject(tournament, 'tournament_payment.entry_fee'))}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: positions[1] }} >
                            <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                Prize Pool
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: positions[1] }} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                {DisplayPrice(AccessNestedObject(tournament, 'tournament_payment.prize_pool'))}
                            </Text>
                        </View>
                    </View>
                    {
                        AccessNestedObject(tournament, 'tournament_payment.tournament_reward_payment', []).map((item) => (
                            <View style={{ flex: 1 }} >
                                <View style={{ flex: 1, alignItems: positions[2] }} >
                                    <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                        {item.key.key}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: positions[2] }} >
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                        {DisplayPrice(item.amount)}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </View>
            {
                tournamentStatus == "pending" ?
                    <View style={[styles.bottomContainer, { paddingTop: 15, paddingBottom: 15 }]} >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                            <Text style={{ fontSize: 14, color: YELLOW }} >
                                PENDING
                            </Text>
                        </View>
                    </View> : null
            }
            {
                tournamentStatus == "registration_closed" ?
                    <View style={[styles.bottomContainer, { paddingTop: 15, paddingBottom: 15 }]} >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                            <Text style={{ fontSize: 14, color: YELLOW }} >
                                REGISTRATION CLOSED
                            </Text>
                        </View>
                    </View> : null
            }
            {
                tournamentStatus == "registration_will_start" ?
                    <View style={[styles.bottomContainer, { paddingTop: 15, paddingBottom: 15 }]} >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                            <Text style={{ fontSize: 10, color: TEXT_COLOR }} >
                                REGISTRATION STARTING
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 10, fontWeight: '500', color: PRIMARY_COLOR }} >
                                {`${registrationStartDate} AT ${registrationStartTime}`}
                            </Text>
                        </View>
                    </View> : null
            }
            {
                tournamentStatus == "registration_open" ?
                    <View style={styles.bottomContainer} >
                        <ParticipentsCircle participents={participents} />
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 10, fontWeight: '500', color: PRIMARY_COLOR }} >
                                {participents.length}/{size} Signed
                            </Text>
                        </View>
                    </View> : null
            }
            {
                tournamentStatus == "slot_full" ?
                    <View style={styles.bottomContainer} >
                        <ParticipentsCircle participents={participents} />
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: RED }} >
                                SLOT FULL
                            </Text>
                        </View>
                    </View> : null
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(WIDTH),
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: GREY_BG,
        backgroundColor: ON_PRIMARY,
        marginTop: 5,
        marginBottom: 5
    },
    detailsContainer: {
        height: 200,
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: widthPercentageToDP(WIDTH),
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    image: {
        width: widthPercentageToDP(WIDTH),
        height: 120,
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    bottomContainer: {
        padding: 5,
        borderTopWidth: 1,
        borderColor: GREY_BG,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 30
    }
})

export default TournamentCard;
