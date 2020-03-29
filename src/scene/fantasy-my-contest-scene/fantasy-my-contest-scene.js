import React from 'react';
import { View, Text } from 'react-native';
import HeaderComponent from '../../component/header/header.component';
import Tabs from '../../component/tabs/tabs.component';
import FastImage from 'react-native-fast-image';
import { TEXT_COLOR } from '../../constant/color.constant';
import { TrophyIcon } from '../../config/image.config';

function FantasyMyContestScene({ }) {
    return (
        <>
            <HeaderComponent fantasy />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Tabs >
                    <EmptyScene
                        tabLabel="Upcoming"
                        message1="You haven't joined any upcoming contests"
                        message2="Join contests for any of the upcoming matches"
                    />
                    <EmptyScene
                        tabLabel="Live"
                        message1="You haven't joined any cntests that are live"
                        message2="Join contests for any of the upcoming matches"
                    />
                    <EmptyScene
                        tabLabel="Completed"
                        message1="You haven't joined any contests that completed recently"
                        message2="Join contests for any of the upcoming matches"
                    />
                </Tabs>
            </View>
        </>
    )
}

function EmptyScene({ message1, message2 }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 16, color: TEXT_COLOR }} >{message1}</Text>
            </View>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }} >
                <FastImage style={{ width: 180, height: 180 }} source={TrophyIcon()} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} >
                <Text style={{ fontSize: 14, color: TEXT_COLOR }} >{message2}</Text>
            </View>
        </View>
    )
}

export default FantasyMyContestScene;