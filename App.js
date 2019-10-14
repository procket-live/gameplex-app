/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TRUECALLER, {
  TRUECALLER_EVENT,
  TRUECALLER_CONSENT_MODE,
  TRUECALLER_CONSENT_TITLE,
  TRUECALLER_FOOTER_TYPE
} from 'react-native-truecaller-sdk'

import Navigator from './src/navigation/index.navigation';

class App extends PureComponent {
  componentDidMount = () => {
    TRUECALLER.initializeClient(
      TRUECALLER_CONSENT_MODE.Popup,
      TRUECALLER_CONSENT_TITLE.Login,
      TRUECALLER_FOOTER_TYPE.Continue
    )

    setTimeout(() => {
      SplashScreen.hide();
      TRUECALLER.requestTrueProfile();
    }, 2000)

    TRUECALLER.on(TRUECALLER_EVENT.TrueProfileResponse, profile => {
      console.log('Truecaller profile data: ', profile)
      // add other logic here related to login/sign-up as per your use-case.
    });

    TRUECALLER.on(TRUECALLER_EVENT.TrueProfileResponseError, error => {
      console.log('User rejected the truecaller consent request! ', error)
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Navigator />
      </>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
