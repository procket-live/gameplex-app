import React, { useEffect } from 'react';
import { View } from 'react-native';
// import QB from 'quickblox-react-native-sdk';
import { connect } from 'react-redux';

function ChatScreen() {

    useEffect(() => {
        authQB(({ success }) => {
            // if (success) {
            //     QB.chat
            //         .createDialog({
            //             type: QB.chat.DIALOG_TYPE.CHAT,
            //             occupantsIds: [104955275]
            //         })
            //         .then(function (dialog) {
            //             // handle as necessary, i.e.
            //             // subscribe to chat events, typing events, etc.
            //         })
            //         .catch(function (e) {
            //             // handle error
            //         });
            // }
        });
        return () => {

        }
    })

    return (
        <View>

        </View>
    )
}

function authQB(callback = () => { }) {
    const appSettings = {
        appId: 80891,
        authKey: 'dMHKttwQcAVJQGK',
        authSecret: 'SCdqjUjhky9x3YY',
        accountKey: 'FyNVBwNGPGpEdqmpPDYF'
    };

    // QB.settings
    //     .init(appSettings)
    //     .then(function () {
    //         callback({ success: true })
    //     })
    //     .catch(function (e) {
    //         callback({ success: false })
    //     });
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(ChatScreen);
