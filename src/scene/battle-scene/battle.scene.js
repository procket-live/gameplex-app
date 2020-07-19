import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';

import HeaderBattleComponent from '../../component/header/header-battle.component';
import { GREY_BG, ON_PRIMARY, TEXT_COLOR, PRIMARY_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import OfferSlider from '../../component/offer-slider/offer-slider.component';
import BattleCard from '../../component/battle-card/battle-card.component';
import { AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';
import { navigate } from '../../service/navigation.service';
import Tabs from '../../component/tabs/tabs.component';
import JoinBattleComponent from '../../component/join-battle-component/join-battle.component';
import TournamentWideComponent from '../../component/tournament-wide-card/tournament-wide-card.component';
import { refreshUser } from '../../action/user.action';
import { useQuery } from '@apollo/react-hooks';
import { GetPlayground, GetPlaygroundDetail } from '../../graphql/graphql.query';
import TournamentCard from '../../component/tournament-card/tournament.card';


function BattleScene({ navigation, user, refreshUser }) {
    const id = navigation.getParam('id');
    const title = navigation.getParam('title');
    const icon = navigation.getParam('icon');
    console.log('idididid', id);

    const [playground, setPlayground] = useState({});

    const { loading } = useQuery(GetPlaygroundDetail, {
        variables: { playground_id: id },
        onCompleted({ getPlaygroundDetail }) {
            setPlayground(getPlaygroundDetail);
        }
    })

    console.log('playgrodddund', playground);

    // const battle = navigation.getParam('battle') || {};
    // const [joinedBattle, setJoinedBattle] = useState([]);
    // const [loadingJoinedBattle, setLoadingJoinedBattle] = useState(false);

    // const game = AccessNestedObject(battle, 'game', {});
    // const offers = AccessNestedObject(battle, 'offers', []);
    // const matchList = AccessNestedObject(battle, 'match_list', []);
    // const tournamentList = AccessNestedObject(battle, 'tournament_list', []);
    // const [match, setMatch] = useState(null);
    // let bottomSheetRef = React.createRef()
    let fall = new Animated.Value(1)
    // const instructions = AccessNestedObject(battle, 'instructions', []);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        // fetchJoinedTournaments();
    }, []);

    // async function fetchJoinedTournaments() {
    //     const battleId = battle._id;
    //     setLoadingJoinedBattle(true);
    //     const result = await PrivateApi.GetJoinedBattle(battleId);
    //     setLoadingJoinedBattle(false);
    //     if (result.success) {
    //         setJoinedBattle(result.response);
    //     }
    // }

    function RenderBottomSheetContent() {
        const walletBalance = parseInt(user.wallet_cash_balance);
        const entryFee = parseInt(match?.entry_fee);

        const lessAmount = Math.abs(walletBalance - entryFee);
        const isLessAmount = walletBalance < entryFee;

        if (match == null) {
            return null;
        }

        return (
            <JoinBattleComponent
                match={match}
                walletBalance={walletBalance}
                entryFee={entryFee}
                lessAmount={lessAmount}
                isLessAmount={isLessAmount}
                makeApiCall={makeApiCall}
            />
        )
    }

    // function makeApiCall() {
    //     if (match == null) {
    //         return null;
    //     }

    //     bottomSheetRef.current?.snapTo(0);

    //     setTimeout(async () => {
    //         setLoading(true);
    //         const result = await PrivateApi.JoinBattle(match._id);
    //         setLoading(false);
    //         if (result.success) {
    //             // fetchJoinedTournaments();
    //             navigate('BattleChat', { battleQueue: result.response });
    //             refreshUser();
    //         }
    //     }, 100)
    // }

    function RenderHeaderContent() {
        return (
            <View style={styles.headerContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: ON_PRIMARY }} >Join Battle</Text>
            </View>
        )
    }

    function EmptyList() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 18, color: TEXT_COLOR }} >
                    {
                        false ? "Loading ..." : "No joined battle"
                    }
                </Text>
            </View>
        )
    }

    function joinMatch(match) {
        setMatch(match);
        bottomSheetRef.current?.snapTo(1);
    }

    function joinTournament(tournament) {

    }

    function proceedToChat(queueEntry) {
        navigate('BattleChat', { battleQueue: queueEntry });
    }

    const renderShadow = () => {
        const animatedShadowOpacity = Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: [0.6, 0],
            interpolate: Animated.Extrapolate
        })

        return (
            <Animated.View
                pointerEvents="none"
                style={[
                    {
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: '#000',
                    },
                    {
                        opacity: animatedShadowOpacity
                    },
                ]}
            />
        )
    }

    console.log('tTTTT', AccessNestedObject(playground, 'game.wallpaper'))

    return (
        <View style={styles.container} >
            <HeaderBattleComponent
                name={title}
                icon={icon}
                action={() => navigate('InstructionGenerator', { title: "How to Play?", steps: [] })}
                actionText="Info"
            />
            {/* <View style={{ padding: widthPercentageToDP(3) }} >
                <Image
                    source={{ uri: AccessNestedObject(playground, 'game.wallpaper') }}
                    style={{ width: widthPercentageToDP(94), height: 150, borderRadius: 10 }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                {/* <OfferSlider height={100} offers={offers} /> */}
            {/* </View> */}
            {/* < Tabs > */}
            <FlatList
                tabLabel="Tournaments"
                style={{ marginTop: 10 }}
                contentContainerStyle={{ alignItems: 'center' }}
                data={playground?.tournaments}
                renderItem={({ item }) =>
                    <TournamentCard item={item} />
                    // <TournamentWideComponent joinTournament={joinTournament} />
                }
            />
            {/* <FlatList
                    tabLabel={"Joined Battle"}
                    style={{ marginTop: 10 }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={[]}
                    ListEmptyComponent={EmptyList}
                    renderItem={({ item }) => <BattleCard item={item.match} queueEntry={item} proceedToChat={proceedToChat} />}
                /> */}
            {/* </Tabs > */}
            {/* <BottomSheet
                callbackNode={fall}
                enabledInnerScrolling={false}
                initialSnap={0}
                ref={bottomSheetRef}
                snapPoints={[0, 300]}
                renderContent={RenderBottomSheetContent}
                renderHeader={RenderHeaderContent}
            /> */}
            {renderShadow()}
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREY_BG
    },
    wallpaper: {
        width: widthPercentageToDP(100)
    },
    headerContainer: {
        width: widthPercentageToDP(100),
        height: 50,
        padding: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    spinnerTextStyle: {
        color: ON_PRIMARY
    }
});

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { refreshUser })(BattleScene);