import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { navigate } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';
import { TEXT_COLOR, PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import TournamentCard from '../../component/tournament-card/tournament.card';

const TournamentSlider = props => {
    const tournaments = AccessNestedObject(props, 'tournament.list', []);
    const loading = AccessNestedObject(props, 'tournament.loading', false);
    const horizontal = AccessNestedObject(props, 'horizontal', false);

    return (
        <>
            <View style={{ flexDirection: 'row', backgroundColor: PRIMARY_COLOR, paddingLeft: 15, paddingRight: 15, marginBottom: 10, marginTop: 10 }}>
                <View style={{ height: 50, flex: 2, alignItems: 'flex-start', justifyContent: 'center', }} >
                    <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14 }} >
                        UPCOMING TOURNAMENTS
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                    {
                        horizontal ?
                            <TouchableOpacity
                                onPress={() => {
                                    navigate('TournamentList');
                                }}
                            >
                                <Text style={{ fontWeight: '500', color: PRIMARY_COLOR, fontSize: 12 }} >View All</Text>
                            </TouchableOpacity> : null
                    }
                </View>
            </View>
            <FlatList
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
