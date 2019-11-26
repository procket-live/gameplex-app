import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import OfferSlider from '../../component/offer-slider/offer-slider.component';
import { TEXT_COLOR, GREY_BG, GREY_3, PRIMARY_COLOR } from '../../constant/color.constant';
import IconComponent from '../../component/icon/icon.component';
import TournamentCard from '../../component/tournament-card/tournament.card';

const IMAGE = 'https://preview.redd.it/h2iz05k9xsm11.jpg?width=960&crop=smart&auto=webp&s=b2ba90222ff111aab4a8b0effecdb1517c5c679c';
class HomeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [1, 2, 3, 4]
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                    <OfferSlider entries={this.state.entries} />
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }} >
                            <Text style={{ fontWeight: '500', color: TEXT_COLOR, fontSize: 14 }} >
                                UPCOMING TOURNAMENTS
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.push('TournamentList');
                                }}
                            >
                                <Text style={{ fontWeight: '500', color: PRIMARY_COLOR, fontSize: 12 }} >View All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        horizontal
                        data={this.state.entries}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item, key) => {
                            return (
                                <TournamentCard key={key} />
                            )
                        }}
                    />
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }} >
                            <Text style={{ fontWeight: '500', color: TEXT_COLOR, fontSize: 14 }} >
                                Games
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.push('TournamentList');
                                }}
                            >
                                <Text style={{ fontWeight: '500', color: PRIMARY_COLOR, fontSize: 12 }} >View All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        // style={{ height: 200 }}
                        horizontal
                        data={this.state.entries}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item, key) => {
                            return (
                                <Image
                                    key={key}
                                    source={{ uri: IMAGE }}
                                    style={styles.gameCard}
                                />
                            )
                        }}
                    />
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gameCard: {
        width: 100,
        height: 160,
        borderRadius: 5,
        resizeMode: 'cover',
        marginRight: 10,
        marginLeft: 10,
    }
})

export default HomeScene;