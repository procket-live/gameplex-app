import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, ON_PRIMARY, GREY_1, TEXT_COLOR, GREY_2, GREY_BG } from '../../constant/color.constant';
import Button from '../../component/button/button.component';
import IconComponent from '../../component/icon/icon.component';
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

    render() {
        return (
            <ScrollView
                style={styles.container}
            >
                <View style={styles.walletDetailContainer} >
                    {/* <WalletDetail
                        navigateToAddMoney={this.navigateToAddMoney}
                    /> */}
                </View>
                <View style={styles.menuContainer} >
                    <MenuItem
                        name="Transaction History"
                        detail="Your past wallet transactions"
                        onPress={this.navigateToTransactions}
                    />
                    {/* <MenuItem
                        name="Add Money"
                        detail="Using netbanking, UPI, debit card and more"
                        onPress={this.navigateToAddMoney}
                    /> */}
                    <MenuItem
                        name="Joined Tournaments"
                        detail="List of all joined tournaments"
                        onPress={this.navigateToJoinedTournaments}
                    />
                    <MenuItem name="Contact Us" detail="We love to hear from you" />
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
        marginTop: 10
    }
})

export default WalletScene;
