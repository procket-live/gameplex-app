import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NotificationScene extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text>Notification!</Text>
            </View>
        );
    }
}

export default NotificationScene;
