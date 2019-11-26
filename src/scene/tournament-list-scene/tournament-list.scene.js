import React from 'react';
import { FlatList, View } from 'react-native';
import TournamentCard from '../../component/tournament-card/tournament.card';

const TournamentList = props => {
    return (
        <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={() => (
                <View style={{ marginTop: 10, marginBottom: 10 }} >
                    <TournamentCard width="95" />
                </View>
            )}
        />
    )
}

export default TournamentList;
