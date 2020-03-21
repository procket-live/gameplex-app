import React from 'react';
import { View, ImageBackground, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { ON_PRIMARY, PRIMARY_COLOR, TEXT_COLOR, GREY_3, GREY_BG } from '../../constant/color.constant';

function GameScene({ user, navigation }) {
    const game = navigation.getParam('game') || {};

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <ImageBackground
                    style={styles.wallpaper}
                    source={{ uri: game.wallpaper }}
                >
                    <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black', opacity: 0.4 }]} />
                    <View style={{ flex: 2, justifyContent: 'flex-end' }} >
                        <Text style={styles.title} >{game.name}</Text>
                    </View>

                    <Image
                        source={{ uri: game.thumbnail }}
                        style={{ top: 0, width: 100, height: 120, resizeMode: 'cover', elevation: 2, borderRadius: 10, borderWidth: 1, borderColor: ON_PRIMARY }}
                    />
                </ImageBackground>
                <View style={styles.container2} >
                    <View style={styles.detailsContainer} >
                        <Text style={styles.fontMini} >
                            {game.description}
                        </Text>
                    </View>
                    <View style={[styles.detailsContainer, { marginTop: 10, overflow: 'hidden' }]} >
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR
    },
    container2: {
        padding: 10
    },
    wallpaper: {
        height: 130,
        flexDirection: 'row',
        padding: 15
    },
    title: {
        fontSize: 18,
        color: ON_PRIMARY
    },
    detailsContainer: {
        backgroundColor: ON_PRIMARY,
        borderRadius: 10,
        padding: 5
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    inputText: {
        borderWidth: 1,
        borderColor: GREY_BG,
        width: 70,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    fontMini: {
        color: GREY_3,
        fontSize: 14,
        fontWeight: '500'
    },
    fontH1: {
        color: TEXT_COLOR,
        fontSize: 22,
        fontWeight: '500'
    },
    fontMiniLight: {
        color: GREY_3,
        fontSize: 14,
        fontWeight: '300'
    },
})


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(GameScene);
