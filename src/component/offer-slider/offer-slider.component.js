import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { useQuery } from '@apollo/react-hooks';

import { widthPercentageToDP } from 'react-native-responsive-screen';
import { OffersQuery } from '../../graphql/graphql.query';

const OfferSlider = ({ height = 180 }) => {
    const width = widthPercentageToDP(85);
    const { data, loading } = useQuery(OffersQuery)
    console.log('data', data)
    return (
        <Carousel
            autoplay
            loop
            data={data?.offers || [1]}
            renderItem={({ item, key }) => {
                if (loading) {
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
