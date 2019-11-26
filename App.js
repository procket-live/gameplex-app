import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { useScreens } from 'react-native-screens';
import NetworkState from 'react-native-network-state'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import codePush from 'react-native-code-push';

import Navigator, { getPersistenceFunctions } from './src/navigation/index.navigation';
import NotifyService from './src/service/notify.service';
import store, { persistor } from './src/store/index.store';
import { setTopLevelNavigator } from './src/service/navigation.service';
import AppResolve from './src/scene/app-resolve-scene/app-resolve.scene';

useScreens();

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {

  }

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
              <AppResolve />
              <Navigator
                ref={navigatorRef => {
                  setTopLevelNavigator(navigatorRef);
                }}
                {...getPersistenceFunctions()}
              />
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

export default codePush(App);
