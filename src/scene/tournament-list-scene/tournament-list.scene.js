import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import TournamentCard from '../../component/tournament-card/tournament.card';
import { AccessNestedObject } from '../../utils/common.util';
import PrivateApi from '../../api/private.api';

const TournamentList = props => {
    const { loading, list } = props.tournament || {};

    return (
        <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={list}
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

const mapStateToProps = state => ({
    tournament: state.tournament
})

export default connect(mapStateToProps)(TournamentList);
