import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import OfferSlider from '../../component/offer-slider/offer-slider.component';
import GameSlider from '../../component/game-slider/game-slider.component';
import TournamentSlider from '../tournament-slider/tournament-slider.component';


function HomeScene(props) {
    const [entries, setEntries] = React.useState([1, 2, 3, 4]);
    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                <OfferSlider entries={entries} />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                <TournamentSlider user={props.user} />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                <GameSlider />
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(HomeScene);