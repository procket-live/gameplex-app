module.exports = {
    BASE_URL: __DEV__ ? 'http://192.168.0.100:3001' : 'https://gameplex-app.herokuapp.com',
    PAYTM_CONFIG: {
        MODE: 'Staging',
        MID: 'gzGeYn36130961827220',
        WEBSITE: 'WEBSTAGING',
        CHANNEL_ID: 'WAP',
        INDUSTRY_TYPE_ID: 'Retail',
        CALLBACK_URL: 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp?ORDER_ID='
    },
    RAZORPAY: __DEV__ ? 'rzp_test_VhrhI0BbetdOyJ' : 'rzp_live_ASqJv1UILjSDj4',
    FRESHCHAT: {
        APP_ID: '54df8003-27ad-4799-b5ed-5770c3a4a7c0',
        APP_KEY: '24bb1432-a903-4390-9c0c-3dd90b68c018'
    }
}