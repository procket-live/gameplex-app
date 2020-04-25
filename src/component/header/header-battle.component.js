import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, ON_PRIMARY, SECONDARY_COLOR } from '../../constant/color.constant';
import { navigatePop } from '../../service/navigation.service';
import { HeaderBackButton } from 'react-navigation-stack';
import IconComponent from '../icon/icon.component';

function Header({ name, icon, actionIcon, action = () => [], actionText }) {
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
                {
                    icon ? <Image source={{ uri: icon }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 5, marginRight: 20 }} /> : null
                }
                <Text style={{ fontSize: 20, color: ON_PRIMARY }} >{name}</Text>
            </View>
            <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }} >
                {
                    actionText ?
                        <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: SECONDARY_COLOR, flexDirection: 'row' }} onPress={action}>
                            <Text style={{ color: ON_PRIMARY, fontWeight: 'bold', paddingRight: 10 }} >
                                {actionText}
                            </Text>
                            <IconComponent size={18} font="fontawesome" focused tintColor={ON_PRIMARY} name={actionIcon || "question-circle"} />
                        </TouchableOpacity> : null
                }
            </View>
        </View >
    )
}

const mapStateToProps = state => ({
    user: state.user
});

const HeaderBattleComponent = connect(mapStateToProps)(Header);

export default HeaderBattleComponent;