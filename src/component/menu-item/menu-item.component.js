import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GREY_1, GREY_BG, PRIMARY_COLOR, TEXT_COLOR, GREEN, YELLOW, ON_PRIMARY } from '../../constant/color.constant';
import IconComponent from '../icon/icon.component';

const MenuItem = props => {
    const { iconName, font, complete, inactive } = props;

    return (
        <TouchableOpacity
            onPress={inactive ? () => { } : props.onPress}
            style={{ borderBottomWidth: 1, borderColor: GREY_BG, height: 70, flexDirection: 'row', backgroundColor: inactive ? GREY_BG : ON_PRIMARY }} >
            {
                iconName ?
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }} >
                        <IconComponent font={font} focused tintColor={PRIMARY_COLOR} name={iconName} />
                    </View> : null
            }
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', padding: 5, paddingLeft: iconName ? 0 : 15 }} >
                    <Text style={{ fontWeight: '500', color: TEXT_COLOR, fontSize: 16 }} >{props.name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5, paddingLeft: iconName ? 0 : 15 }} >
                    <Text style={{ fontWeight: '500', color: GREY_1, fontSize: 12 }} >{props.detail}</Text>
                </View>
            </View>
            {
                complete != undefined ?
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }} >
                        {
                            complete ?
                                <IconComponent font={'fontawesome'} size={20} focused tintColor={GREEN} name={"check-circle"} /> :

                                <IconComponent font={'fontawesome'} size={20} focused tintColor={YELLOW} name={'exclamation-triangle'} />
                        }
                    </View> : null
            }
        </TouchableOpacity>
    )
}

export default MenuItem;
