
import React from 'react';
import { Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBar } from "react-native-animated-nav-tab-bar";
import { createStackNavigator } from 'react-navigation-stack';
import DeviceInfo from 'react-native-device-info';


import HomeScene from '../scene/home-scene/home.scene';
import WalletScene from '../scene/wallet-scene/wallet.scene';
import ProfileScene from '../scene/profile-scene/profile.scene';
import NotificationScene from '../scene/notification-scene/notification.scene';
import LoginScene from '../scene/login-scene/login.scene';
import IconComponent from '../component/icon/icon.component';
import TransactionsScene from '../scene/transactions-scene/transactions.scene';
import UserDetailInputScene from '../scene/user-detail-input-scene/user-detail-input.scene';
import AddMoneyScene from '../scene/add-money-scene/add-money.scene';
import MenuScene from '../scene/menu-scene/menu.scene';
import TournamentList from '../scene/tournament-list-scene/tournament-list.scene';
import DashboardScene from '../scene/dashboard-scene/dashboard.scene';
import AddTournamentScene from '../scene/add-tournement/add-tournament.scene';
import { GREY_BG, PRIMARY_COLOR, TEXT_COLOR, GREY_2, GREY_3, SECONDARY_COLOR } from '../constant/color.constant';
import DashboardTournamentListScene from '../scene/dashboard-tournament-list/dashboard-tournament-list.scene';
import ManageTournamentScene from '../scene/manage-tournament/manage-tournament.scene';
import AddTournamentGeneralDetailScene from '../scene/add-tournament-general-detail-scene/add-tournament-general-detail.scene';
import AddTournamentPrizeDetailScene from '../scene/add-tournament-prize-detail-scene/add-tournament-prize-detail.scene';
import AddTournamentRankDetailScene from '../scene/add-tournament-rank-detail-scene/add-tournament-rank-detal.scene';
import AddTournamentRegistrationDetailScene from '../scene/add-tournament-registration-detail-scene/add-tournament-registration-detail.scene';
import TournamentScene from '../scene/tournament-scene/tournament.scene';
import InstructionGenerator from '../scene/instruction-generator-scene/instruction-generator.scene';
import addGameUserIdComponent from '../component/add-game-user-id/add-game-user-id.component';
import CheckoutScene from '../scene/checkout-scene/checkout.scene';
import ManageParticipents from '../scene/manage-participents/manage-participents.scene';
import SetTournamentCredentials from '../scene/set-tournament-credentials-scene/set-tournament-credentials.scene';
import SetRankingScene from '../scene/set-ranking-scene/set-ranking.scene';
import ManageOrganizerProfile from '../scene/manage-organizer-profile-scene/manage-organizer-profile.scene';
import JoinedTournamentScene from '../scene/joined-tournament-scene/joined-tournament.scene';
import SelectParticipentScene from '../scene/select-participent-scene/select-participent.scene';
import TNCScene from '../scene/tnc-scene/tnc.scene';
import GameScene from '../scene/game-scene/game.scene';
import FantasyHomeScene from '../scene/fantasy-home-scene/fantasy-home.scene';
import FantasyMyContestScene from '../scene/fantasy-my-contest-scene/fantasy-my-contest-scene';
import ChatScreen from '../scene/chat-scene/chat.scene';
import BattleScene from '../scene/battle-scene/battle.scene';
import BattleChatScene from '../scene/battle-chat-scene/battle-chat.scene';
import BankDetailScene from '../scene/bank-detail-scene/bank-detail.scene';
import UpdateScene from '../scene/update-scene/update.scene';
import ManageCompletedMatchScene from '../scene/manage-completed-match-scene/manage-completed-match.scene';
import WithdrawScene from '../scene/withdraw-scene/withdraw.scene';
import PendingWithdrawScene from '../scene/pending-withdraw-scene/pending-withdraw.scene';

const headerStyle = {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: GREY_BG
}

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScene,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent font="fontawesome" focused={focused} tintColor={tintColor} name="home" />,
        }
    }
);

