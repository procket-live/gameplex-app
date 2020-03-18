import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


import { widthPercentageToDP } from 'react-native-responsive-screen';

const OfferSlider = ({ offers = [] }) => {
    return (
        <Carousel
            autoplay
            loop
            data={offers}
            renderItem={({ item, key }) => {
                if (item.loading) {
                    return (
                        <Placeholder
                            Animation={Fade}
                        >
                            <PlaceholderLine style={styles.slide} />
                        </Placeholder>
                    )
                }

                return (
                    <ImageBackground
                        key={key}
                        source={{ uri: item.image }}
                        style={styles.slide}
                    >
                    </ImageBackground>
                )
            }}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={widthPercentageToDP(85)}
        />
    )
}

const styles = StyleSheet.create({
    slide: {
        width: widthPercentageToDP(85),
        height: 180,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'contain'
    }
})

export default OfferSlider;
