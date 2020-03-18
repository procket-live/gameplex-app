import React from 'react';
import { View, Linking, ImageBackground, TouchableOpacity, Text, StyleSheet, ScrollView, Clipboard } from 'react-native';
import { connect } from 'react-redux';
import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { ON_PRIMARY, PRIMARY_COLOR, TEXT_COLOR, GREY_3, GREY_2, GREY_BG, GREY_1, GREEN, YELLOW, RED } from '../../constant/color.constant';
import ParticipentsCircle from '../../component/participents-circle/participents-circle.component';
import moment from 'moment';
import IconComponent from '../../component/icon/icon.component';
import Tabs from '../../component/tabs/tabs.component';
import { navigate } from '../../service/navigation.service';
import { Title } from '../tournament-how-to-play-scene/tournament-how-to-play.scene';
import { GetTournamentStatus, GetUserGameId, IsJoined } from '../../utils/tournament.utils';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import NotifyService from '../../service/notify.service';
import TextInputComponent from '../../component/text-input/text-input.component';

function TournamentScene(props) {
    const tournament = props.navigation.getParam('tournament');
    const gameId = AccessNestedObject(tournament, 'game._id');
    const date = moment(AccessNestedObject(tournament, 'tournament_start_time')).format('MMM DD');
    const time = moment(AccessNestedObject(tournament, 'tournament_start_time')).format('hh:mm A');
    const name = AccessNestedObject(tournament, 'tournament_name');
    const prize = AccessNestedObject(tournament, 'prize', []);
    const rank = AccessNestedObject(tournament, 'rank', []);
    const tournamentMeta = AccessNestedObject(tournament, 'tournament_meta', []);
    const positions = ['flex-start', 'center', 'flex-end'];
    const message = AccessNestedObject(tournament, 'form_message', '');
    const tnc = AccessNestedObject(tournament, 'tnc_link', '')
    const participents = AccessNestedObject(tournament, 'participents', []);
    const tournamentStatus = GetTournamentStatus(tournament);
    const userGameIdResult = GetUserGameId(props.user, gameId);
    const isJoined = IsJoined(participents, AccessNestedObject(props, 'user._id'))
    const roomId = AccessNestedObject(tournament, 'room_detail.room_id', '');
    const roomPassword = AccessNestedObject(tournament, 'room_detail.room_password', '');

    function joinTournament() {
        if (!userGameIdResult.success) {
            NotifyService.notify({ title: "Please add game user id first.", type: 'error' })
            return;
        }

        navigate('Checkout', { tournament })
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <ImageBackground
                    style={styles.wallpaper}
                    source={{ uri: AccessNestedObject(tournament, 'game.wallpaper') }}
                >
                    <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black', opacity: 0.4 }]} />
                    <View style={{ flex: 2, justifyContent: 'flex-end' }} >
                        <Text style={styles.title} >{name}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                        <ParticipentsCircle />
                    </View>
                </ImageBackground>
                <View style={styles.container2} >
                    <View style={styles.detailsContainer} >
                        <View style={styles.detailsContainer} >
                            <View style={{ paddingTop: 2, paddingBottom: 2 }} >
                                <Text style={{ fontSize: 12, color: GREY_2 }} >
                                    {`${date} - STARTING AT ${time}`}
                                </Text>
                            </View>
                            <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', height: 50 }} >
                                {
                                    prize.map((item, index) => (
                                        <View style={{ flex: 1 }} >
                                            <View style={{ flex: 1, alignItems: positions[index] }} >
                                                <Text style={{ fontSize: 12, color: GREY_3 }} >
                                                    {item.key}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: positions[index] }} >
                                                <Text style={{ fontSize: 14, fontWeight: '500', color: TEXT_COLOR }} >
                                                    {DisplayPrice(item.value)}
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', height: 50 }} >
                                {
                                    tournamentMeta.map((item, index) => (
                                        <View style={{ flex: 1 }} >
                                            <View style={{ flex: 1, alignItems: positions[index] }} >
                                                <Text style={{ fontSize: 12, color: GREY_3 }} >
                                                    {item.key}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: positions[index] }} >
                                                <Text style={{ fontSize: 14, fontWeight: '500', color: TEXT_COLOR }} >
                                                    {item.value}
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                    {
                        (isJoined && roomId && roomPassword) ?
                            <View style={[styles.detailsContainer, { marginTop: 10 }]} >
                                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 5 }} >
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: GREY_2 }} >
                                        Room Details
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', height: 40, padding: 5 }} >
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 14, color: GREY_1 }} >
                                            ROOM ID
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_COLOR }} >
                                            {roomId}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                                        <TouchableOpacity
                                            style={{ padding: 5, borderWidth: 1, borderRadius: 5, flexDirection: 'row', borderColor: PRIMARY_COLOR, alignItems: 'center' }}
                                            onPress={() => {
                                                Clipboard.setString(roomId);
                                                NotifyService.notify({ title: 'Room id copied', type: 'success', duration: '500' })
                                            }}
                                        >
                                            <IconComponent font={'fontawesome'} size={16} focused tintColor={PRIMARY_COLOR} name={"copy"} />
                                            <Text style={{ color: PRIMARY_COLOR, fontSize: 12, marginRight: 5, marginLeft: 5 }} >Copy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: 40, padding: 5 }} >
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 14, color: GREY_1 }} >
                                            ROOM PASSWORD
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_COLOR }} >
                                            {roomPassword}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                                        <TouchableOpacity
                                            style={{ padding: 5, borderWidth: 1, borderRadius: 5, flexDirection: 'row', borderColor: PRIMARY_COLOR, alignItems: 'center' }}
                                            onPress={() => {
                                                Clipboard.setString(roomPassword)
                                                NotifyService.notify({ title: 'Room password copied', type: 'success', duration: '500' })
                                            }}
                                        >
                                            <IconComponent font={'fontawesome'} size={16} focused tintColor={PRIMARY_COLOR} name={"copy"} />
                                            <Text style={{ color: PRIMARY_COLOR, fontSize: 12, marginRight: 5, marginLeft: 5 }} >Copy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> : null
                    }
                    <View style={[styles.detailsContainer, { marginTop: 10 }]} >
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 5 }} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: GREY_2 }} >
                                PUBG USER ID: {userGameIdResult.success ? userGameIdResult.response : 'NOT SET'}
                            </Text>
                        </View>
                        {
                            !userGameIdResult.success ?
                                <View style={{ flex: 2, flexDirection: 'row' }} >
                                    <View style={{ flex: 1, padding: 5 }} >
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigate('AddGameUserId', { gameId });
                                            }}
                                            style={{ borderWidth: 1, height: 35, borderRadius: 10, borderColor: PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <IconComponent font="fontawesome" focused tintColor={PRIMARY_COLOR} name="pen" size={14} />
                                            <Text style={{ fontSize: 14, color: PRIMARY_COLOR, marginLeft: 10 }} >ADD</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 3, padding: 5 }} >
                                        <TouchableOpacity
                                            onPress={() => navigate('HowToGetUserId')}
                                            style={{ borderWidth: 1, height: 35, borderRadius: 10, borderColor: PRIMARY_COLOR, backgroundColor: ON_PRIMARY, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <IconComponent font="fontawesome" focused tintColor={PRIMARY_COLOR} name="user" size={14} />
                                            <Text style={{ fontSize: 14, color: PRIMARY_COLOR, marginLeft: 10 }} >HOW TO GET PUBG USER ID</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : null
                        }
                        <TouchableOpacity
                            onPress={() => navigate('TournamentHowToPlay')}
                            style={{ borderWidth: 1, height: 35, borderRadius: 10, borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10, margintBottom: 10 }}>
                            <IconComponent font="fontawesome" focused tintColor={ON_PRIMARY} name="list" size={14} />
                            <Text style={{ fontSize: 14, color: ON_PRIMARY, marginLeft: 10 }} >TOURNAMENT INSTRUCTIONS</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.detailsContainer, { marginTop: 10, overflow: 'hidden', height: 390 }]} >
                        <Tabs>
                            <PrizeTab key="0" tabLabel="Prize" rank={rank} />
                            {
                                (message && tnc) ?
                                    <Instruction key="1" tabLabel="Organizer Instructions" message={message} tnc={tnc} /> : null
                            }
                            {
                                participents.length ?
                                    <Leaderboard key="2" tabLabel="Participents" participents={participents} /> : null
                            }
                        </Tabs>
                    </View>
                </View>
            </ScrollView>
            <RenderButton
                tournament={tournament}
                tournamentStatus={tournamentStatus}
                joinTournament={joinTournament}
                isJoined={isJoined}
            />
        </>
    )
}