const WalletStack = createStackNavigator({
    Wallet: {
        screen: WalletScene,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent font="fontawesome" focused={focused} tintColor={tintColor} name="wallet" />,
        }
    }
);

const MenuStack = createStackNavigator({
    Profile: {
        screen: MenuScene,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent focused={focused} tintColor={tintColor} name="user" />,
        }
    }
);

const NotificationStack = createStackNavigator({
    Notification: {
        screen: NotificationScene,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent font="fontawesome" focused={focused} tintColor={tintColor} name="bell" />,
        }
    }
);

const ChatStack = createStackNavigator({
    ChatScreen: {
        screen: ChatScreen,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent font="fontawesome" focused={focused} tintColor={tintColor} name="comment" />,
        }
    }
);

const FantasyHome = createStackNavigator({
    Notification: {
        screen: FantasyHomeScene,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent font="fontawesome" focused={focused} tintColor={tintColor} name="home" />,
        }
    }
);

const FantasyMyContest = createStackNavigator({
    Notification: {
        screen: FantasyMyContestScene,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent font="fontawesome" focused={focused} tintColor={tintColor} name="trophy" />,
        }
    }
);



const TabsNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Wallet: WalletStack,
        Notifications: NotificationStack,
        Profile: MenuStack,
    }, {
    tabBarOptions: {
        activeTintColor: SECONDARY_COLOR,
        inactiveTintColor: 'red',
        keyboardHidesTabBar: true,
        labelStyle: { display: 'none' },
    },
    // tabBarComponent: props => (
    //     <TabBar
    //         shadow={true}
    //         tabBarBackground="#fff"
    //         activeColors="#fff" // or activeColors={'#e6b580'}
    //         activeTabBackgrounds={[PRIMARY_COLOR, PRIMARY_COLOR, PRIMARY_COLOR, PRIMARY_COLOR]} // or activeTabBackgrounds={'#ede7e6'}
    //         {...props}
    //     />
    // )
})

const FantasyTabsNavigator = createBottomTabNavigator(
    {
        'Home': FantasyHome,
        'My Contest': FantasyMyContest,
    }, {
    tabBarOptions: {
        activeTintColor: "#2B7C85",
        inactiveTintColor: "#222222",
    },
    tabBarComponent: props => (
        <TabBar
            shadow={true}
            tabBarBackground="#fff"
            activeColors="#fff" // or activeColors={'#e6b580'}
            activeTabBackgrounds={[PRIMARY_COLOR, PRIMARY_COLOR]} // or activeTabBackgrounds={'#ede7e6'}
            {...props}
        />
    )
})

