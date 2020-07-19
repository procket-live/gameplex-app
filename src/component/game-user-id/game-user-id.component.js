import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navigate } from '../../service/navigation.service';
import IconComponent from '../icon/icon.component';
import { PRIMARY_COLOR, ON_PRIMARY, GREY_2 } from '../../constant/color.constant';
import { useQuery } from '@apollo/react-hooks';
import { GetGameUserIdQuery } from '../../graphql/graphql.query';
import { AccessNestedObject } from '../../utils/common.util';

function GameUserIdComponent({ gameId }) {
    const { data, loading } = useQuery(GetGameUserIdQuery, { variables: { game_id: gameId } });
    console.log("data", data, gameId);

    const gameUserId = AccessNestedObject(data, 'getGameUserId.game_username');

    return (
        <View style={[styles.detailsContainer, { marginTop: 10 }]} >
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 5 }} >
                <Text style={{ fontSize: 14, fontWeight: '500', color: GREY_2 }} >
                    USER ID: {gameUserId || 'NOT SET'}
                </Text>
            </View>
            {
                !gameUserId ?
                    <View style={{ flex: 2, flexDirection: 'row' }} >
                        <View style={{ flex: 1, padding: 5 }} >
                            <TouchableOpacity
                                onPress={() => {
                                    navigate('AddGameUserId', { gameId });
                                }}
                                style={{ borderWidth: 1, height: 35, borderRadius: 10, borderColor: PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <IconComponent font="fontawesome" focused tintColor={PRIMARY_COLOR} name="pen" size={14} />
                                <Text style={{ fontSize: 14, color: PRIMARY_COLOR, marginLeft: 10 }} >ADD</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, padding: 5 }} >
                            <TouchableOpacity
                                onPress={() => navigate('InstructionGenerator', {
                                    title: "How to get user id",
                                    gameId: gameId,
                                    category: "get_user_id"
                                })}
                                style={{ borderWidth: 1, height: 35, borderRadius: 10, borderColor: PRIMARY_COLOR, backgroundColor: ON_PRIMARY, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <IconComponent font="fontawesome" focused tintColor={PRIMARY_COLOR} name="user" size={14} />
                                <Text style={{ fontSize: 14, color: PRIMARY_COLOR, marginLeft: 10 }} >HOW TO GET USER ID</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : null
            }
            <TouchableOpacity
                onPress={() => navigate('InstructionGenerator', {
                    title: "How to join Tournament?",
                    gameId: gameId,
                    category: "join_tournament"
                })}
                style={{ borderWidth: 1, height: 35, borderRadius: 10, borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10, margintBottom: 10 }}>
                <IconComponent font="fontawesome" focused tintColor={ON_PRIMARY} name="list" size={14} />
                <Text style={{ fontSize: 14, color: ON_PRIMARY, marginLeft: 10 }} >TOURNAMENT INSTRUCTIONS</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GameUserIdComponent;

const styles = {
    detailsContainer: {
        backgroundColor: ON_PRIMARY,
        borderRadius: 10,
        padding: 5
    },
}