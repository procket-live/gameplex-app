import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { PRIMARY_COLOR, TEXT_COLOR, GREY_1, GREY_BG, GREEN, RED, ON_PRIMARY } from '../../constant/color.constant';
import PrivateApi from '../../api/private.api';
import { AccessNestedObject } from '../../utils/common.util';
import IconComponent from '../../component/icon/icon.component';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';
import moment from 'moment';
import ButtonComponent from '../../component/button/button.component';
import Tabs from '../../component/tabs/tabs.component';
import NotifyService from '../../service/notify.service';
import MenuItem from '../../component/menu-item/menu-item.component';
import { navigatePop, navigate } from '../../service/navigation.service';

class ManageTournamentScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tournament: {},
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = async () => {
        const id = this.props.navigation.getParam('id');
        this.setState({ loading: true });
        const result = await PrivateApi.GetTournament(id);
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    publish = () => {
        if (this.isGeneralDetailSet() && this.isPrizeDetailSet() && this.isRankDetailSet() && this.isRegistrationDetailSet()) {
            this.makePublic();
        } else {
            NotifyService.notify({
                title: 'Unable to proceed',
                message: 'Please complete all tournament detail to publish tournament',
                type: 'error'
            })
        }
    }

    finish = () => {
        const { tournament } = this.state;
        const callback = this.props.navigation.getParam('callback');
        const queueEntry = this.props.navigation.getParam('queueEntry');

        Alert.alert("Complete tournament?", "Are you sure you want to finish tournament.", [
            { text: "Calcel", style: "cancel" },
            {
                text: "Proceed",
                onPress: async () => {
                    this.setState({ loading: true });
                    const result = await PrivateApi.UpdateTournament(tournament._id, { status: 'completed' });
                    this.setState({ loading: false });
                    if (result.success) {
                        if (queueEntry) {
                            this.payoutBattleQueue();
                        } else {
                            callback();
                            navigatePop();
                            navigatePop();
                        }
                    }
                }
            }
        ])
    }

    payoutBattleQueue = async () => {
        const queueEntry = this.props.navigation.getParam('queueEntry');
        const callback = this.props.navigation.getParam('callback');

        this.setState({ loading: true });
        const result = await PrivateApi.RolloutPaymentBattleQueue(queueEntry._id);
        this.setState({ loading: false });
        if (result.success) {
            callback();
            navigatePop();
            navigatePop();
        }
    }

    rollout = () => {
        const { tournament } = this.state;
        const callback = this.props.navigation.getParam('callback');

        Alert.alert("Rollout payment?", "Are you sure you want to rollout payment.", [
            { text: "Calcel", style: "cancel" },
            {
                text: "Proceed",
                onPress: async () => {
                    this.setState({ loading: true });
                    const result = await PrivateApi.RolloutPayment(tournament._id);
                    console.log('result', result)
                    this.setState({ loading: false });
                    if (result.success) {
                        callback();
                        this.fetchData();
                    }
                }
            }
        ])
    }

    makePublic = async () => {
        const { tournament } = this.state;
        this.setState({ loading: true });
        const result = await PrivateApi.UpdateTournament(tournament._id, { status: 'active' });
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    navigateToPrizeDetail = () => {
        const { tournament } = this.state;
        const prizeMeta = AccessNestedObject(tournament, 'game.price_meta', []);
        const prizeSetMeta = AccessNestedObject(tournament, 'prize', []);

        navigate('AddTournamentPrizeDetail', {
            prizeMeta,
            callback: this.setPrizeDetail,
            isSet: this.isPrizeDetailSet(),
            prizeSetMeta,
            isInactive: tournament.status != 'draft'
        })
    }

    setPrizeDetail = async (response) => {
        const { tournament } = this.state;
        this.setState({ loading: true });
        const result = await PrivateApi.UpdateTournament(tournament._id, { prize: response });
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    isPrizeDetailSet = () => {
        const { tournament } = this.state;
        const tournamentMeta = AccessNestedObject(tournament, 'prize', []);
        return tournamentMeta.length;
    }

    navigateToGeneralDetailForm = () => {
        const { tournament } = this.state;
        const gameMeta = AccessNestedObject(tournament, 'game.game_meta', {});
        const tournamentMeta = AccessNestedObject(tournament, 'tournament_meta', []);

        navigate('AddTournamentGeneralDetail', {
            gameMeta,
            callback: this.setGeneralDetail,
            isSet: this.isGeneralDetailSet(),
            tournamentMeta,
            isInactive: tournament.status != 'draft'
        })
    }


    setGeneralDetail = async (response) => {
        const { tournament } = this.state;
        this.setState({ loading: true });
        const result = await PrivateApi.UpdateTournament(tournament._id, { tournament_meta: response });
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    isGeneralDetailSet = () => {
        const { tournament } = this.state;
        const tournamentMeta = AccessNestedObject(tournament, 'tournament_meta', []);
        return tournamentMeta.length;
    }

    isRankDetailSet = () => {
        const { tournament } = this.state;
        const tournamentMeta = AccessNestedObject(tournament, 'rank', []);
        return tournamentMeta.length;
    }

    navigateToRankDetail = () => {
        const { tournament } = this.state;
        const size = AccessNestedObject(tournament, 'size', 0);
        const rank = AccessNestedObject(tournament, 'rank', [])

        navigate('AddTournamentRankDetail', {
            size,
            callback: this.setRankDetail,
            isSet: this.isRankDetailSet(),
            rank,
            isInactive: tournament.status != 'draft'
        })
    }

    setRankDetail = async (response) => {
        const { tournament } = this.state;
        navigatePop();
        this.setState({ loading: true });
        const result = await PrivateApi.UpdateTournament(tournament._id, { rank: response });
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    isRegistrationDetailSet = () => {
        const { tournament } = this.state;
        const { registration_opening, registration_closing, tournament_start_time, form_message, validation_message } = tournament;
        return !!(registration_opening && registration_closing && tournament_start_time && form_message && validation_message);
    }

    navigateToRegistrationDetailForm = () => {
        const { tournament } = this.state;
        const { registration_opening, registration_closing, tournament_start_time, form_message, validation_message, tnc_link } = tournament;

        navigate('AddTournamentRegistrationDetail', {
            callback: this.setRegistrationDetail,
            isSet: this.isRegistrationDetailSet(),
            regisrationDetails: {
                registration_opening,
                registration_closing,
                tournament_start_time,
                form_message,
                validation_message,
                tnc_link
            },
            isInactive: tournament.status != 'draft'
        })
    }

    isCompleted = () => {
        const { tournament } = this.state;
        return tournament.status == "completed"
    }

    isSetRankingInactive = () => {
        const { tournament } = this.state;

        if (tournament.ranking_set) {
            return true;
        }

        return this.isCompleted();
    }

    isRolloutInactive = () => {
        const { tournament } = this.state;
        if (tournament.ranking_set) {
            return false;
        }

        return true
    }

    navigateToCredentials = () => {
        const { tournament } = this.state;
        const { room_detail } = tournament;

        navigate('SetTournamentCredentials', {
            isSet: this.isCredentialsSet(),
            roomDetail: room_detail,
            callback: this.setCredentaials
        })
    }

    setCredentaials = async (response) => {
        const { tournament } = this.state;
        this.setState({ loading: true });
        const result = await PrivateApi.UpdateTournament(tournament._id, { room_detail: response });
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    isCredentialsSet = () => {
        const { tournament } = this.state;
        const { room_detail } = tournament;
        return !!(AccessNestedObject(room_detail, 'room_id') && AccessNestedObject(room_detail, 'room_password'));
    }

    setRegistrationDetail = async (response) => {
        const { tournament } = this.state;
        this.setState({ loading: true });
        const result = await PrivateApi.UpdateTournament(tournament._id, response);
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    isTournamentCredentialsOptionInactive = () => {
        const { tournament } = this.state;
        const tournamentStartTime = AccessNestedObject(tournament, 'tournament_start_time');

        return moment().isBetween(moment(tournamentStartTime).add(1, 'hour'), moment(tournamentStartTime));
    }

    isTournamentCredentialSet = () => {
        const { tournament } = this.state;
        const roomId = AccessNestedObject(tournament, 'room_detail.room_id', '');
        const roomPassword = AccessNestedObject(tournament, 'room_detail.room_password', '');

        return roomPassword && roomId
    }

    isParticiepentMenuInactive = () => {
        return !AccessNestedObject(this.state, 'tournament.status') == 'active'
    }

    navigateToParticipents = () => {
        const { tournament } = this.state;
        navigate('ManageParticipents', { tournament });
    }

    navigateToSetRanking = () => {
        const { tournament } = this.state;
        navigate('SetRanking', { tournament, callback: this.setRanking })
    }

    setRanking = async (record) => {
        const { tournament } = this.state;
        this.setState({ loading: true });
        const id = AccessNestedObject(tournament, '_id');
        const result = await PrivateApi.SetRanking(id, { record: record });
        this.setState({ loading: false });
        if (result.success) {
            navigatePop();
            this.setState({ tournament: result.response });
        }
    }

    isSetRankingDone = () => {
        const { tournament } = this.state;
        return AccessNestedObject(tournament, 'ranking_set');
    }

    isPayoutDone = () => {
        const { tournament } = this.state;
        return AccessNestedObject(tournament, 'payout_released');
    }

    deleteTournament = () => {
        const { tournament } = this.state;
        const callback = this.props.navigation.getParam('callback');

        Alert.alert('Remove Tournament?', 'Are you sure you want to remove this tournament', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    this.setState({ loading: true });
                    const result = await PrivateApi.UpdateTournament(tournament._id, { deleted_at: Date.now() });
                    this.setState({ loading: false });

                    if (result.success) {
                        navigatePop();
                        callback();
                    }
                }
            },
        ], { cancelable: false })
    }


    RenderTournamentSetDetail = () => {
        return (
            <View style={{ flex: 1 }} >
                <MenuItem
                    iconName="gamepad"
                    font="fontawesome"
                    name="Tournament related detail"
                    detail="Set general tournament details"
                    onPress={this.navigateToGeneralDetailForm}
                    complete={this.isGeneralDetailSet()}
                />
                <MenuItem
                    iconName="credit-card"
                    font="fontawesome"
                    name="Prizepool and winning amount detail"
                    detail="Set prizepool, entry fee and winning amount"
                    onPress={this.navigateToPrizeDetail}
                    complete={this.isPrizeDetailSet()}
                />
                <MenuItem
                    iconName="list"
                    font="fontawesome"
                    name="Rankwise reward details"
                    detail="Set rank wise rewards"
                    onPress={this.navigateToRankDetail}
                    complete={this.isRankDetailSet()}
                />
                <MenuItem
                    iconName="address-book"
                    font="fontawesome"
                    name="Registration detail"
                    detail="set registration start date and time"
                    onPress={this.navigateToRegistrationDetailForm}
                    complete={this.isRegistrationDetailSet()}
                />
            </View>
        )
    }

    RenderTournamentManage = () => {

        return (
            <View style={{ flex: 1, paddingBottom: 100 }} >
                <MenuItem
                    iconName="lock"
                    font="fontawesome"
                    name="Set tournament credentials"
                    detail="Set private room username and password"
                    onPress={this.navigateToCredentials}
                    complete={this.isCredentialsSet()}
                    inactive={this.isTournamentCredentialsOptionInactive()}
                />
                <MenuItem
                    iconName="users"
                    font="fontawesome"
                    name="Participents"
                    detail="Manage participents"
                    onPress={this.navigateToParticipents}
                    inactive={this.isParticiepentMenuInactive()}
                />

            </View>
        )
    }

    RenderTournamentPost = () => {
        const queueEntry = this.props.navigation.getParam('queueEntry');

        return (
            <View style={{ flex: 1, paddingBottom: 100 }} >
                {
                    queueEntry ?
                        <MenuItem
                            iconName="comment"
                            font="fontawesome"
                            name="Show Chat"
                            detail="Chat scene"
                            onPress={() => {
                                navigate('BattleChat', { battleQueue: queueEntry });
                            }}
                            inactive={false}
                        /> : null
                }
                <MenuItem
                    iconName="users"
                    font="fontawesome"
                    name="Set Ranking"
                    detail="Set ranking of participents"
                    onPress={this.navigateToSetRanking}
                    complete={this.isSetRankingDone()}
                    inactive={false}
                />
                <MenuItem
                    iconName="check"
                    font="fontawesome"
                    name="Rollout Payment"
                    detail="Finish tournament and rollout payments"
                    onPress={this.rollout}
                    inactive={this.isRolloutInactive()}
                    complete={this.isPayoutDone()}
                />

            </View>
        )
    }

    render() {
        const { loading, tournament } = this.state;

        const imageSource = { uri: AccessNestedObject(tournament, 'game.thumbnail') };
        const tournamentName = AccessNestedObject(tournament, 'tournament_name');
        const tournamentDescription = AccessNestedObject(tournament, 'description');
        const platform = AccessNestedObject(tournament, 'game.platform.name');
        const createAt = moment(AccessNestedObject(tournament, 'created_at')).format(DISPLAY_DATE_TIME_FORMAT)
        const status = AccessNestedObject(tournament, 'status');
        const tournamentStartTime = AccessNestedObject(tournament, 'tournament_start_time');

        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ flex: 1 }}
            >
                <>
                    <View style={styles.detailContainer} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <Image source={imageSource} style={styles.image} />
                        </View>
                        <View style={{ flex: 2, alignItems: 'flex-start', marginLeft: 20 }} >
                            <View style={styles.padding} >
                                <Text style={styles.bold} numberOfLines={2} >
                                    {tournamentName}
                                </Text>
                            </View>

                            <View style={[styles.padding, { flexDirection: 'row', alignItems: 'center' }]} >
                                <Text style={[styles.light, { marginRight: 10 }]} >
                                    Create at:
                            </Text>
                                <Text style={[styles.normal, { marginRight: 10, fontSize: 10 }]} >
                                    {createAt}
                                </Text>
                            </View>
                            <View style={[styles.padding, { flexDirection: 'row', alignItems: 'center' }]} >
                                <Text style={[styles.light, { marginRight: 10 }]} >
                                    Status:
                            </Text>
                                <Text style={[styles.normal, { marginRight: 10, color: PRIMARY_COLOR }]} >
                                    {status}
                                </Text>
                            </View>
                            <View style={[styles.padding, { marginTop: 10, marginBottom: 10, flexDirection: 'row' }]} >
                                {
                                    tournament.status == 'draft' ?
                                        <Button
                                            onPress={this.publish}
                                            title={"PUBLISH"}
                                        /> :
                                        null
                                }
                                {
                                    tournament.status == 'active' ?
                                        <Text style={{ color: GREEN, padding: 10, fontWeight: '500' }} >PUBLIC/ONLINE</Text>
                                        : null
                                }
                                {
                                    tournament.status == 'draft' ?
                                        <View style={{ marginLeft: 10 }} >
                                            <Button
                                                title="DELETE"
                                                onPress={this.deleteTournament}
                                                color={RED}
                                            />
                                        </View> : null
                                }

                            </View>
                            {
                                status == "active" && !moment().isAfter(moment(tournamentStartTime).add(1, 'hour')) ?
                                    <Button
                                        onPress={this.finish}
                                        title={"FINISH TOURNAMENT"}
                                    /> : null
                            }
                        </View>
                    </View>
                    {
                        status == 'draft' ?
                            <Tabs>
                                <this.RenderTournamentSetDetail tabLabel="Set Detail" />
                                <this.RenderTournamentManage tabLabel="Manage" />
                                <this.RenderTournamentPost tabLabel="Post Tournament" />
                            </Tabs> : null
                    }
                    {
                        status == 'active' ?
                            <Tabs>
                                <this.RenderTournamentManage tabLabel="Manage" />
                                <this.RenderTournamentPost tabLabel="Post Tournament" />
                                <this.RenderTournamentSetDetail tabLabel="Set Detail" />
                            </Tabs> : null
                    }
                    {
                        status == 'completed' ?
                            <Tabs>
                                <this.RenderTournamentPost tabLabel="Post Tournament" />
                                <this.RenderTournamentManage tabLabel="Manage" />
                                <this.RenderTournamentSetDetail tabLabel="Set Detail" />
                            </Tabs> : null
                    }
                </>
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    detailContainer: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: GREY_BG,
    },
    image: {
        height: 150,
        width: 100,
        resizeMode: 'cover'
    },
    padding: {
        paddingTop: 2,
        paddingBottom: 2
    },
    bold: {
        fontWeight: '500',
        color: TEXT_COLOR,
        fontSize: 18
    },
    light: {
        fontSize: 16,
        color: GREY_1,
    },
    normal: {
        fontSize: 16,
        color: TEXT_COLOR,
    },
    spinnerTextStyle: {
        color: ON_PRIMARY
    }
})

export default ManageTournamentScene;