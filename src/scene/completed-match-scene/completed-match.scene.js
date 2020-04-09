import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import BattleCard from '../../component/battle-card/battle-card.component';
import PrivateApi from '../../api/private.api';
import { AccessNestedObject } from '../../utils/common.util';
import { navigate } from '../../service/navigation.service';

function ManageCompletedMatchScene({ navigation }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const active = !!navigation.getParam('active');

        setLoading(true)
        const result = await PrivateApi.GetAllCompletedBattleQueue(active);
        setLoading(false);
        if (result.success) {
            setList(result.response || [])
        }
    }


    function navigateToManagePage(queueEntry) {
        const tournamentId = AccessNestedObject(queueEntry, 'tournament._id');
        navigate('ManageTournament', { id: tournamentId, callback: () => { }, queueEntry })
    }

    return (
        <>
            <FlatList
                style={{ padding: 10 }}
                contentContainerStyle={{ alignItems: 'center' }}
                data={list}
                renderItem={({ item, key }) => {
                    return (
                        <BattleCard
                            key={key}
                            item={item.match}
                            queueEntry={item}
                            proceedToChat={navigateToManagePage}
                        />
                    )
                }}
            />
            <Spinner
                visible={loading}
                textContent={'Loading...'}
            />
        </>
    )
}

export default ManageCompletedMatchScene;
