import React, { PureComponent, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Freshchat, ConversationOptions } from 'react-native-freshchat-sdk';

import { GREY_BG, TEXT_COLOR, GREEN, ON_PRIMARY, PRIMARY_COLOR } from '../../constant/color.constant';
import IconComponent from '../../component/icon/icon.component';
import MenuItem from '../../component/menu-item/menu-item.component';
import PrivateApi from '../../api/private.api';
import { setMode } from '../../action/mode.action';
import { resetToScreen, navigate } from '../../service/navigation.service';
import { AccessNestedObject, HasRole } from '../../utils/common.util';
import { setOrganizerActions } from '../../action/organizer.action';
import { useQuery } from '@apollo/react-hooks';
import { GetOrganizerProfile, GetOrganizerTournamentCount } from '../../graphql/graphql.query';
import { useFocusEffect } from 'react-navigation-hooks';


export default function DashboardScene() {
    const [loading, setLoading] = useState(true);
    const [organizer, setOrganizer] = useState(null);
    const [tournamentCount, setTournamentCount] = useState({
        active: null,
        draft: null,
        completed: null
    })

    useFocusEffect(useCallback(() => {

        return () => console.debug("screen loses focus");
    }, []));

    useQuery(GetOrganizerProfile, {
        onCompleted({ organizer: organizerResponse }) {
            setLoading(false);
            if (organizerResponse) {
                setOrganizer(organizerResponse);
            }
        }
        ,
        onError(error) {
            console.log('error', error);
        }
    })

    useQuery(GetOrganizerTournamentCount, {
        onCompleted({ countTournament }) {
            setTournamentCount(countTournament);
        },
        variables: {
            id: organizer?.id
        }
    })

    function refreshScreen() {

    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refreshScreen} />
            }
        >
            {organizer ?
                <View style={styles.statsContainer} >
                    <View style={{ flex: 1, flexDirection: 'row', padding: 5 }} >
                        <TouchableOpacity
                            onPress={() => {
                                navigate("AddTournament", { organizer })
                            }}
                            style={[styles.tile, { backgroundColor: PRIMARY_COLOR, borderWidth: 0 }]}
                        >
                            {
                                loading ?
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
                            onPress={() => {
                                navigate("DashboardTournamentList", { status: "draft", organizer })
                            }}
                        >
                            <Text style={styles.statText} >{tournamentCount.draft === null ? 'Loading ...' : tournamentCount.draft}</Text>
                            <Text style={styles.starCatText} >Draft</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', padding: 5 }} >
                        <TouchableOpacity
                            style={styles.tile}
                            onPress={() => {
                                navigate("DashboardTournamentList", { status: "pending", organizer })
                            }}
                        >
                            <Text style={styles.statText} >{tournamentCount.pending === null ? 'Loading ...' : tournamentCount.pending}</Text>
                            <Text style={styles.starCatText} >Pending</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tile}
                            onPress={() => {
                                navigate("DashboardTournamentList", { status: "active", organizer })
                            }}
                        >
                            <Text style={styles.statText} >{tournamentCount.active === null ? 'Loading ...' : tournamentCount.active}</Text>
                            <Text style={styles.starCatText} >Active</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', padding: 5 }} >
                        <TouchableOpacity
                            style={styles.tile}
                            onPress={() => {
                                navigate("DashboardTournamentList", { status: "completed", organizer })
                            }}
                        >
                            <Text style={styles.statText} >{tournamentCount.completed === null ? 'Loading ...' : tournamentCount.completed}</Text>
                            <Text style={styles.starCatText} >Completed</Text>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }
            <MenuItem
                onPress={() => {
                    navigate('ManageOrganizerProfile', { organizer })
                }}
                iconName="setting"
                name="Manage Organizer Profile"
                detail="Update organizer profile"
                complete={!!(organizer)}
            />
            {/* {
                HasRole(user, 'Admin') ?
                    <>
                        <MenuItem
                            inactive={!this.isOrganizerProfileSet()}
                            iconName="credit-card"
                            font="fontawesome"
                            name="Payments"
                            detail="Handle payments and payouts"
                        />
                        <MenuItem
                            inactive={!this.isOrganizerProfileSet()}
                            iconName="database"
                            font="fontawesome"
                            name="Completed Match"
                            detail="Completed match review"
                            onPress={() => {
                                navigate('ManageCompletedMatch', { callback: this.componentDidMount })
                            }}
                        />
                        <MenuItem
                            inactive={!this.isOrganizerProfileSet()}
                            iconName="database"
                            font="fontawesome"
                            name="Active Match List"
                            detail="All active match review"
                            onPress={() => {
                                navigate('ManageCompletedMatch', { callback: this.componentDidMount, active: true })
                            }}
                        />
                    </>
                    : null
            } */}
            <MenuItem
                inactive
                iconName="compass"
                font="fontawesome"
                name="Stats"
                detail="Analize your progress"
            />
            <MenuItem
                iconName="phone"
                font="fontawesome"
                name="Raise an issue / Contact us"
                detail="Get in touch with us"
            // onPress={this.showConversations}
            />
            <MenuItem
                iconName="book"
                font="fontawesome"
                name="Help"
                detail="Frequently asked questions and their answers"
                onPress={() => {
                    // Freshchat.showFAQs();
                }}
            />
        </ScrollView>
    )
}

