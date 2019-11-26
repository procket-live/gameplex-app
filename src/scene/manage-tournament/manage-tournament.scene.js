import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { PRIMARY_COLOR, TEXT_COLOR, GREY_1, GREY_BG } from '../../constant/color.constant';
import PrivateApi from '../../api/private.api';
import { heightPercentageToDP } from 'react-native-responsive-screen';
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

class ManageTournamentScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tournament: {}
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
        console.log('result', result)
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    publish = () => {
        const { tournament } = this.state;

        if (tournament.public) {
            NotifyService.notify({
                title: 'Published',
                message: 'Already published',
                type: 'success'
            })
            return;
        }

        NotifyService.notify({
            title: 'Unable to proceed',
            message: 'Please complete all tournament detail to publish tournament',
            type: 'error'
        })
    }

    navigateToPrizeDetail = () => {
        const { tournament } = this.state;
        const prizeMeta = AccessNestedObject(tournament, 'game.price_meta', {});

        if (this.isPrizeDetailSet()) {
            NotifyService.notify({
                title: 'Prize details is set',
                message: '',
                type: 'success'
            })
            return;
        }

        this.props.navigation.push('AddTournamentPrizeDetail', { prizeMeta, callback: this.setPrizeDetail })
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

        if (this.isGeneralDetailSet()) {
            NotifyService.notify({
                title: 'General details is set',
                message: '',
                type: 'success'
            })
            return;
        }

        this.props.navigation.push('AddTournamentGeneralDetail', { gameMeta, callback: this.setGeneralDetail })
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

    RenderTournamentSetDetail = () => {
        return (
            <View style={{ flex: 1 }} >
                <MenuItem
                    iconName="gamepad"
                    font="fontawesome"
                    name="General detail"
                    detail="Set general tournament details"
                    onPress={this.navigateToGeneralDetailForm}
                    complete={this.isGeneralDetailSet()}
                />
                <MenuItem
                    iconName="credit-card"
                    font="fontawesome"
                    name="Prize detail"
                    detail="Set prizepool, entry fee and winning amount"
                    onPress={this.navigateToPrizeDetail}
                    complete={this.isPrizeDetailSet()}
                />
                <MenuItem
                    iconName="address-book"
                    font="fontawesome"
                    name="Registration detail"
                    detail="set registration start date and time"
                    onPress={this.navigateToGeneralDetailForm}
                    complete={false}
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
                    onPress={this.navigateToGeneralDetailForm}
                    complete={false}
                    inactive
                />
                <MenuItem
                    iconName="users"
                    font="fontawesome"
                    name="Paricipents"
                    detail="Manage participents"
                    onPress={this.navigateToGeneralDetailForm}
                    inactive
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
        console.log('tournamentName', tournamentName)

        return (
            <View
                style={styles.container}
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
                                <Button
                                    onPress={this.publish}
                                    text={tournament.public ? "PUBLISHED" : "PUBLISH"}
                                />
                            </View>
                        </View>
                    </View>

                    <Tabs>
                        <this.RenderTournamentSetDetail tabLabel="Set Detail" />
                        <this.RenderTournamentManage tabLabel="Manage" />
                        <this.RenderTournamentPost tabLabel="Post Tournament" />
                    </Tabs>
                </>
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
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