import { Platform } from 'react-native';
import Paytm from '@philly25/react-native-paytm';
import PrivateApi from '../api/private.api';
import { AccessNestedObject } from './common.util';
import { PAYTM_CONFIG } from '../config/app.config';

async function AddAmountToWallet(amount, user, callback = () => { }) {
  var orderIdRef;
  Paytm.addListener(Paytm.Events.PAYTM_RESPONSE, onResponse);

  async function onResponse(resp) {
    Paytm.removeListener(Paytm.Events.PAYTM_RESPONSE, onResponse);
    let jsonResponse;

    if (Platform.OS === 'ios') {
      jsonResponse = JSON.parse(resp.response);
    } else {
      jsonResponse = resp;
    }

    if (jsonResponse.status == "Cancel") {
      jsonResponse.ORDERID = orderIdRef;
      jsonResponse.ORDER_ID = orderIdRef;
    }

    const result = await PrivateApi.ValidatePayment(jsonResponse);
    if (result.success) {
      callback({ success: true, user: result.response });
    } else {
      callback({ success: false })
    }
  }


  const result = await PrivateApi.InitiatePayment({ amount });
  if (result.success) {
    const orderId = AccessNestedObject(result, 'response.order_id');
    orderIdRef = orderId;
    const checksum = AccessNestedObject(result, 'response.checksum');

    const callbackUrl = `${PAYTM_CONFIG.CALLBACK_URL}${orderId}`;
    const details = {
      mode: PAYTM_CONFIG.MODE, // 'Staging' or 'Production'
      MID: PAYTM_CONFIG.MID,
      INDUSTRY_TYPE_ID: PAYTM_CONFIG.INDUSTRY_TYPE_ID,
      WEBSITE: PAYTM_CONFIG.WEBSITE,
      CHANNEL_ID: PAYTM_CONFIG.CHANNEL_ID,
      TXN_AMOUNT: `${parseFloat(amount)}`, // String
      ORDER_ID: orderId, // String
      EMAIL: user.email, // String
      MOBILE_NO: user.mobile, // String
      CUST_ID: user._id, // String
      CHECKSUMHASH: checksum, //From your server using PayTM Checksum Utility 
      CALLBACK_URL: callbackUrl
    };

    Paytm.startPayment(details);
  }
}

export { AddAmountToWallet }