
import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBar } from "react-native-animated-nav-tab-bar";
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

const HomeStack = createStackNavigator({
    Home: () => <HomeScreen />
});

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="home" />,
    header: null,
}

class WalletScene extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text>Wallet!</Text>
            </View>
        );
    }
}

const WalletStack = createStackNavigator({
    Home: () => <WalletScene />
});

WalletStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="wallet" />,
    header: null,
}

class ProfileScene extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text>Profile!</Text>
            </View>
        );
    }
}

const ProfileStack = createStackNavigator({
    Home: () => <ProfileScene />
});

ProfileStack.navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => <TabBarIcon focused={focused} tintColor={tintColor} name="user-alt" />,
    header: null,
}

const TabBarIcon = (props) => {
    return (
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.focused ? props.tintColor : "#222222"}

        />
    )
}

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomeStack,
            Wallet: WalletStack,
            Profie: ProfileStack,

        }, {
        tabBarOptions: {
            activeTintColor: "#2B7C85",
            inactiveTintColor: "#222222",
        },

        tabBarComponent: props => <TabBar
            shadow
            activeColors={['#e6b580', '#8e87d6', '#c095c9']} // or activeColors={'#e6b580'}
            activeTabBackgrounds={['#ede7e6', '#eae3f6', '#eae4f6']} // or activeTabBackgrounds={'#ede7e6'}
            {...props}
        />,
    }
    )
)