import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { PRIMARY_COLOR } from '../../constant/color.constant';

function TNCScene() {
    return (
        <WebView
            source={{ uri: 'https://www.termsandconditionsgenerator.com/live.php?token=KpAY38T1omPltvNzNMUqW4GRVbx2RFyu' }}
            startInLoadingState
            renderLoading={() => {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator size="large" animating color={PRIMARY_COLOR} />
                    </View>
                )
            }}
        />
    )
}

export default TNCScene;