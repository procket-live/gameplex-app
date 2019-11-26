import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { widthPercentageToDP } from 'react-native-responsive-screen';
import { GradientBackground } from '../../config/image.config';

const OfferSlider = props => {
    return (
        <Carousel
            autoplay
            loop
            data={props.entries}
            renderItem={(item, key) => {
                return (
                    <ImageBackground
                        key={key}
                        source={GradientBackground()}
                        style={styles.slide}
                    >
                    </ImageBackground>
                )
            }}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={widthPercentageToDP(90)}
        />
    )
}

const styles = StyleSheet.create({
    slide: {
        width: widthPercentageToDP(90),
        height: 100,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'contain'
    }
})

export default OfferSlider;