// class DashboardScene extends PureComponent {
//     static navigationOptions = ({ navigation }) => {
//         const switchMode = navigation.getParam('switchMode');
//         return {
//             headerRight: (
//                 <TouchableOpacity onPress={switchMode} style={{ marginRight: 15 }} >
//                     <IconComponent size={25} focused tintColor={PRIMARY_COLOR} name={"swap"} />
//                 </TouchableOpacity >
//             )
//         }
//     };

//     constructor(props) {
//         super(props);
//         this.state = {
//             dashbordMeta: {},
//             loading: false
//         }

//         props.navigation.setParams({ switchMode: this.switch })
//     }

//     componentDidMount = async () => {
//         this.setState({ loading: true })
//         const result = await PrivateApi.GetOrganizerProfile();
//         this.setState({ loading: false })
//         if (result.success) {
//             this.setState({ dashbordMeta: AccessNestedObject(result, 'response.dashboard') });
//             this.props.setOrganizerActions(AccessNestedObject(result, 'response.organizer'));
//         }
//     }

//     isOrganizerProfileSet = () => {
//         const { organizer } = this.props;
//         return !!organizer;
//     }

//     navigateToCreateNewTournament = () => {
//         const { dashbordMeta, loading } = this.state;
//         const { game = [] } = dashbordMeta;

//         if (loading) {
//             return;
//         }

//         this.props.navigation.push('AddTournament', { game, callback: this.componentDidMount });
//     }

//     navigateToDraftList = () => {
//         this.props.navigation.push('DashboardTournamentList', { query: '?status=draft', callback: this.componentDidMount })
//     }

//     navigateToActiveList = () => {
//         this.props.navigation.push('DashboardTournamentList', { query: '?status=active', callback: this.componentDidMount })
//     }

//     navigateToCompletedList = () => {
//         this.props.navigation.push('DashboardTournamentList', { query: '?status=completed', callback: this.componentDidMount })
//     }

//     switch = () => {
//         const { mode } = this.props;

//         if (mode == 'user') {
//             this.props.setMode('organizer');
//             resetToScreen('Dashboard');
//         } else {
//             this.props.setMode('user');
//             resetToScreen('TabNavigator');
//         }
//     }

//     showConversations = () => {
//         const conversationOptions = new ConversationOptions();
//         conversationOptions.tags = ["normal"];
//         conversationOptions.filteredViewTitle = "Contact us";
//         Freshchat.showConversations(conversationOptions);
//     }

//     render() {
//         const { user } = this.props;
//         const { dashbordMeta } = this.state;

//         return (

//         )
//     }
// }

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

// const mapStateToProps = state => ({
//     user: state.user,
//     mode: state.mode,
//     organizer: state.organizer
// })

// export default connect(mapStateToProps, { setMode, setOrganizerActions })(DashboardScene);
