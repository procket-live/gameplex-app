import React, { useState, useEffect } from 'react';
import { View, Linking, ImageBackground, TouchableOpacity, Text, StyleSheet, ScrollView, Clipboard, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { AccessNestedObject, DisplayPrice, ShareTournament, GetReadableDate, Capitalize } from '../../utils/common.util';
import { ON_PRIMARY, PRIMARY_COLOR, TEXT_COLOR, GREY_3, GREY_2, GREY_BG, GREY_1, GREEN, YELLOW, RED } from '../../constant/color.constant';
import ParticipentsCircle from '../../component/participents-circle/participents-circle.component';
import moment from 'moment';
import IconComponent from '../../component/icon/icon.component';
import Tabs from '../../component/tabs/tabs.component';
import { navigate } from '../../service/navigation.service';
import { Title } from '../instruction-generator-scene/instruction-generator.scene';
import { GetTournamentStatus, GetUserGameId, IsJoined } from '../../utils/tournament.utils';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import NotifyService from '../../service/notify.service';
import HeaderBattleComponent from '../../component/header/header-battle.component';
import { VerifiedLogo } from '../../config/image.config';
import GameUserIdComponent from '../../component/game-user-id/game-user-id.component';
import { useQuery } from '@apollo/react-hooks';
import { GetFullTournamentQuery } from '../../graphql/graphql.query';

const positions = ['flex-start', 'center', 'flex-end'];
const positions2 = ['flex-start', 'flex-end'];

function TournamentScene(props) {
    const tournamentId = props.navigation.getParam('id');
    const [tournament, setTournament] = useState({});

    const gameId = AccessNestedObject(tournament, 'game.id');
    const gameName = AccessNestedObject(tournament, 'game.name');
    const gameTarget = AccessNestedObject(tournament, 'game.game_target');
    const gameRoute = AccessNestedObject(tournament, 'game.game_route');

    const date = GetReadableDate(tournament?.tournament_start, 'MMM DD');
    const time = GetReadableDate(tournament?.tournament_end, 'hh:mm A');
    const name = AccessNestedObject(tournament, 'name');
    const tournamentMeta = AccessNestedObject(tournament, 'tournament_meta', []);
    const status = AccessNestedObject(tournament, 'status');

    const message = AccessNestedObject(tournament, 'form_message', '');
    const tnc = AccessNestedObject(tournament, 'tnc_link', '')
    const participents = AccessNestedObject(tournament, 'participents', []).filter((item = {}) => item.user);
    const tournamentStatus = GetTournamentStatus(tournament);
    const isJoined = IsJoined(participents, AccessNestedObject(props, 'user._id'))

    const organizerName = AccessNestedObject(tournament, 'organizer.organizer_name', '')
    const organizerVerified = AccessNestedObject(tournament, 'organizer.verified', false)
    const endTime = AccessNestedObject(tournament, 'tournament_end_time');

    const { loading } = useQuery(GetFullTournamentQuery, {
        variables: { id: tournamentId },
        onCompleted({ getTournament }) {
            console.log("getTournament", getTournament)
            if (getTournament) {
                setTournament(getTournament);
            }
        }
    })

    let perKill = 0;
    const rankWise = {}

    function joinTournament() {

    }

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <ActivityIndicator
                    animating
                    size="large"
                    color={TEXT_COLOR}
                />
            </View>
        )
    }

    return (
        <>
            <HeaderBattleComponent
                name={gameName}
                actionIcon={"share"}
                actionText="Share"
                action={() => {
                    ShareTournament(tournament);
                }}
            />
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
                                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 12, color: GREY_2 }} >
                                        {`${date} - STARTING AT ${time}`}
                                    </Text>
                                </View>
                            </View>
                            {/* {
                                organizerName ?
                                    <>
                                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', height: 40 }} >
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
                                    </> : null
                            } */}
                            {
                                status == "active" ?
                                    <>
                                        <View style={{ paddingTop: 2, paddingBottom: 2 }} >
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 12, color: GREEN, fontWeight: 'bold' }} >
                                                    Tournament will end in {moment(endTime).fromNow()}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ paddingTop: 2, paddingBottom: 2 }} >
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 12, color: PRIMARY_COLOR, fontWeight: 'bold' }} >
                                                    {moment(endTime).fromNow()} ranking will be created. According to score
                                                    ranking will be decided. Winning amount will be transferred to Wallet.
                                                </Text>
                                            </View>
                                        </View>
                                    </> : null
                            }
                            {
                                tournamentMeta.length ?
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
                                                            {Capitalize(item.value)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                    </View> : null
                            }
                            <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', height: 50 }} >
                                <View style={{ flex: 1 }} >
                                    <View style={{ flex: 1, alignItems: positions[0] }} >
                                        <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                            Organizer
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: positions[0], flexDirection: 'row', alignItems: 'center' }} >
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: TEXT_COLOR }} >
                                            {organizerName}
                                        </Text>
                                        {
                                            !organizerVerified ?
                                                <View
                                                    style={{ marginLeft: 5 }}
                                                >
                                                    <Image source={VerifiedLogo()} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                </View> : null
                                        }
                                    </View>
                                </View>
                                <View style={{ flex: 1 }} >
                                    <View style={{ flex: 1, alignItems: positions[1] }} >
                                        <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                            Entry Fee
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: positions[1] }} >
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                            {DisplayPrice(AccessNestedObject(tournament, 'tournament_payment.entry_fee'))}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }} >
                                    <View style={{ flex: 1, alignItems: positions[2] }} >
                                        <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                            Prize Pool
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: positions[2] }} >
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                            {DisplayPrice(AccessNestedObject(tournament, 'tournament_payment.prize_pool'))}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* {
                        (isJoined && roomId && roomPassword && tournament.status != "completed") ?
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
                    } */}
                    <GameUserIdComponent
                        gameId={gameId}
                    />
                    <View style={[styles.detailsContainer, { marginTop: 10, overflow: 'hidden', height: 500 }]} >
                        <Tabs>
                            {
                                participents.length ?
                                    <Leaderboard key="2" tabLabel="Participents" payoutReleased={tournament.payout_released} participents={participents} rankWise={rankWise} perKill={perKill} onlineList={[]} gameTarget={gameTarget} /> : null
                            }
                            <PrizeTab key="0" tabLabel="Prize" prizeDetails={AccessNestedObject(tournament, 'tournament_payment', {})} />
                        </Tabs>
                    </View>
                </View>
            </ScrollView>
            <RenderButton
                status={status}
                gameRoute={gameRoute}
                gameTarget={gameTarget}
                tournament={tournament}
                tournamentStatus={tournamentStatus}
                joinTournament={joinTournament}
                isJoined={isJoined}
            />
        </>
    )
}

