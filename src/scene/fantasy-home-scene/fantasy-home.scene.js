import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image'
import HeaderComponent from '../../component/header/header.component';
import OfferSlider from '../../component/offer-slider/offer-slider.component';
import { ON_PRIMARY, PRIMARY_COLOR, TEXT_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';

function FantasyHomeScene({ }) {
    const offers = [
        { image: 'https://d13ir53smqqeyp.cloudfront.net/d11-static-pages/images/BBL_Tour-banner.jpg' },
        { image: 'https://www.indiafantasy.com/wp-content/uploads/BRB-vs-NJ.jpg' }
    ]
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
                        <FastImage style={{ width: 180, height: 180 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Cricket-hit-wall-sticker1.png' }} />
                    </View>
                </View>
            </View>
        </>
    )
}

export default FantasyHomeScene;