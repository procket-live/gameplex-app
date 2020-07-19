import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import GameCard from '../game-card/game-card.component';
import { AccessNestedObject } from '../../utils/common.util';
import { TEXT_COLOR, ON_PRIMARY, PRIMARY_COLOR } from '../../constant/color.constant';
import { useQuery } from '@apollo/react-hooks';
import { GetPlayground } from '../../graphql/graphql.query';

const GameSlider = () => {
    const { data, loading } = useQuery(GetPlayground);
    console.log('data', data)
    return (
        <>
            <View style={{ flexDirection: 'row', backgroundColor: PRIMARY_COLOR, paddingLeft: 15, paddingRight: 15, marginBottom: 10, marginTop: 10 }}>
                <View style={{ height: 50, flex: 2, alignItems: 'flex-start', justifyContent: 'center', }} >
                    <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14 }} >
                        GAMES
                    </Text>
                </View>
            </View>
            <FlatList
                horizontal
                data={data?.playground || [1, 2, 3]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item = {}, key }) =>
                    <GameCard
                        game={item?.game}
                        loading={loading}
                        key={key}
                    />
                }
            />
        </>
    )
}

export default GameSlider;
