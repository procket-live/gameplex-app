import { Platform } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import PrivateApi from '../api/private.api';
import { AccessNestedObject } from './common.util';
import { RAZORPAY } from '../config/app.config';
import { PRIMARY_COLOR } from '../constant/color.constant';

async function AddAmountToWallet(amount, user = {}, callback = () => { }) {
    const result = await PrivateApi.InitiatePayment({ amount });
    if (result.success) {
        const orderId = AccessNestedObject(result, 'response.order_id');
        var options = {
            description: 'Add wallet amount',
            image: '',
            currency: 'INR',
            key: RAZORPAY,
            amount: String(amount * 100),
            name: 'Gameplex',
            order_id: orderId,
            prefill: {
                email: user.email,
                contact: user.mobile,
                name: user.name
            },
            theme: { color: PRIMARY_COLOR }
        }

        try {
            const data = await RazorpayCheckout.open(options);
            const paymentValidate = await PrivateApi.ValidatePayment(data);
            if (paymentValidate.success) {
                callback({ success: true, user: AccessNestedObject(paymentValidate, 'response') })
            } else {
                callback({ success: false })
            }
        } catch (err) {
            const data = Object.assign(err, { razorpay_order_id: orderId });
            PrivateApi.ValidatePayment(data);
            callback({ success: false, err });
        }
    } else {
        callback({ success: false })
    }
}

export { AddAmountToWallet }