import React, { Component } from 'react';
import {
    SafeAreaView,
    StatusBar,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import NetworkState from 'react-native-network-state'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import codePush from 'react-native-code-push';
import { Freshchat, FreshchatConfig } from 'react-native-freshchat-sdk';
import { ApolloProvider } from '@apollo/react-hooks';

import Navigator, { getPersistenceFunctions } from './src/navigation/index.navigation';
import NotifyService from './src/service/notify.service';
import store, { persistor } from './src/store/index.store';
import { setTopLevelNavigator } from './src/service/navigation.service';
import AppResolve from './src/scene/app-resolve-scene/app-resolve.scene';
import CONFIG from './src/config/app.config'
import GraphqlClient from './src/graphql/graphql-client';

function InitFreshchat() {
    const freshchatConfig = new FreshchatConfig(CONFIG.FRESHCHAT.APP_ID, CONFIG.FRESHCHAT.APP_KEY);
    Freshchat.init(freshchatConfig);
}

class App extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={{ flex: 1 }} >
                    <ReduxProvider
                        store={store}
                    >
                        <PersistGate
                            loading={null}
                            persistor={persistor}
                        >
                            <ApolloProvider client={GraphqlClient}>
                                <AppResolve InitFreshchat={InitFreshchat} />
                                <Navigator
                                    ref={navigatorRef => {
                                        setTopLevelNavigator(navigatorRef);
                                    }}
                                    {...getPersistenceFunctions()}
                                />
                            </ApolloProvider>
                        </PersistGate>
                    </ReduxProvider>
                </SafeAreaView>
                <NetworkState
                    style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                    onConnected={() => console.log('connected')}
                    onDisconnected={() => { }}
                />
                <DropdownAlert
                    ref={ref => NotifyService.register(ref)}
                />
            </>
        )
    }
}

export default codePush({
    updateDialog: false,
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.IMMEDIATE
})(App);
