import React, { useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import Tabs from '../../component/tabs/tabs.component';
import PrivateApi from '../../api/private.api';
import { GREY_BG } from '../../constant/color.constant';

import TournamentCard from '../../component/tournament-card/tournament.card';

function JoinedTournamentScene(props) {
    const [upcomingActiveTournaments, setUpcomingActiveTournaments] = useState([1, 2, 3]);
    const [completedTournaments, setCompletedTournaments] = useState([1, 2, 3]);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        fetchData();
        return () => { }
    }, [])

    async function fetchData() {
        setLoading(true)
        const { success, response = {} } = await PrivateApi.GetMyTournaments();
        setLoading(false)
        if (success) {
            const { joined, completed } = response;
            setUpcomingActiveTournaments(joined);
            setCompletedTournaments(completed);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: GREY_BG }}>
            <Tabs >
                <Box tabLabel="Upcoming Tournaments">
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        renderItem={({ item, key }) => <TournamentCard user={props.user} tournament={item} loading={loading} key={key} />}
                        data={upcomingActiveTournaments}
                        ListEmptyComponent={EmptyList}
                    />
                </Box>
                <Box tabLabel="Completed Tournaments"  >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        renderItem={({ item, key }) => <TournamentCard hideStatus user={props.user} tournament={item} loading={loading} key={key} />}
                        data={completedTournaments}
                        ListEmptyComponent={EmptyList}
                    />
                </Box>
            </Tabs>
        </View>
    )
}

function Box(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}  >
            {props.children}
        </View>
    )
}

function EmptyList() {
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}  >
            <Text>Nothing to show</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(JoinedTournamentScene);
