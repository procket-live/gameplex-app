import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import FastImage from 'react-native-fast-image';
import IconComponent from '../icon/icon.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate, navigatePop } from '../../service/navigation.service';
import { HeaderBackButton } from 'react-navigation-stack';

function HeaderComponent({ user, onProfile, fantasy }) {
    if (fantasy) {
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
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 20, color: ON_PRIMARY }} >Fantasy Sports</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >

                </View>
            </View>
        )
    }

    return (
        <View style={{
            height: 60,
            width: widthPercentageToDP(100),
            backgroundColor: PRIMARY_COLOR,
            flexDirection: 'row'
        }} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                {
                    !onProfile ?
                        <TouchableOpacity
                            style={{
                                backgroundColor: ON_PRIMARY,
                                width: 45, height: 45, borderRadius: 45,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                navigate('Profile')
                            }} >
                            <FastImage resizeMode="contain" style={{ width: 35, height: 35 }} source={{ uri: user.profile_image }} />
                        </TouchableOpacity> : null
                }
            </View>
            <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }} >
                {
                    onProfile ?
                        <Text style={{ fontSize: 20, color: ON_PRIMARY }} >{user.name}</Text>
                        : null
                }
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                {
                    !onProfile ?
                        <TouchableOpacity onPress={() => {
                            navigate('Wallet')
                        }} >
                            <IconComponent focused tintColor={ON_PRIMARY} name="wallet" />
                        </TouchableOpacity> : null
                }
                {
                    onProfile ?
                        <TouchableOpacity onPress={() => {
                            navigate('UserDetailInput')
                        }} >
                            <IconComponent font="fontawesome" focused tintColor={ON_PRIMARY} name="pen" />
                        </TouchableOpacity> : null
                }
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(HeaderComponent);