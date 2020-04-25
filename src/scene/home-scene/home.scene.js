import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import codepush from 'react-native-code-push';
import Analytics from 'appcenter-analytics';
import { showNavigationBar } from 'react-native-navigation-bar-color';

import OfferSlider from '../../component/offer-slider/offer-slider.component';
import TournamentSlider from '../tournament-slider/tournament-slider.component';
import PrivateApi from '../../api/private.api';
import HeaderComponent from '../../component/header/header.component';
import BattleSliderComponent from '../../component/battle-slider/battle-slider.component';
import JoinedMatchSliderComponent from '../../component/joined-match-slider-component/joined-match-slider.component';

import APP from '../../constant/app.constant';
import { AccessNestedObject } from '../../utils/common.util';
import { navigate } from '../../service/navigation.service';
import { checkForUpdateAction } from '../../action/update.action';

function HomeScene({ user, navigation, CheckUpdate }) {
    const [offers, setOffers] = React.useState([{ loading: true }]);

    useEffect(() => {
        showNavigationBar();
        fetchOffers();
        codepush.checkForUpdate();
        Analytics.trackEvent("My custom event");
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
        if (route) {
            navigate(route, payload);
        } else {
            CheckUpdate();
        }
    }

    return (
        <>
            <HeaderComponent />
            <ScrollView style={styles.container}>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <OfferSlider offers={offers} />
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <JoinedMatchSliderComponent />
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <BattleSliderComponent />
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
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

export default connect(mapStateToProps, { CheckUpdate: checkForUpdateAction })(HomeScene);