const RootNavigator = createStackNavigator({
    Empty: {
        screen: () => null,
        navigationOptions: {
            header: null
        }
    },
    Fantasy: {
        screen: FantasyTabsNavigator,
        navigationOptions: {
            header: null
        }
    },
    TabNavigator: {
        screen: TabsNavigator,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginScene,
        navigationOptions: {
            header: null
        }
    },
    UserDetailInput: {
        screen: UserDetailInputScene,
        navigationOptions: {
            header: null
        }
    },
    Battle: {
        screen: BattleScene,
        navigationOptions: {
            header: null
        }
    },
    BattleChat: {
        screen: BattleChatScene,
        navigationOptions: {
            header: null
        }
    },
    Transactions: {
        screen: TransactionsScene,
        navigationOptions: {
            title: "Transactions",
            headerStyle
        }
    },
    AddMoney: {
        screen: AddMoneyScene,
        navigationOptions: {
            title: "Add money",
            headerStyle
        }
    },
    TournamentList: {
        screen: TournamentList,
        navigationOptions: {
            title: "Tournament List",
            headerStyle
        }
    },
    Dashboard: {
        screen: DashboardScene,
        navigationOptions: {
            title: "Dashborad",
            headerStyle
        }
    },
    AddTournament: {
        screen: AddTournamentScene,
        navigationOptions: {
            title: "Add new tournament",
            headerStyle,
        }
    },
    DashboardTournamentList: {
        screen: DashboardTournamentListScene,
        navigationOptions: {
            title: "Tournament list",
            headerStyle,
        }
    },
    ManageTournament: {
        screen: ManageTournamentScene,
        navigationOptions: {
            title: "Manage Tournament",
            headerStyle,
        }
    },
    AddTournamentGeneralDetail: {
        screen: AddTournamentGeneralDetailScene,
        navigationOptions: {
            title: "Set general detail",
            headerStyle,
        }
    },
    AddTournamentPrizeDetail: {
        screen: AddTournamentPrizeDetailScene,
        navigationOptions: {
            title: "Set prize detail",
            headerStyle,
        }
    },
    AddTournamentRankDetail: {
        screen: AddTournamentRankDetailScene,
        navigationOptions: {
            title: "Set rank rewards",
            headerStyle,
        }
    },
    AddTournamentRegistrationDetail: {
        screen: AddTournamentRegistrationDetailScene,
        navigationOptions: {
            title: "Set registration detail",
            headerStyle,
        }
    },
    Tournament: {
        screen: TournamentScene,
        navigationOptions: {
            title: "Tournament",
            headerStyle
        }
    },
    InstructionGenerator: {
        screen: InstructionGenerator,
        navigationOptions: {
            headerStyle,
        }
    },
    AddGameUserId: {
        screen: addGameUserIdComponent,
        navigationOptions: {
            title: "Add user id?",
            headerStyle,
        }
    },
    Checkout: {
        screen: CheckoutScene,
        navigationOptions: {
            title: "Confirm Entry",
            headerStyle,
        }
    },
    ManageParticipents: {
        screen: ManageParticipents,
        navigationOptions: {
            title: "Participents",
            headerStyle,
        }
    },
    SetTournamentCredentials: {
        screen: SetTournamentCredentials,
        navigationOptions: {
            title: "Set room id & password",
            headerStyle,
        }
    },
    SetRanking: {
        screen: SetRankingScene,
        navigationOptions: {
            title: "Set ranking",
            headerStyle,
        }
    },
    ManageOrganizerProfile: {
        screen: ManageOrganizerProfile,
        navigationOptions: {
            title: "Manage profile",
            headerStyle,
        }
    },
    JoinedTournament: {
        screen: JoinedTournamentScene,
        navigationOptions: {
            title: "My Tournaments",
            headerStyle,
        }
    },
    SelectParticipent: {
        screen: SelectParticipentScene,
        navigationOptions: {
            title: "Select participent",
            headerStyle,
        }
    },
    TNC: {
        screen: TNCScene,
        navigationOptions: {
            title: "Terms & Conditions",
            headerStyle,
        }
    },
    Game: {
        screen: GameScene,
        navigationOptions: {
            headerStyle,
            header: null
        }
    },
    BankDetail: {
        screen: BankDetailScene,
        navigationOptions: {
            headerStyle,

        }
    },
    Update: {
        screen: UpdateScene,
        navigationOptions: {
            header: null
        }
    },
    ManageCompletedMatch: {
        screen: ManageCompletedMatchScene,
        navigationOptions: {
            title: "All match",
            headerStyle,
        }
    },
    Withdraw: {
        screen: WithdrawScene,
        navigationOptions: {
            title: "Withdraw Amount",
            headerStyle,
        }
    },
    PendingWithdrawScene: {
        screen: PendingWithdrawScene,
        navigationOptions: {
            title: "Pending Withdraw Requests",
            headerStyle,
        }
    }
}, {
    initialRouteName: 'Empty',
})

export default createAppContainer(RootNavigator);


const persistenceKey = "to3edddodddddol"
const persistNavigationState = async (navState) => {
    try {
        await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
    } catch (err) {
        // handle the error according to your needs
    }
}

const loadNavigationState = async () => {
    const jsonString = await AsyncStorage.getItem(persistenceKey)
    return JSON.parse(jsonString)
}

export function getPersistenceFunctions() {
    return __DEV__ ? {
        persistNavigationState,
        loadNavigationState,
    } : undefined;
}