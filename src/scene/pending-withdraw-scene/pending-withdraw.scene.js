import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import TournamentCard from '../../component/tournament-card/tournament.card';
import { AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';
import WithdrawRequestCard from '../../component/withdraw-request-component/withdraw-request.component';
import { GREY_BG } from '../../constant/color.constant';

const PendingWithdrawScene = props => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    async function fetch() {
        setLoading(true);
        const result = await PrivateApi.GetWithdrawRequest();
        setLoading(false);
        if (result.success) {
            setList(result.response);
        }
    }


    return (
        <FlatList
            style={{ flex: 1, backgroundColor: GREY_BG }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={list}
            renderItem={({ item }) => (
                <View style={{ marginTop: 10, marginBottom: 10 }} >
                    <WithdrawRequestCard item={item} />
                </View>
            )}
        />
    )
}

const mapStateToProps = state => ({
    tournament: state.tournament
})

export default connect(mapStateToProps)(PendingWithdrawScene);
