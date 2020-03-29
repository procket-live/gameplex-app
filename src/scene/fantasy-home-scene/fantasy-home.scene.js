import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image'
import HeaderComponent from '../../component/header/header.component';
import OfferSlider from '../../component/offer-slider/offer-slider.component';
import { ON_PRIMARY, PRIMARY_COLOR, TEXT_COLOR } from '../../constant/color.constant';
import { CricketHitIcon } from '../../config/image.config';
import { AccessNestedObject } from '../../utils/common.util';

function FantasyHomeScene({ navigation }) {
    const battle = navigation.getParam('battle') || {};
    const offers = AccessNestedObject(battle, 'offers', []);

    return (
        <>
            <HeaderComponent fantasy />
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 10, marginBottom: 10 }} >
                    <OfferSlider offers={offers} />
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: PRIMARY_COLOR, paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ height: 50, flex: 2, alignItems: 'flex-start', justifyContent: 'center', }} >
                        <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14 }} >
                            UPCOMING TOURNAMENTS
                    </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: TEXT_COLOR }} >No upcoming contests</Text>
                    </View>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }} >
                        <FastImage style={{ width: 180, height: 180 }} source={CricketHitIcon()} />
                    </View>
                </View>
            </View>
        </>
    )
}

export default FantasyHomeScene;