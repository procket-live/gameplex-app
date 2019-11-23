import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeScene extends Component {
    render() {
        console.log('Login', this.props);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>HomefffScene!</Text>
            </View>
        );
    }
}

export default HomeScene;