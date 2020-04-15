import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { navigate } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';
import { TEXT_COLOR, PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import TournamentCard from '../../component/tournament-card/tournament.card';
import TitleComponent from '../../component/title-component/title.component';

const TournamentSlider = props => {
    const tournaments = AccessNestedObject(props, 'tournament.list', []);
    const loading = AccessNestedObject(props, 'tournament.loading', false);
    const horizontal = AccessNestedObject(props, 'horizontal', false);
    console.log('tournaments', tournaments)
    return (
        <>
            <TitleComponent title="Upcoming Tournaments" />
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                horizontal={horizontal}
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
