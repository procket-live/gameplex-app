import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import IconComponent from '../icon/icon.component';

const WalletDetail = props => {
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
                            ₹51
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
                            ₹51
                    </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 10, color: ON_PRIMARY }} >
                            Untilized
                    </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 14, color: ON_PRIMARY }} >
                            ₹0
                    </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 10, color: ON_PRIMARY, fontWeight: '500' }} >
                            Wining
                    </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 14, color: ON_PRIMARY }} >
                            ₹51
                    </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 10, color: ON_PRIMARY, fontWeight: '500' }} >
                            Cash Bonus
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
})

export default WalletDetail;