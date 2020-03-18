import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import { GREY_BG, TEXT_COLOR, GREEN, ON_PRIMARY, PRIMARY_COLOR } from '../../constant/color.constant';
import IconComponent from '../../component/icon/icon.component';
import MenuItem from '../../component/menu-item/menu-item.component';
import PrivateApi from '../../api/private.api';
import { setMode } from '../../action/mode.action';
import { resetToScreen, navigate } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';
import { setOrganizerActions } from '../../action/organizer.action';

class DashboardScene extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const switchMode = navigation.getParam('switchMode');
        return {
            headerRight: (
                <TouchableOpacity onPress={switchMode} style={{ marginRight: 15 }} >
                    <IconComponent size={25} focused tintColor={PRIMARY_COLOR} name={"swap"} />
                </TouchableOpacity >
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            dashbordMeta: {},
            loading: false
        }

        props.navigation.setParams({ switchMode: this.switch })
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        const result = await PrivateApi.GetOrganizerProfile();
        this.setState({ loading: false })
        if (result.success) {
            this.setState({ dashbordMeta: AccessNestedObject(result, 'response.dashboard') });
            this.props.setOrganizerActions(AccessNestedObject(result, 'response.organizer'));
        }
    }

    isOrganizerProfileSet = () => {
        const { organizer } = this.props;
        return !!organizer;
    }

    navigateToCreateNewTournament = () => {
        const { dashbordMeta, loading } = this.state;
        const { game = [] } = dashbordMeta;

        if (loading) {
            return;
        }

        this.props.navigation.push('AddTournament', { game, callback: this.componentDidMount });
    }

    navigateToDraftList = () => {
        this.props.navigation.push('DashboardTournamentList', { query: '?status=draft', callback: this.componentDidMount })
    }

    navigateToActiveList = () => {
        this.props.navigation.push('DashboardTournamentList', { query: '?status=active', callback: this.componentDidMount })
    }

    navigateToCompletedList = () => {
        this.props.navigation.push('DashboardTournamentList', { query: '?status=completed', callback: this.componentDidMount })
    }

    switch = () => {
        const { mode } = this.props;

        if (mode == 'user') {
            this.props.setMode('organizer');
            resetToScreen('Dashboard');
        } else {
            this.props.setMode('user');
            resetToScreen('TabNavigator');
        }
    }

    render() {
        const { mode } = this.props;
        const { dashbordMeta } = this.state;

        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={this.state.loading} onRefresh={this.componentDidMount} />
                }
            >
                {this.isOrganizerProfileSet() ?
                    <View style={styles.statsContainer} >
                        <View style={{ flex: 1, flexDirection: 'row', padding: 5 }} >
                            <TouchableOpacity
                                onPress={this.navigateToCreateNewTournament}
                                style={[styles.tile, { backgroundColor: PRIMARY_COLOR, borderWidth: 0 }]}
                            >
                                {
                                    this.state.loading ?
                                        <ActivityIndicator
                                            animating
                                            size="small"
                                            color={ON_PRIMARY}
                                        /> :
                                        <>
                                            <IconComponent name="plus" focused tintColor={ON_PRIMARY} />
                                            <Text style={[styles.starCatText, { color: ON_PRIMARY }]} >Create New Tournament</Text>
                                        </>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tile}
                                onPress={this.navigateToDraftList}
                            >
                                <Text style={styles.statText} >{dashbordMeta.draft == undefined ? '-' : dashbordMeta.draft}</Text>
                                <Text style={styles.starCatText} >Draft</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 5 }} >
                            <TouchableOpacity
                                style={styles.tile}
                                onPress={this.navigateToActiveList}
                            >
                                <Text style={styles.statText} >{dashbordMeta.active == undefined ? '-' : dashbordMeta.active}</Text>
                                <Text style={styles.starCatText} >Active</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tile}
                                onPress={this.navigateToCompletedList}
                            >
                                <Text style={styles.statText} >{dashbordMeta.completed == undefined ? '-' : dashbordMeta.completed}</Text>
                                <Text style={styles.starCatText} >Completed</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : null
                }
                <MenuItem
                    onPress={() => {
                        navigate('ManageOrganizerProfile', { callback: this.componentDidMount })
                    }}
                    iconName="setting"
                    name="Manage Organizer Profile"
                    detail="Update organizer profile"
                    complete={this.isOrganizerProfileSet()}
                />
                <MenuItem
                    inactive={!this.isOrganizerProfileSet()}
                    iconName="credit-card"
                    font="fontawesome"
                    name="Payments"
                    detail="Handle payments and payouts"
                />
                <MenuItem
                    inactive
                    iconName="compass"
                    font="fontawesome"
                    name="Stats"
                    detail="Analize your progress"
                />
                <MenuItem
                    inactive
                    iconName="phone"
                    font="fontawesome"
                    name="Raise an issue / Contact us"
                    detail="Get in touch with us"
                />
                <MenuItem
                    inactive
                    iconName="book"
                    font="fontawesome"
                    name="Help"
                    detail="Frequently asked questions and their answers"
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statsContainer: {
        height: heightPercentageToDP(40),
        borderBottomWidth: 1,
        borderColor: GREY_BG
    },
    tile: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderColor: GREY_BG,
        borderRadius: 5,
    },
    statText: {
        fontSize: 26,
        color: TEXT_COLOR,
        fontWeight: '500',
    },
    starCatText: {
        fontSize: 12,
        color: TEXT_COLOR,
        fontWeight: '300'
    }
})

const mapStateToProps = state => ({
    mode: state.mode,
    organizer: state.organizer
})

export default connect(mapStateToProps, { setMode, setOrganizerActions })(DashboardScene);