function RenderButton({ status, tournamentStatus, joinTournament, tournament }) {
    // if (isJoined) {
    //     if (gameTarget == "native") {
    //         return (
    //             <TouchableOpacity
    //                 onPress={() => {
    //                     navigate(gameRoute, { callback: updateScore });
    //                 }}
    //                 style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' }} >
    //                 <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
    //                     PLAY
    //                 </Text>
    //             </TouchableOpacity>
    //         )
    //     }

    //     return (
    //         <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: widthPercentageToDP(100), height: 50, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' }} >
    //             <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
    //                 JOINED. TOURNAMENT WILL START
    //                 {` ${moment(AccessNestedObject(tournament, 'tournament_start_time')).fromNow().toUpperCase()}`}
    //             </Text>
    //         </View>
    //     )
    // }

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

    return null;
}

function PrizeTab({ prizeDetails }) {
    const rewardPayment = AccessNestedObject(prizeDetails, 'tournament_reward_payment', []);
    const rankPayment = AccessNestedObject(prizeDetails, 'tournament_rank_payment', []);

    return (
        <ScrollView style={{ padding: 10 }} >
            <View style={{ paddingBottom: 15 }} >
                <Title>Rewards:</Title>
                {
                    rewardPayment.map((item) => (
                        <RankDetail rank={item.key.key} amount={item.amount} />
                    ))
                }
            </View>
            <View style={{ paddingBottom: 15 }} >
                <Title>Rank Rewards:</Title>
                {rankPayment.map((item) => (<RankDetail rank={`Rank #${item.rank}`} amount={item.amount} />))}
            </View>
            <Title>Note:</Title>
            <Text style={{ textAlign: 'left', fontSize: 14, paddingBottom: 5 }} >
                1. All Scores and ranks are subjected to verification after tournament ends to ensure fairplay.
            </Text>
            <Text style={{ textAlign: 'left' }} >
                2. Actual prize may change if these is a tie at any winning ranks.
            </Text>
            <Text style={{ textAlign: 'left' }} >
                3. Hacking is not allowed.
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


function RankDetail({ rank, amount }) {
    return (
        <View style={{ backgroundColor: GREY_BG, padding: 5, flexDirection: 'row', height: 35, marginBottom: 5 }} >
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text>{rank}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                {
                    amount ? <Text>{DisplayPrice(amount)}</Text> : null
                }
            </View>
        </View>
    )
}

function ParticipentItem({ participent = {}, perKill = 0, rankWise = {}, online, gameTarget }) {
    const user = AccessNestedObject(participent, 'user', {});
    const resultMeta = AccessNestedObject(participent, 'result_meta', {});
    const kill = resultMeta.kills;
    const rank = resultMeta.rank;
    const score = resultMeta.score;
    const amount = (rankWise[rank] || 0) + ((kill || 0) * (perKill || 0))
    return (
        <View style={{ borderBottomColor: GREY_BG, borderBottomWidth: 1, flexDirection: 'row', height: 50, }} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                {
                    user.profile_image ?
                        <>
                            <Image source={{ uri: user.profile_image }} style={{ width: 25, height: 25 }} resizeMode="contain" />
                            {
                                online ?
                                    <View style={{ width: 15, height: 15, backgroundColor: GREEN, borderRadius: 15, position: 'absolute', right: 5, bottom: 5, borderWidth: 1, borderColor: ON_PRIMARY }} />
                                    : null
                            }
                        </>
                        :
                        <IconComponent
                            font="fontawesome"
                            size={25}
                            name="user-circle"
                            focused
                            tintColor={GREY_1}
                        />
                }
            </View>
            <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text style={{ color: TEXT_COLOR, fontSize: 18 }} >{AccessNestedObject(user, 'name')}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold' }} >{rank ? `#${rank}` : '--'}</Text>
            </View>
            {
                gameTarget == "native" ?
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold' }} >{score || 0}</Text>
                    </View> : null
            }
            {
                gameTarget == "extern" ?
                    <>
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                            {
                                kill ?
                                    <Text style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold' }} >{kill}</Text>
                                    : null
                            }
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                            <Text style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold' }} >{DisplayPrice(amount)}</Text>
                        </View>
                    </>
                    : null
            }

        </View>
    )
}

function Leaderboard({ participents = [], rankWise, perKill, payoutReleased, gameTarget }) {

    const list = participents.sort((first = {}, second = {}) => {
        return Number(AccessNestedObject(second, 'result_meta.rank', 0)) - Number(AccessNestedObject(first, 'result_meta.rank', 0))
    });

    return (
        <ScrollView style={{ padding: 10 }} >
            <View style={{ flexDirection: 'row', height: 50 }} >
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >

                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <Text style={{ color: TEXT_COLOR, fontSize: 14, fontWeight: 'bold' }} >Rank</Text>
                </View>
                {
                    gameTarget == "native" ?
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                            <Text style={{ color: TEXT_COLOR, fontSize: 14, fontWeight: 'bold' }} >Score</Text>
                        </View> : null
                }
                {
                    gameTarget == "extern" ?
                        <>
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ color: TEXT_COLOR, fontSize: 14, fontWeight: 'bold' }} >Kills</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ color: TEXT_COLOR, fontSize: 14, fontWeight: 'bold' }} >Won</Text>
                            </View>
                        </> : null
                }
            </View>
            {
                list.map((item) => (
                    <ParticipentItem participent={item} rankWise={rankWise} perKill={perKill} online={[]} gameTarget={gameTarget} />
                ))
            }
            {
                payoutReleased ?
                    <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'center' }} >
                        <IconComponent
                            font="fontawesome"
                            size={25}
                            name="check-circle"
                            focused
                            tintColor={GREEN}
                        />
                        <Text style={{ color: GREEN, fontSize: 14, fontWeight: 'bold', paddingLeft: 10 }} >Payout Released</Text>
                    </View> : null
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
    user: state.user,
    onlineList: state.online
});

export default connect(mapStateToProps)(TournamentScene);
