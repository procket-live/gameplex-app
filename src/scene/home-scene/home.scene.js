import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import OfferSlider from '../../component/offer-slider/offer-slider.component';
import GameSlider from '../../component/game-slider/game-slider.component';
import TournamentSlider from '../tournament-slider/tournament-slider.component';

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
                    <TournamentSlider />
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                    <GameSlider />
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default HomeScene;