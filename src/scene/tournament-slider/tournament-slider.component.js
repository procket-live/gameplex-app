import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { navigate } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';
import { TEXT_COLOR, PRIMARY_COLOR } from '../../constant/color.constant';
import TournamentCard from '../../component/tournament-card/tournament.card';

const TournamentSlider = props => {
    const tournaments = AccessNestedObject(props, 'tournament.list', []);
    const loading = AccessNestedObject(props, 'tournament.loading', false);

    return (
        <>
            <View style={{ flexDirection: 'row', margin: 15 }}>
                <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <Text style={{ fontWeight: '500', color: TEXT_COLOR, fontSize: 14 }} >
                        UPCOMING TOURNAMENTS
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigate('TournamentList');
                        }}
                    >
                        <Text style={{ fontWeight: '500', color: PRIMARY_COLOR, fontSize: 12 }} >View All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                horizontal
                data={tournaments}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, key }) => <TournamentCard user={props.user} tournament={item} loading={loading} key={key} />}
            />
        </>
    )
}

const mapStateToProps = state => ({
    tournament: state.tournament
})

export default connect(mapStateToProps)(TournamentSlider);
