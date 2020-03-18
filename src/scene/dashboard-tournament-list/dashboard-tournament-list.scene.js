import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, FlatList } from 'react-native';
import PrivateApi from '../../api/private.api';
import { PRIMARY_COLOR, GREY_BG, TEXT_COLOR, GREY_3, GREY_2, GREY_1 } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AccessNestedObject } from '../../utils/common.util';
import moment from 'moment';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';

class DashboardTournamentListScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list: []
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = async (allowCallback = false) => {
        const query = this.props.navigation.getParam('query');
        const callback = this.props.navigation.getParam('callback');

        this.setState({ loading: true });
        const result = await PrivateApi.GetDashboardTournaments(query)
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ list: result.response });
            if (allowCallback && callback && typeof callback == 'function') {
                callback();
            }
        }
    }

    navigateToManagePage = (id) => {
        this.props.navigation.push('ManageTournament', { id, callback: () => this.fetchData(true) });
    }

    RenderListItem = ({ item }) => {
        const imageUrl = AccessNestedObject(item, 'game.thumbnail');
        const name = AccessNestedObject(item, 'tournament_name')
        const gameName = AccessNestedObject(item, 'game.name');
        const createdAt = AccessNestedObject(item, 'create_at');
        const status = AccessNestedObject(item, 'status');

        return (
            <TouchableOpacity
                onPress={() => this.navigateToManagePage(item._id)}
                style={styles.card}
            >
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                </View>
                <View style={{ flex: 2, alignItems: 'flex-start', padding: 10 }} >
                    <Text style={styles.bold} >{name}</Text>
                    <Text style={styles.bold} >Game: {gameName}</Text>
                    <Text style={styles.light} >Created : {moment(createdAt).format(DISPLAY_DATE_TIME_FORMAT)}</Text>
                    <Text style={styles.light} >Status :
                        <Text style={{ color: PRIMARY_COLOR, marginLeft: 10 }} >{status}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { loading, list } = this.state;

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
                renderItem={this.RenderListItem}
            />
        )
    }
}

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
