import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { GREY_BG, ON_PRIMARY, PRIMARY_COLOR } from '../../constant/color.constant';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


const TournamentCardPlaceholder = () => {
    return (
        <View style={styles.container} >
            <Placeholder
                Animation={Fade}
            >
                <PlaceholderLine style={styles.imageContainer} />
                <View style={styles.detailsContainer} >
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                    <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', height: 50 }} >
                        <View style={{ flex: 1 }} >
                            <View style={{ flex: 1, alignItems: 'flex-start' }} >
                                <PlaceholderLine width={50} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-start' }} >
                                <PlaceholderLine width={40} />
                            </View>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View style={{ flex: 1, alignItems: 'center' }} >
                                <PlaceholderLine width={50} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }} >
                                <PlaceholderLine width={40} />
                            </View>
                        </View>
                        <View style={{ flex: 1 }} >
                            <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                <PlaceholderLine width={50} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                <PlaceholderLine width={40} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer} >
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                        <View style={styles.circleContainer} >
                            <PlaceholderLine style={styles.circle} />
                        </View>
                        <View style={[styles.circleContainer, styles.moveLeft]} >
                            <PlaceholderLine style={styles.circle} />
                        </View>
                        <View style={[styles.circleContainer, styles.moveLeft]} >
                            <PlaceholderLine style={styles.circle} />
                        </View>
                    </View>
                </View>
            </Placeholder>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(93),
        height: 263,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: GREY_BG,
    },
    detailsContainer: {
        height: 100,
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: widthPercentageToDP(93),
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    image: {
        width: widthPercentageToDP(93),
        height: 100,
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    bottomContainer: {
        padding: 5,
        borderTopWidth: 1,
        borderColor: GREY_BG,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    circleContainer: {
        width: 30,
        height: 30,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: ON_PRIMARY,
        borderRadius: 30,
    },
    circle: {
        width: 30,
        height: 30,
        resizeMode: 'contain',

    },
    moveLeft: {
        marginLeft: -10
    },
    countCircleContainer: {
        width: 30,
        height: 30,
        borderWidth: 3,
        borderColor: ON_PRIMARY,
        borderRadius: 30,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TournamentCardPlaceholder;
