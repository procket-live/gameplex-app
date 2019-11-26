import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { GREY_BG, TEXT_COLOR, GREY_3, ON_PRIMARY, PRIMARY_COLOR } from '../../constant/color.constant';
import IconComponent from '../icon/icon.component';

const IMAGE = 'https://preview.redd.it/h2iz05k9xsm11.jpg?width=960&crop=smart&auto=webp&s=b2ba90222ff111aab4a8b0effecdb1517c5c679c';

const TournamentCard = props => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer} >
                <Image
                    style={styles.image}
                    source={{ uri: IMAGE }}
                />
            </View>
            <View style={styles.detailsContainer} >
                <View style={{ paddingTop: 2, paddingBottom: 2 }} >
                    <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                        SEP 02 - STARTING AT 06:00 PM
                    </Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center' }} >
                    <IconComponent
                        font="fontawesome"
                        size={20}
                        name="mobile"
                    />
                    <Text style={{ fontSize: 16, color: GREY_3, marginLeft: 10, fontWeight: '500' }} >
                        Fortnite Winter Royal
                    </Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center', height: 50 }} >
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: 'flex-start' }} >
                            <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                Prize Pool
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start' }} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                $ 250
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: 'center' }} >
                            <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                Game Mode
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                Solo
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: 'flex-end' }} >
                            <Text style={{ fontSize: 12, color: TEXT_COLOR }} >
                                Entry Fee
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: PRIMARY_COLOR }} >
                                $ 5
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer} >
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                    <View style={styles.circleContainer} >
                        <Image
                            style={styles.circle}
                            source={{ uri: 'https://sguru.org/wp-content/uploads/2017/06/cool-anime-profile-pictures-50422.jpg' }}
                        />
                    </View>
                    <View style={[styles.circleContainer, styles.moveLeft]} >
                        <Image
                            style={[styles.circle]}
                            source={{ uri: 'https://sguru.org/wp-content/uploads/2017/06/cool-anime-profile-pictures-50422.jpg' }}
                        />
                    </View>
                    <View style={[styles.circleContainer, styles.moveLeft]} >
                        <Image
                            style={[styles.circle]}
                            source={{ uri: 'https://sguru.org/wp-content/uploads/2017/06/cool-anime-profile-pictures-50422.jpg' }}
                        />
                    </View>
                    <View style={[styles.countCircleContainer, styles.moveLeft]} >
                        <Text style={{ fontWeight: '300', fontSize: 8, color: ON_PRIMARY }} >+50</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 10, fontWeight: '500', color: PRIMARY_COLOR }} >
                        53/53 Signed
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(93),
        height: 263,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: GREY_BG,
    },
    detailsContainer: {
        height: 120,
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

export default TournamentCard;
