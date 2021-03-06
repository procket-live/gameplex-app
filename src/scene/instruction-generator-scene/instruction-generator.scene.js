import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { TEXT_COLOR, GREY_3, GREY_2, GREY_1, PRIMARY_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export function Title(props) {
    return (
        <View style={styles.titleContainer} >
            <Text style={styles.title} >
                {props.children}
            </Text>
        </View>
    )
}

export function Content(props) {
    return (
        <View style={styles.contentContainer} >
            <Text style={[styles.content, props.bold ? styles.bold : {}]} >
                {props.children}
            </Text>
        </View>
    )
}

export function ImageComponent(props) {
    return (
        <Image source={{ uri: props.children }} style={styles.image} />
    )
}

export function Break() {
    return (
        <View style={styles.break} />
    )
}

function InstructionGeneratorScene({ navigation }) {
    const steps = navigation.getParam('steps') || [];

    return (
        <ScrollView style={styles.container} >
            {
                steps.map((item) => {
                    return (
                        <>
                            <Title>{item.name}</Title>
                            <Content>
                                {item.message}
                            </Content>
                            <Content bold >
                                {item.note}
                            </Content>
                            {
                                item.image ?
                                    <ImageComponent>
                                        {item.image}
                                    </ImageComponent> : null
                            }
                            <Break />
                        </>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    titleContainer: {
        height: 40,
    },
    title: {
        fontSize: 18,
        color: GREY_2
    },
    contentContainer: {
        paddingTop: 10,
        paddingBottom: 10
    },
    bold: {
        color: PRIMARY_COLOR,
    },
    break: {
        borderTopWidth: 1,
        borderColor: GREY_1,
        paddingTop: 10,
        paddingBottom: 10
    },
    image: {
        width: widthPercentageToDP(90),
        height: 200,
        resizeMode: 'contain'
    }
})

export default InstructionGeneratorScene;