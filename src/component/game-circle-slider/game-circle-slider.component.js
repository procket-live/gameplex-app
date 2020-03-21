import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { ON_PRIMARY } from '../../constant/color.constant';
import NotifyService from '../../service/notify.service';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigate } from '../../service/navigation.service';

const GameCircleSlider = () => {
    const games = [
        { text: "Fantasy Sports", color: "#2980b9", image: 'https://miro.medium.com/max/3840/1*C9ndHCk1fWCtaxla5GytXw.jpeg' },
        // { text: "", image: "https://image.freepik.com/free-vector/quiz-neon-sign_1262-19629.jpg" }
    ]
    function RenderTextCircle({ item, key }) {
        const { text, image } = item;
        return (
            <TouchableOpacity
                style={{ borderRadius: 10, overflow: 'hidden', marginTop: 5, width: widthPercentageToDP(95), height: 130 }}
                onPress={() => {
                    navigate('Fantasy')
                    // NotifyService.notify({ title: "Underprocess", message: "This feature is under development" })
                }}
                key={key}
            >
                <ImageBackground style={styles.container} source={{ uri: image }} >
                    <Text style={{ color: ON_PRIMARY, fontSize: 30, position: 'absolute', bottom: 0, right: 10, backgroundColor: 'rgba(0,0,0,0.4)', paddingRight: 10, paddingLeft: 10 }} >
                        {text}
                    </Text>
                </ImageBackground>
            </TouchableOpacity >
        )
    }

    return (
        <>
            <FlatList
                horizontal={false}
                data={games}
                showsHorizontalScrollIndicator={false}
                renderItem={RenderTextCircle}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(95),
        height: 130,
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        resizeMode: 'cover'
    }
})

export default GameCircleSlider;
