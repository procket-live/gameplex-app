import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


import { widthPercentageToDP } from 'react-native-responsive-screen';

const OfferSlider = ({ offers = [], height = 180 }) => {
    const width = widthPercentageToDP(85);

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
                            <PlaceholderLine style={[styles.slide, { width, height }]} />
                        </Placeholder>
                    )
                }

                return (
                    <ImageBackground
                        key={key}
                        source={{ uri: item.image }}
                        style={[styles.slide, { width, height }]}
                    >
                    </ImageBackground>
                )
            }}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={width}
        />
    )
}

const styles = StyleSheet.create({
    slide: {
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'contain'
    }
})

export default OfferSlider;
