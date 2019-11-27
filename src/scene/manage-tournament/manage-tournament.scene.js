import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { PRIMARY_COLOR, TEXT_COLOR, GREY_1, GREY_BG, GREEN, ON_PRIMARY } from '../../constant/color.constant';
import PrivateApi from '../../api/private.api';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { AccessNestedObject } from '../../utils/common.util';
import IconComponent from '../../component/icon/icon.component';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';
import moment from 'moment';
import Button from '../../component/button/button.component';
import Tabs from '../../component/tabs/tabs.component';
import NotifyService from '../../service/notify.service';
import MenuItem from '../../component/menu-item/menu-item.component';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { navigatePop } from '../../service/navigation.service';
import BottomSheet from 'reanimated-bottom-sheet';
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

        this.props.navigation.push('AddTournamentPrizeDetail', {
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

        this.props.navigation.push('AddTournamentGeneralDetail', {
            gameMeta,
            callback: this.setGeneralDetail,
            isSet: this.isGeneralDetailSet(),
            tournamentMeta,
            isInactive: tournament.status != 'draft'
        });
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

        this.props.navigation.push('AddTournamentRankDetail', {
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

        this.props.navigation.push('AddTournamentRegistrationDetail', {
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
        return true
    }

    isParticiepentMenuInactive = () => {
        return !AccessNestedObject(this.state, 'tournament.status') == 'active'
    }

    navigateToParticipents = () => {

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
                    onPress={this.navigateToParticipents}
                    complete={false}
                    inactive={this.isTournamentCredentialsOptionInactive()}
                />
                <MenuItem
                    iconName="users"
                    font="fontawesome"
                    name="Paricipents"
                    detail="Manage participents"
                    onPress={this.navigateToGeneralDetailForm}
                    inactive={this.isParticiepentMenuInactive()}
                />
            </View>
        )
    }

    RenderTournamentPost = () => {
        return (
            <View style={{ flex: 1, paddingBottom: 100 }} >
                <MenuItem
                    iconName="users"
                    font="fontawesome"
                    name="Set Ranking"
                    detail="Set ranking of participents"
                    onPress={this.navigateToGeneralDetailForm}
                    complete={false}
                    inactive
                />
                <MenuItem
                    iconName="check"
                    font="fontawesome"
                    name="Rollout Payment"
                    detail="Finish tournament and rollout payments"
                    onPress={this.navigateToGeneralDetailForm}
                    inactive
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

                            <View style={styles.padding} >
                                <Text style={styles.light} >
                                    {tournamentDescription}
                                </Text>
                            </View>
                            <View style={[styles.padding, { flexDirection: 'row', alignItems: 'center' }]} >
                                <Text style={[styles.light, { marginRight: 10 }]} >
                                    Platform:
                            </Text>
                                <Text style={[styles.normal, { marginRight: 10 }]} >
                                    {platform}
                                </Text>
                                <IconComponent name="mobile" font="fontawesome" />
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
                            <View style={[styles.padding, { marginTop: 10, marginBottom: 10 }]} >
                                {
                                    tournament.status == 'draft' ?
                                        <Button
                                            onPress={this.publish}
                                            text={"PUBLISH"}
                                        /> :
                                        null
                                }
                                {
                                    tournament.status == 'active' ?
                                        <Text style={{ color: GREEN, padding: 10, fontWeight: '500' }} >PUBLIC/ONLINE</Text>
                                        : null
                                }
                            </View>
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
        color: '#FFF'
    }
})

export default ManageTournamentScene;