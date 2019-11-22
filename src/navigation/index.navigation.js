
import React from 'react';
import { Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBar } from "react-native-animated-nav-tab-bar";
import { createStackNavigator } from 'react-navigation-stack';

import HomeScene from 'scene/home-scene/home.scene';
import WalletScene from 'scene/wallet-scene/wallet.scene';
import ProfileScene from 'scene/profile-scene/profile.scene';
import NotificationScene from 'scene/notification-scene/notification.scene';
import LoginScene from '../scene/login-scene/login.scene';

const HomeStack = createStackNavigator({
    Home: {
        screen: () => <HomeScene />,
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            header: null
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="home" />,
        }
    }
);

const WalletStack = createStackNavigator({
    Wallet: {
        screen: () => <WalletScene />,
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            title: "Wallet"
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="wallet" />,
        }
    }
);

const ProfileStack = createStackNavigator({
    Profile: {
        screen: () => <ProfileScene />,
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            title: "Profile"
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="user" />,
        }
    }
);

const NotificationStack = createStackNavigator({
    Notification: {
        screen: () => <NotificationScene />,
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            title: "Notification"
        }
    }
},
    {
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="notification" />,
        }
    }
);

const TabBarIcon = (props) => {
    return (
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.focused ? props.tintColor : "#222222"}
        />
    )
}

const TabsNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Wallet: WalletStack,
        Message: NotificationStack,
        Profie: ProfileStack,
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
    TabNavigator: TabsNavigator,
    Login: {
        screen: LoginScene,
        navigationOptions: {
            header: null
        }
    }
}, {
    initialRouteName: 'Login'
})

export default createAppContainer(RootNavigator);