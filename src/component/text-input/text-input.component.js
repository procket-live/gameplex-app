import React, { PureComponent } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, FONT_FAMILY, TEXT_COLOR, GREY_1 } from '../../constant/color.constant';

class TextInputComponent extends PureComponent {
    render() {
        const { label, prefix } = this.props;

        return (
            <View>
                {
                    label ?
                        <View style={styles.labelContainer} >
                            <Text style={styles.labelText} >{this.props.label}</Text>
                        </View> : null
                }
                <View style={styles.container} >
                    {
                        prefix ?
                            <View style={styles.prefixContainer} >
                                <Text style={styles.prefixText} >{this.props.prefix}</Text>
                            </View> : null
                    }
                    <TextInput
                        style={styles.common}
                        placeholderTextColor={GREY_1}
                        {...this.props}
                    />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('90%'),
        height: 45,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR,
    },
    common: {
        width: wp('75%'),
        fontSize: 23,
        color: TEXT_COLOR,
        paddingLeft: 5,
        height: 46
    },
    prefixContainer: {
        width: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    prefixText: {
        fontSize: 23,
        color: TEXT_COLOR
    },
    labelContainer: {
        height: 15,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    labelText: {
        fontWeight: '300',
        fontSize: 14,
        color: PRIMARY_COLOR
    }
})

export default TextInputComponent;