import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { ON_PRIMARY, GREY_1, PRIMARY_COLOR, TEXT_COLOR } from '../../constant/color.constant';

function Button({ text, onPress = () => { }, disabled, loading, style }) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.container, disabled ? styles.disabled : styles.active, style]}
            onPress={onPress}
        >
            {
                loading ?
                    <ActivityIndicator
                        animating
                        size="small"
                        color={TEXT_COLOR}
                    /> :
                    <Text style={styles.text} >
                        {text}
                    </Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        backgroundColor: GREY_1
    },
    active: {
        backgroundColor: PRIMARY_COLOR
    },
    text: {
        color: ON_PRIMARY,
        fontSize: 16,
    }
})

export default Button;