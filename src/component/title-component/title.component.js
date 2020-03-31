import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';

function TitleComponent({ title }) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer} >
                <Text style={styles.text} >
                    {title}
                </Text>
            </View>
            <View style={styles.buttonContainer} >
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
    },
    textContainer: {
        height: 50,
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '100',
        color: ON_PRIMARY,
        fontSize: 16
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default TitleComponent;