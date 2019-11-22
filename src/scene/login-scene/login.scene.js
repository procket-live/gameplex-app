import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class LoginScene extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Login!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red'
    }
})

export default LoginScene;
