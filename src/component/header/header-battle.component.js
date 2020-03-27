import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import { navigatePop } from '../../service/navigation.service';
import { HeaderBackButton } from 'react-navigation-stack';
import IconComponent from '../icon/icon.component';

function HeaderBattleComponent({ name, icon, actionIcon, active = () => [] }) {
    return (
        <View style={{
            height: 60,
            width: widthPercentageToDP(100),
            backgroundColor: PRIMARY_COLOR,
            flexDirection: 'row'
        }} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <HeaderBackButton tintColor={ON_PRIMARY} onPress={navigatePop} />
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }} >
                <Image source={{ uri: icon }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 5, marginRight: 20 }} />
                <Text style={{ fontSize: 20, color: ON_PRIMARY }} >{name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <TouchableOpacity onPress={active}  >
                    <IconComponent font="fontawesome" focused tintColor={ON_PRIMARY} name={actionIcon || "question-circle"} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(HeaderBattleComponent);