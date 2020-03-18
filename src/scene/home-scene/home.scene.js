import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import OfferSlider from '../../component/offer-slider/offer-slider.component';
import GameSlider from '../../component/game-slider/game-slider.component';
import TournamentSlider from '../tournament-slider/tournament-slider.component';
import PrivateApi from '../../api/private.api';


function HomeScene(props) {
    const [offers, setOffers] = React.useState([{ loading: true }]);

    useEffect(() => {
        fetchOffers();
        return () => {

        }
    }, [])

    async function fetchOffers() {
        const { success, response } = await PrivateApi.GetOffers();
        if (success) {
            setOffers(response);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                <OfferSlider offers={offers} />
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