import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import TournamentCard from '../../component/tournament-card/tournament.card';
import { AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';

const TournamentList = props => {
    const [tournaments, setTournaments] = useState([1, 2, 3]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, [])

    async function fetchData() {
        const result = await PrivateApi.GetJoinedTournaments();
        console.log('result', result);
        if (result.success) {
            setTournaments(AccessNestedObject(result, 'response', []))
        } else {
            setTournaments([])
        }
    }

    return (
        <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={tournaments}
            renderItem={({ item }) => (
                <View style={{ marginTop: 10, marginBottom: 10 }} >
                    <TournamentCard
                        tournament={item}
                        loading={loading}
                    />
                </View>
            )}
        />
    )
}

export default TournamentList;
