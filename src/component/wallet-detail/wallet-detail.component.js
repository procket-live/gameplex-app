import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import { PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import IconComponent from '../icon/icon.component';
import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';

const WalletDetail = props => {
    const cashBalance = AccessNestedObject(props, 'user.wallet_cash_balance', 0);
    const bonousBalance = AccessNestedObject(props, 'user.wallet_bonous_balance', 0);

    return (
        <View style={styles.container} >
            <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 12, color: ON_PRIMARY }} >
                            Available Balance
                    </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: '500' }} >
                            {DisplayPrice(cashBalance + bonousBalance)}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', padding: 5 }} >
                    <TouchableOpacity
                        onPress={props.navigateToAddMoney}
                        style={{ width: 30, height: 30, borderWidth: 1, borderColor: ON_PRIMARY, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <IconComponent name="plus" size={20} focused tintColor={ON_PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 14, color: ON_PRIMARY }} >
                            {DisplayPrice(cashBalance)}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 10, color: ON_PRIMARY }} >
                            Cash Balance
                    </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }} >
                    {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 14, color: ON_PRIMARY }} >
                            {Dis}
                    </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 10, color: ON_PRIMARY, fontWeight: '500' }} >
                            Wining
                    </Text>
                    </View> */}
                </View>
                <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 14, color: ON_PRIMARY }} >
                            {DisplayPrice(bonousBalance)}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 10, color: ON_PRIMARY, fontWeight: '500' }} >
                            Bonus
                    </Text>
                    </View>
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