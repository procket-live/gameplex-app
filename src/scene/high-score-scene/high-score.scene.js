import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { PRIMARY_COLOR, ON_PRIMARY, GREY_2, GREY_1 } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigatePop, navigate } from '../../service/navigation.service';

function HighScoreScene({ user, navigation }) {
    const score = navigation.getParam('score');
    const callback = navigation.getParam('callback') || (() => { });

    function onPress() {
        callback({ score: score });
        navigate("Tournament")
    }

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }} ></View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ width: 100, height: 100, borderWidth: 5, borderColor: GREY_2, borderRadius: 100, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: GREY_1 }} >
                    <FastImage resizeMode="contain" style={{ width: 80, height: 80 }} source={{ uri: user.profile_image }} />
                </View>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-start' }} >
                <Text style={{ fontSize: 46, color: ON_PRIMARY, fontWeight: 'bold' }} >
                    YOUR SCORE : {score}
                </Text>
                <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', padding: 20, textAlign: 'center' }} >
                    Your ranking will be created after tournament completed.
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                <TouchableOpacity
                    style={{
                        width: widthPercentageToDP(90),
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: ON_PRIMARY
                    }}
                    onPress={onPress}
                >
                    <Text style={{ color: PRIMARY_COLOR, fontSize: 22, fontWeight: 'bold' }} >
                        Play again to score more
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR
    }
})

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(HighScoreScene);