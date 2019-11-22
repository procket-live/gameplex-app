import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ProfileScene extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text>Profile!</Text>
            </View>
        );
    }
}

export default ProfileScene;
