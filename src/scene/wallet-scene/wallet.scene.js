import React, { Component } from 'react';
import { View, Text } from 'react-native';

class WalletScene extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text>Wallet!</Text>
            </View>
        );
    }
}

export default WalletScene;
