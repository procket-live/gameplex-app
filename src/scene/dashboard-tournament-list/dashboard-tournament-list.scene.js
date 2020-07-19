import React, { PureComponent, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, FlatList } from 'react-native';
import PrivateApi from '../../api/private.api';
import { PRIMARY_COLOR, GREY_BG, TEXT_COLOR, GREY_3, GREY_2, GREY_1 } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AccessNestedObject, GetReadableDate } from '../../utils/common.util';
import moment from 'moment';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';
import { useQuery } from '@apollo/react-hooks';
import { GetOrganizerTournamentList } from '../../graphql/graphql.query';
import { navigate } from '../../service/navigation.service';


function DashboardTournamentListScene({ navigation }) {
    const params = AccessNestedObject(navigation, 'state.params', {});
    const organizer = AccessNestedObject(params, 'organizer', {});
    const status = AccessNestedObject(params, 'status', "draft");

    const [list, setList] = useState([]);

    const { loading } = useQuery(GetOrganizerTournamentList, {
        variables: {
            id: organizer.id,
            status
        },
        onCompleted({ getOrganizerTournamentList }) {
            setList(getOrganizerTournamentList);
        }
    });


    if (loading) {
        return (
            <View style={{ flex: 1 }} >
                <ActivityIndicator
                    animating
                    size="large"
                    color={PRIMARY_COLOR}
                />
            </View>
        )
    }

    return (
        <FlatList
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ flex: 1 }}
            data={list}
            renderItem={RenderListItem}
        />
    )
}

function RenderListItem({ item: tournament }) {
    const imageUrl = AccessNestedObject(tournament, 'game.thumbnail');
    const name = AccessNestedObject(tournament, 'name')
    const gameName = AccessNestedObject(tournament, 'game.name');
    const createdAt = AccessNestedObject(tournament, 'registration_start');
    const status = AccessNestedObject(tournament, 'status');

    return (
        <TouchableOpacity
            onPress={() => {
                navigate("ManageTournament", { id: tournament.id })
            }}
            style={styles.card}
        >
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={{ flex: 2, alignItems: 'flex-start', padding: 10 }} >
                <Text style={styles.bold} >{name}</Text>
                <Text style={styles.bold} >Game: {gameName}</Text>
                <Text style={styles.light} >Registration Start : {GetReadableDate(createdAt)}</Text>
                <Text style={styles.light} >Status :
                    <Text style={{ color: PRIMARY_COLOR, marginLeft: 10 }} >{status}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    )
}

// this.props.navigation.push('', { id, callback: () => this.fetchData(true) });

const styles = StyleSheet.create({
    card: {
        width: widthPercentageToDP(90),
        borderWidth: 1,
        borderColor: GREY_BG,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover'
    },
    bold: {
        fontWeight: '500',
        fontSize: 14,
        color: TEXT_COLOR,
    },
    light: {
        fontWeight: '300',
        fontSize: 12,
        color: GREY_3
    }
})


export default DashboardTournamentListScene;
