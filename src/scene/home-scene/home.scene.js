import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import OfferSlider from '../../component/offer-slider/offer-slider.component';
import GameCircleSliderComponent from '../../component/game-circle-slider/game-circle-slider.component';
import TournamentSlider from '../tournament-slider/tournament-slider.component';
import PrivateApi from '../../api/private.api';
import HeaderComponent from '../../component/header/header.component';
import BattleSliderComponent from '../../component/battle-slider/battle-slider.component';
import APP from '../../constant/app.constant';
import { AccessNestedObject } from '../../utils/common.util';
import { navigate } from '../../service/navigation.service';

function HomeScene({ user, navigation }) {
    const [offers, setOffers] = React.useState([{ loading: true }]);
    console.log('navigation', navigation)
    useEffect(() => {
        fetchOffers();
        redirect();
        return () => {

        }
    }, [])

    async function fetchOffers() {
        const { success, response } = await PrivateApi.GetOffers();
        if (success) {
            setOffers(response);
        }
    }

    function redirect() {
        const route = AccessNestedObject(APP, 'REDIRECT_TO.route');
        const payload = AccessNestedObject(APP, 'REDIRECT_TO.payload');
        console.log('payload', payload)
        if (route) {
            navigate(route, payload);
        }
    }

    return (
        <>
            <HeaderComponent />
            <ScrollView style={styles.container}>
                <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                    <OfferSlider offers={offers} />
                </View>

                <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                    <BattleSliderComponent />
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10 }} >
                    <TournamentSlider user={user} />
                </View>
            </ScrollView >
        </>
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