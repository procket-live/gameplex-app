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
  Platform,
  Linking
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
// import Paytm from '@philly25/react-native-paytm';
// import firebase from 'react-native-firebase';
import NetworkState, { Settings } from 'react-native-network-state'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import TRUECALLER, {
//   TRUECALLER_EVENT,
//   TRUECALLER_CONSENT_MODE,
//   TRUECALLER_CONSENT_TITLE,
//   TRUECALLER_FOOTER_TYPE
// } from 'react-native-truecaller-sdk'
// import BottomSheet from 'reanimated-bottom-sheet'

import Navigator from './src/navigation/index.navigation';

const paytmConfig = {
  MID: 'gzGeYn36130961827220',
  WEBSITE: 'WEBSTAGING',
  CHANNEL_ID: 'WAP',
  INDUSTRY_TYPE_ID: 'Retail',
  CALLBACK_URL: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID='
};
class App extends PureComponent {
  constructor(props) {
    super(props);
    // firebase.initializeApp();
  }
  componentDidMount = () => {
    // TRUECALLER.initializeClient(
    //   TRUECALLER_CONSENT_MODE.Popup,
    //   TRUECALLER_CONSENT_TITLE.Login,
    //   TRUECALLER_FOOTER_TYPE.Continue
    // )

    setTimeout(() => {
      SplashScreen.hide();
      // TRUECALLER.requestTrueProfile();


      // this.runTransaction(100, '123', '1223132', '9731702355', 'hkxicor@gmail.com', '', '1223213');


    }, 2000)

    Linking.addEventListener('url', this._handleOpenURL);

    // firebase.messaging().getToken().then((token) => {
    //   console.log('TOKEN', token);
    // })
    // TRUECALLER.on(TRUECALLER_EVENT.TrueProfileResponse, profile => {
    //   console.log('Truecaller profile data: ', profile)
    //   // add other logic here related to login/sign-up as per your use-case.
    // });

    // TRUECALLER.on(TRUECALLER_EVENT.TrueProfileResponseError, error => {
    //   console.log('User rejected the truecaller consent request! ', error)
    // });

    // Paytm.addListener(Paytm.Events.PAYTM_RESPONSE, this.onPayTmResponse);
    // firebase.notifications().onNotificationOpened((open) => {
    //   console.log('open', open);
    // })

    // const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
    // firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }

  _handleOpenURL = (event) => { console.log('evennnnt', event) }

  async checkPermission() {
    // const enabled = await firebase.messaging().hasPermission();
    // if (enabled) {
    // } else {
    //   this.requestPermission();
    // }
  }

  async requestPermission() {
    // try {
    //   await firebase.messaging().requestPermission();
    // } catch (error) {
    //   console.log('permission rejected');
    // }
  }

  async createNotificationListeners() {
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //   console.log('notificationOpen', notificationOpen.notification.data);
    // }
  }

  componentWillUnmount() {
    // Paytm.removeListener(Paytm.Events.PAYTM_RESPONSE, this.onPayTmResponse);
  }

  onPayTmResponse = (resp) => {
    const { STATUS, status, response } = resp;

    if (Platform.OS === 'ios') {
      if (status === 'Success') {
        const jsonResponse = JSON.parse(response);
        const { STATUS } = jsonResponse;

        if (STATUS && STATUS === 'TXN_SUCCESS') {
          // Payment succeed!
        }
      }
    } else {
      if (STATUS && STATUS === 'TXN_SUCCESS') {
        // Payment succeed!
      }
    }
  }

  runTransaction = (amount, customerId, orderId, mobile, email, checkSum, mercUnqRef) => {
    const callbackUrl = `${paytmConfig.CALLBACK_URL}${orderId}`;
    const details = {
      mode: 'Staging', // 'Staging' or 'Production'
      MID: paytmConfig.MID,
      INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
      WEBSITE: paytmConfig.WEBSITE,
      CHANNEL_ID: paytmConfig.CHANNEL_ID,
      TXN_AMOUNT: `${amount}`, // String
      ORDER_ID: orderId, // String
      EMAIL: email, // String
      MOBILE_NO: mobile, // String
      CUST_ID: customerId, // String
      CHECKSUMHASH: checkSum, //From your server using PayTM Checksum Utility 
      CALLBACK_URL: callbackUrl,
      MERC_UNQ_REF: mercUnqRef, // optional
    };

    // Paytm.startPayment(details);
  }

  renderInner = () => {
    return (
      <View style={{ height: 600, backgroundColor: '#fff', borderWidth: 1, borderRadius: 10 }} >

      </View>
    )
  }

  renderHeader = () => {
    return (
      <Text>Header</Text>
    )
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }} >
          <Navigator />
        </SafeAreaView>
        <NetworkState
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          onConnected={() => console.log('connected')}
          onDisconnected={() => Settings.openWifi()}
        />
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
