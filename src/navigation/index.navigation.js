
import React from 'react';
import { Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBar } from "react-native-animated-nav-tab-bar";
import { createStackNavigator } from 'react-navigation-stack';

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
import { GREY_BG } from '../constant/color.constant';
import DashboardTournamentListScene from '../scene/dashboard-tournament-list/dashboard-tournament-list.scene';
import ManageTournamentScene from '../scene/manage-tournament/manage-tournament.scene';
import AddTournamentGeneralDetailScene from '../scene/add-tournament-general-detail-scene/add-tournament-general-detail.scene';
import AddTournamentPrizeDetailScene from '../scene/add-tournament-prize-detail-scene/add-tournament-prize-detail.scene';

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
            tabBarIcon: ({ focused, tintColor }) => <IconComponent focused={focused} tintColor={tintColor} name="home" />,
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
            tabBarIcon: ({ focused, tintColor }) => <IconComponent focused={focused} tintColor={tintColor} name="wallet" />,
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
        screen: () => NotificationScene,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <IconComponent focused={focused} tintColor={tintColor} name="notification" />,
        }
    }
);


const TabsNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Wallet: WalletStack,
        Message: NotificationStack,
        Menu: MenuStack,
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
            activeTabBackgrounds={["#2ecc71", "#3498db", "#9b59b6", "#f1c40f"]} // or activeTabBackgrounds={'#ede7e6'}
            {...props}
        />
    )
}
)

const RootNavigator = createStackNavigator({
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
    }
}, {
    initialRouteName: 'Dashboard',
})

export default createAppContainer(RootNavigator);


const persistenceKey = "to3eodddddol"
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