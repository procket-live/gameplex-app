import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import HeaderBattleComponent from '../../component/header/header-battle.component';
import { GREY_BG, ON_PRIMARY, TEXT_COLOR, PRIMARY_COLOR, GREEN } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import OfferSlider from '../../component/offer-slider/offer-slider.component';
import BattleCard from '../../component/battle-card/battle-card.component';
import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PrivateApi from '../../api/private.api';
import { navigate } from '../../service/navigation.service';
import Tabs from '../../component/tabs/tabs.component';


function BattleScene({ navigation, user }) {
    const battle = navigation.getParam('battle') || {};
    const [joinedBattle, setJoinedBattle] = useState([]);
    const [loadingJoinedBattle, setLoadingJoinedBattle] = useState(false);

    const game = AccessNestedObject(battle, 'game', {});
    const offers = AccessNestedObject(battle, 'offers', []);
    const matchList = AccessNestedObject(battle, 'match_list', []);
    const [match, setMatch] = useState(null);
    let bottomSheetRef = React.createRef()
    let fall = new Animated.Value(1)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchJoinedTournaments();
    }, []);

    async function fetchJoinedTournaments() {
        const battleId = battle._id;
        setLoadingJoinedBattle(true);
        const result = await PrivateApi.GetJoinedBattle(battleId);
        setLoadingJoinedBattle(true);
        if (result.success) {
            setJoinedBattle(result.response);
        }
    }

    function RenderBottomSheetContent() {
        const walletBalance = parseInt(user.wallet_cash_balance);
        const entryFee = parseInt(match?.entry_fee);

        const lessAmount = Math.abs(walletBalance - entryFee);
        const isLessAmount = walletBalance < entryFee;

        if (match == null) {
            return null;
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
                                onPress={() => {
                                    navigate('AddMoney', { amount: lessAmount });
                                }}
                                style={[styles.buttonContainer, { backgroundColor: PRIMARY_COLOR }]} >
                                <Text style={styles.boldText} >ADD {DisplayPrice(lessAmount)} TO JOIN</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={makeApiCall}
                                style={styles.buttonContainer} >
                                <Text style={styles.boldText} >{entryFee == 0 ? 'JOIN BATTLE' : `JOIN BATTLE FOR ${DisplayPrice(entryFee)}`}</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    async function makeApiCall() {
        if (match == null) {
            return null;
        }
        setLoading(true);
        const result = await PrivateApi.JoinBattle(match._id);
        setLoading(false);
        if (result.success) {
            navigate('BattleChat', { battleQueue: result.response });
            fetchJoinedTournaments();
        }
    }

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
                        loadingJoinedBattle ? "Loading ..." : "No joined battle"
                    }
                </Text>
            </View>
        )
    }

    function joinMatch(match) {
        setMatch(match);
        bottomSheetRef.current?.snapTo(1);
    }

    function proceedToChat(queueEntry) {
        navigate('BattleChat', { battleQueue: queueEntry });
    }

    const renderShadow = () => {
        const animatedShadowOpacity = Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: [1, 0],
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

    return (
        <View style={styles.container} >
            <HeaderBattleComponent
                name={game.name}
                icon={game.thumbnail}
            />
            <View style={{ marginTop: 20, marginBottom: 20 }} >
                <OfferSlider height={100} offers={offers} />
            </View>
            <Tabs>
                <FlatList
                    tabLabel="Select a Battle"
                    style={{ marginTop: 10 }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={matchList}
                    renderItem={({ item }) => <BattleCard item={item} joinMatch={joinMatch} />}
                />
                <FlatList
                    tabLabel="Joined Battle"
                    style={{ marginTop: 10 }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={joinedBattle}
                    ListEmptyComponent={EmptyList}
                    renderItem={({ item }) => <BattleCard item={item.match} queueEntry={item} proceedToChat={proceedToChat} />}
                />
            </Tabs>
            <BottomSheet
                callbackNode={fall}
                enabledInnerScrolling={false}
                initialSnap={0}
                ref={bottomSheetRef}
                snapPoints={[0, 300]}
                renderContent={RenderBottomSheetContent}
                renderHeader={RenderHeaderContent}
            />
            {renderShadow()}
            <Spinner
                visible={loading}
                textContent={'Joining...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>
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
    contentContainer: {
        width: widthPercentageToDP(100),
        height: 250,
        backgroundColor: ON_PRIMARY,
    },
    buttonContainer: {
        width: widthPercentageToDP(95),
        height: 50,
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: GREEN
    },
    boldText: {
        color: ON_PRIMARY,
        fontWeight: 'bold',
        fontSize: 20
    },
    spinnerTextStyle: {
        color: ON_PRIMARY
    }
});

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(BattleScene);