function RenderButton({ tournamentStatus, joinTournament, tournament, isJoined }) {
    if (isJoined) {
        return (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                    JOINED. TOURNAMENT WILL START
                    {` ${moment(AccessNestedObject(tournament, 'tournament_start_time')).fromNow().toUpperCase()}`}
                </Text>
            </View>
        )
    }

    if (tournamentStatus == "pending") {
        return (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: RED, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                    REGISTRATION WILL START IN SOME TIME
                </Text>
            </View>
        )
    }

    if (tournamentStatus == "registration_will_start") {
        return (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                    REGISTRATION WILL STARTS
                    {` ${moment(AccessNestedObject(tournament, 'registration_opening')).fromNow().toUpperCase()}`}
                </Text>
            </View>
        )
    }

    if (tournamentStatus == "registration_closed") {
        return (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: RED, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                    REGISTRATION CLOSED
                </Text>
            </View>
        )
    }

    if (tournamentStatus == "registration_open") {
        return (
            <TouchableOpacity
                onPress={joinTournament}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                    JOIN TOURNAMENT
                </Text>
            </TouchableOpacity>
        )
    }

    if (tournamentStatus == "slot_full") {
        return (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: YELLOW, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                    ALL SLOTS FULL
                </Text>
            </View>
        )
    }

    if (tournamentStatus == "tournament_started") {
        return (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: YELLOW, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                    TOURNAMENT STARTED
                </Text>
            </View>
        )
    }
}

