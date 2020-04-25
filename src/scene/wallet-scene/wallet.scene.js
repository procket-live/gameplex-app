import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Freshchat, ConversationOptions } from 'react-native-freshchat-sdk';

import WalletDetail from '../../component/wallet-detail/wallet-detail.component';
import MenuItem from '../../component/menu-item/menu-item.component';
import { navigate } from '../../service/navigation.service';
import HeaderBattleComponent from '../../component/header/header-battle.component';

class WalletScene extends Component {
    navigateToAddMoney = () => {
        this.props.navigation.push('AddMoney')
    }

    navigateToTransactions = () => {
        navigate('Transactions');
    }

    navigateToContactUs = () => {
        const conversationOptions = new ConversationOptions();
        conversationOptions.tags = ["payment"];
        conversationOptions.filteredViewTitle = "Contact us";
        Freshchat.showConversations(conversationOptions);
    }

    navigateToBankDetails = () => {
        navigate('BankDetail');
    }

    navigateToWithdraw = () => {
        navigate('Withdraw');
    }

    navigateToPendingRequests = () => {
        navigate('PendingWithdrawScene');
    }

    render() {
        return (
            <>
                <HeaderBattleComponent
                    name={"Wallet"}
                />
                <ScrollView
                    style={styles.container}
                >
                    <View style={styles.walletDetailContainer} >
                        <WalletDetail />
                    </View>
                    <View style={styles.menuContainer} >
                        <MenuItem
                            name="Add to wallet"
                            detail="Add diamond to wallet"
                            onPress={this.navigateToAddMoney}
                        />
                        <MenuItem
                            name="Transaction History"
                            detail="Your past wallet transactions"
                            onPress={this.navigateToTransactions}
                        />
                        <MenuItem
                            name="Bank Details"
                            detail="Your bank account details"
                            onPress={this.navigateToBankDetails}
                        />
                        <MenuItem
                            name="Withdraw Amount"
                            detail="Withdraw amount to bank account"
                            onPress={this.navigateToWithdraw}
                        />
                        <MenuItem
                            name="Pending Withdraw requests"
                            detail="All pending withdraw requests"
                            onPress={this.navigateToPendingRequests}
                        />
                        <MenuItem
                            name="Raise an issue"
                            detail="Payment related issue?"
                            onPress={this.navigateToContactUs}
                        />
                    </View>
                </ScrollView>
            </>
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
