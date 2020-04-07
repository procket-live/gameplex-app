import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { navigate } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';
import TitleComponent from '../../component/title-component/title.component';
import BattleCard from '../battle-card/battle-card.component';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const JoinedMatchSlider = ({ allJoinedMatch = {}, horizontal = false }) => {
    const list = AccessNestedObject(allJoinedMatch, 'list', []);
    const loading = AccessNestedObject(allJoinedMatch, 'loading', false);

    function proceedToChat(queueEntry) {
        navigate('BattleChat', { battleQueue: queueEntry });
    }

    if (list.length == 0) {
        return null;
    }

    return (
        <>
            <TitleComponent title="Joined Match" />
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                horizontal={horizontal}
                data={list}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, key }) => (
                    <View style={{ width: widthPercentageToDP(100), alignItems: 'center' }} >
                        <BattleCard
                            key={key}
                            item={item.match}
                            queueEntry={item}
                            loading={loading}
                            proceedToChat={proceedToChat}
                        />
                    </View>
                )}
            />
        </>
    )
}

const mapStateToProps = state => ({
    allJoinedMatch: state.allJoinedMatch
})

export default connect(mapStateToProps)(JoinedMatchSlider);
