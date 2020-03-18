import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Freshchat, ConversationOptions } from 'react-native-freshchat-sdk';

import WalletDetail from '../../component/wallet-detail/wallet-detail.component';
import MenuItem from '../../component/menu-item/menu-item.component';
import { navigate } from '../../service/navigation.service';

class WalletScene extends Component {
    navigateToAddMoney = () => {
        this.props.navigation.push('AddMoney')
    }

    navigateToTransactions = () => {
        navigate('Transactions');
    }

    navigateToJoinedTournaments = () => {
        navigate('JoinedTournament');
    }

    navigateToContactUs = () => {
        const conversationOptions = new ConversationOptions();
        conversationOptions.tags = ["payment"];
        conversationOptions.filteredViewTitle = "Contact us";
        Freshchat.showConversations(conversationOptions);
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
            >
                <View style={styles.walletDetailContainer} >
                    <WalletDetail
                        navigateToAddMoney={this.navigateToAddMoney}
                    />
                </View>
                <View style={styles.menuContainer} >
                    <MenuItem
                        name="Transaction History"
                        detail="Your past wallet transactions"
                        onPress={this.navigateToTransactions}
                    />
                    <MenuItem
                        name="Joined Tournaments"
                        detail="List of all joined tournaments"
                        onPress={this.navigateToJoinedTournaments}
                    />
                    <MenuItem
                        name="Contact Us"
                        detail="We love to hear from you"
                        onPress={this.navigateToContactUs}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    walletDetailContainer: {
        padding: 15,
        alignItems: 'center'
    },
    menuContainer: {
    }
})

export default WalletScene;
