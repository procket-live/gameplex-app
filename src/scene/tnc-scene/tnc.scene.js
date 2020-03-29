import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { PRIMARY_COLOR } from '../../constant/color.constant';
import { TNC_LINK } from '../../config/app.config';

function TNCScene() {
    return (
        <WebView
            source={{ uri: TNC_LINK }}
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