import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { ON_PRIMARY } from '../../constant/color.constant';
import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GetWalletQuery } from '../../graphql/graphql.query';
import { useFocusEffect, useNavigationEvents } from 'react-navigation-hooks';

function WalletDetail() {
    const { data, loading, refetch } = useQuery(GetWalletQuery, { partialRefetch: true }) || {};

    const cashBalance = AccessNestedObject(data, 'me.wallet.wallet_cash_balance');
    const bonousBalance = AccessNestedObject(data, 'me.wallet.wallet_bonous_balance');
    const winAmount = AccessNestedObject(data, 'me.wallet.wallet_win_balance');

    useNavigationEvents((event) => {
        if (event?.state?.routeName == "WalletScene") {
            if (refetch && typeof refetch == "function") {
                refetch();
            }
        }
    })

    function DisplayAmount({ amount }) {
        if (loading) {
            return (
                <ActivityIndicator
                    animating
                    size="small"
                    color={ON_PRIMARY}
                />
            )
        }

        return (
            <Text style={{ fontSize: 18, color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 5 }} >
                {DisplayPrice(amount)}
            </Text>
        )
    }

    return (
        <View
            style={{ width: widthPercentageToDP(95), height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#10ac84', borderRadius: 10, flexDirection: 'row' }} >
            <View style={{ flex: 1 }} >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                    <DisplayAmount
                        amount={cashBalance}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >
                        Cash Balance
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1 }} >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                    <DisplayAmount
                        amount={bonousBalance}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >
                        Bonous Balance
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1 }} >
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                    <DisplayAmount
                        amount={winAmount}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Text style={{ fontSize: 16, color: ON_PRIMARY, fontWeight: '100', opacity: 0.5 }} >
                        Win Balance
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default WalletDetail;