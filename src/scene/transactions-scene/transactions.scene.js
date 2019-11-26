import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Tabs from '../../component/tabs/tabs.component';

class TransactionsScene extends Component {
    render() {
        return (
            <View style={{ flex: 1, }}>
                <Tabs >
                    <View tabLabel="Winning" style={{ flex: 1 }}  ></View>
                    <View tabLabel="Joined" style={{ flex: 1 }}  ></View>
                    <View tabLabel="Deposit" style={{ flex: 1 }}  ></View>
                    <View tabLabel="Withdrawal" style={{ flex: 1 }}  ></View>
                </Tabs>
            </View>
        );
    }
}

export default TransactionsScene;
