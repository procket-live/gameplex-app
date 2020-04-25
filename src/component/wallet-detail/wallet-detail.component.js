import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import { PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import { AccessNestedObject } from '../../utils/common.util';
import DiamondIcon from '../../assets/svg/diamong';
import TicketIcon from '../../assets/svg/ticket';
import CoinIcon from '../../assets/svg/coin';

const WalletDetail = props => {
    const cashBalance = AccessNestedObject(props, 'user.wallet_cash_balance', 0);
    const bonousBalance = AccessNestedObject(props, 'user.wallet_bonous_balance', 0);
    const winAmount = AccessNestedObject(props, 'user.wallet_win_balance', 0);

    return (
        <View
            style={{ width: widthPercentageToDP(95), height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#10ac84', borderRadius: 10, flexDirection: 'row' }} >
            <View style={{ flex: 1 }} >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 5 }} >
                        {cashBalance}
                    </Text>
                    <DiamondIcon width={15} height={15} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >Diamonds</Text>
                </View>
            </View>
            <View style={{ flex: 1 }} >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 5 }} >
                        {bonousBalance}
                    </Text>
                    <TicketIcon width={20} height={20} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >Ticket</Text>
                </View>
            </View>
            <View style={{ flex: 1 }} >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 5 }} >
                        {winAmount}
                    </Text>
                    <CoinIcon width={20} height={20} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >Win Coin</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        height: 150,
        padding: 10,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
    }
});

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(WalletDetail);