function PrizeTab({ rank }) {
    return (
        <ScrollView style={{ padding: 10 }} >
            {
                rank.filter((item) => item.amount || item.props).map((item) => (
                    <RankDetail rank={item.rank} amount={item.amount} props={item.props} />
                ))
            }
            <Title>Note:</Title>
            <Text style={{ textAlign: 'left', fontSize: 14, paddingBottom: 5 }} >
                1. All Scores and ranks are subjected to verification after tournament ends to ensure fairplay.
            </Text>
            <Text style={{ textAlign: 'left' }} >
                2. Actual prize may change if these is a tie at any winning ranks.
            </Text>
        </ScrollView>
    )
}

function Instruction({ message, tnc }) {
    return (
        <ScrollView style={{ padding: 10 }} >
            {
                message ?
                    <>
                        <Title>Instruction:</Title>
                        <Text style={{ textAlign: 'left', fontSize: 14, paddingBottom: 10 }} >
                            {message}
                        </Text>
                    </> : null
            }
            {
                tnc ?
                    <>
                        <Title>TNC:</Title>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(tnc);
                            }}
                        >
                            <Text style={{ textAlign: 'left', fontSize: 14, paddingBottom: 5, color: PRIMARY_COLOR }} >
                                Open TNC Link
                            </Text>
                        </TouchableOpacity>
                    </> : null
            }
        </ScrollView>
    )
}


function RankDetail({ rank, amount, props }) {
    return (
        <View style={{ backgroundColor: GREY_BG, padding: 5, flexDirection: 'row', height: 35, marginBottom: 5 }} >
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text>Rank {rank}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                {
                    amount ? <Text>{DisplayPrice(amount)}</Text> : null
                }
                {
                    props ? <Text>{props}</Text> : null
                }
            </View>
        </View>
    )
}

function ParticipentItem({ participent }) {
    return (
        <View style={{ borderBottomColor: GREY_BG, borderBottomWidth: 1, flexDirection: 'row', height: 50, }} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <IconComponent
                    font="fontawesome"
                    size={25}
                    name="user-circle"
                    focused
                    tintColor={GREY_1}
                />
            </View>
            <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text style={{ color: TEXT_COLOR, fontSize: 18 }} >{participent.name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                <IconComponent
                    font="fontawesome"
                    size={25}
                    name="mobile"
                    focused
                    tintColor={participent.online ? GREEN : YELLOW}
                />
            </View>
        </View>
    )
}

function Leaderboard({ participents = [] }) {
    return (
        <ScrollView style={{ padding: 10 }} >
            {
                participents.filter((item) => item.amount || item.props).map((item) => (
                    <ParticipentItem participent={item} />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR
    },
    container2: {
        padding: 10
    },
    wallpaper: {
        height: 130,
        flexDirection: 'row',
        padding: 15
    },
    title: {
        fontSize: 18,
        color: ON_PRIMARY
    },
    detailsContainer: {
        backgroundColor: ON_PRIMARY,
        borderRadius: 10,
        padding: 5
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    inputText: {
        borderWidth: 1,
        borderColor: GREY_BG,
        width: 70,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        textAlign: 'center'
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
})


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(TournamentScene);
