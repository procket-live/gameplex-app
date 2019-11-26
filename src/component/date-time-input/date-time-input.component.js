import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from "react-native-modal-datetime-picker";

import { GREY_1, PRIMARY_COLOR, ON_PRIMARY, TEXT_COLOR } from '../../constant/color.constant';


class DateTimePickerComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    }

    handleDatePicked = date => {
        this.hideDateTimePicker();

        if (this.props && typeof this.props.onChange == 'function') {
            this.props.onChange(date);
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.showDateTimePicker}
            >
                {
                    this.props.label ?
                        <View style={styles.labelContainer} >
                            <Text style={styles.labelText} >{this.props.label}</Text>
                        </View> : null
                }
                {
                    this.props.value ?
                        <Text style={styles.text} >
                            {moment(this.props.value).format(this.props.format)}
                        </Text> :
                        <View style={{ height: 60 }} />
                }
                <DateTimePicker
                    mode={this.props.mode || "date"}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    maximumDate={this.props.maximumDate}
                    minimumDate={this.props.minimumDate}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('90%'),
        height: 45,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: PRIMARY_COLOR,
        borderBottomWidth: 1,
        paddingBottom: 20
    },
    text: {
        color: TEXT_COLOR,
        fontSize: 23,
        marginLeft: 5
    },
    placeholder: {
        color: GREY_1,
        fontSize: 23
    },
    labelContainer: {
        height: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 5
    },
    labelText: {
        fontWeight: '300',
        fontSize: 14,
        color: PRIMARY_COLOR
    }
})

export default DateTimePickerComponent;


