import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ON_PRIMARY } from '../../constant/color.constant';
import NotifyService from '../../service/notify.service';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigate } from '../../service/navigation.service';
import TitleComponent from '../title-component/title.component';

const GameCircleSlider = () => {
    const games = [
        {
            text: "Fantasy Sports",
            image: 'https://miro.medium.com/max/3840/1*C9ndHCk1fWCtaxla5GytXw.jpeg',
            onPress: () => {

            }
        }
    ]

    function RenderTextCircle({ item, key }) {
        const { text, image, onPress } = item;
        return (
            <TouchableOpacity
                style={{ height: 130, width: widthPercentageToDP(95), marginBottom: 10 }}
                onPress={onPress}
                key={key}
            >
                <Image style={styles.image} source={{ uri: image }} />
                <Text style={{ color: ON_PRIMARY, fontSize: 30, position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', paddingRight: 10, paddingLeft: 10, borderBottomRightRadius: 10 }} >
                    {text}
                </Text>
            </TouchableOpacity >
        )
    }

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                horizontal={false}
                ListHeaderComponent={() => <TitleComponent title="Games" />}
                data={games}
                showsHorizontalScrollIndicator={false}
                renderItem={RenderTextCircle}
            />
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: widthPercentageToDP(95),
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        resizeMode: 'cover'
    }
})

export default GameCircleSlider;
