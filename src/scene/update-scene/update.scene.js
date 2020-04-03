import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { AppUpdateLogo } from '../../config/image.config';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { TEXT_COLOR, GREY_1, PRIMARY_COLOR } from '../../constant/color.constant';
import Button from '../../component/button/button.component';
import { Linking } from 'react-native';
import APP_CONFIG from '../../config/app.config';

function UpdateScene() {
    return (
        <View style={styles.container} >
            <Image source={AppUpdateLogo()} style={{ width: widthPercentageToDP(100), height: heightPercentageToDP(38.7), resizeMode: 'contain' }} />
            <View style={{ height: heightPercentageToDP(20), alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 26, color: TEXT_COLOR, fontWeight: 'bold' }} >New update is available</Text>
            </View>
            <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 14, color: GREY_1, fontWeight: '300' }} >
                    The current version of app is no longer supported.
                </Text>
            </View>
            <View style={{ height: heightPercentageToDP(25), alignItems: 'center', justifyContent: 'center' }} >
                <Button
                    onPress={() => {
                        Linking.openURL(APP_CONFIG.DONWLOAD_LINK)
                    }}
                    text="Update now"
                    style={{ backgroundColor: PRIMARY_COLOR, width: widthPercentageToDP(70) }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default UpdateScene;
