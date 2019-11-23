import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import Steps from '../../component/steps/steps.component';
import { GREY_3, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../../constant/color.constant';
import TextInput from '../../component/text-input/text-input.component';
import Button from '../../component/button/button.component';
import { TouchableOpacity } from 'react-native-gesture-handler';

const STEPS = {
    MOBILE_NUMBER_INPUT: 1,
    OTP_INPUT: 2
}

class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            loading: false,
            mobile: '',
            otp: ''
        }
    }

    inputHandler = (mobile) => {
        this.setState({ mobile });

        if (mobile.length == 10) {
            Keyboard.dismiss();
        }
    }

    inputOTPHandler = (otp) => {
        this.setState({ otp });

        if (otp.length == 6) {
            Keyboard.dismiss();
        }
    }

    isButtonDisabled = () => {
        return (!(this.state.mobile.length == 10) || this.state.loading)
    }

    editMobileNumber = () => {
        this.setState({ step: 1 })
    }

    resendOTP = () => {

    }

    proceed = () => {
        this.setState({ loading: true, step: 2 })
    }

    RenderMobileNumberInputForm = () => {
        return (
            <>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMini} >Hey, what's your</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontH1} >Mobile number?</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMiniLight} >Don't worry! We just need it to send OTP</Text>
                </View>
                <View style={styles.inputTextContainer} >
                    <TextInput
                        label="Mobile Number"
                        prefix="+91"
                        keyboardType="phone-pad"
                        maxLength={10}
                        onChangeText={this.inputHandler}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Button
                        loading={this.state.loading}
                        disabled={this.isButtonDisabled()}
                        text={'PROCEED'}
                        onPress={this.proceed}
                    />
                </View>
            </>
        )
    }

    RenerOTPInputForm = () => {
        return (
            <>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMini} >Share your</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontH1} >Verification code</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMiniLight} >Code sent to this number</Text>
                </View>
                <View style={{ paddingTop: 0, paddingBottom: 5, flexDirection: 'row' }} >
                    <Text style={styles.mobileNumberText} >{`+91 ${this.state.mobile}`}</Text>
                    <TouchableOpacity onPress={this.editMobileNumber} >
                        <Text style={styles.editText} >Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputTextContainer} >
                    <TextInput
                        label="OTP"
                        prefix=""
                        keyboardType="phone-pad"
                        maxLength={6}
                        onChangeText={this.inputOTPHandler}
                    />
                </View>
                <View style={styles.otpButtonContainer} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity onPress={this.resendOTP} >
                                <Text style={styles.editText} >Resend OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Button
                            loading={this.state.loading}
                            disabled={this.isButtonDisabled()}
                            text={'PROCEED'}
                            onPress={this.proceed}
                        />
                    </View>
                </View>
            </>
        )
    }

    render() {
        const { step } = this.state;
        return (
            <ScrollView
                style={styles.container}
            >
                <Steps currentStep={step} steps={2} />
                {step == STEPS.MOBILE_NUMBER_INPUT ? this.RenderMobileNumberInputForm() : null}
                {step == STEPS.OTP_INPUT ? this.RenerOTPInputForm() : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    fontMini: {
        color: GREY_3,
        fontSize: 14,
        fontWeight: '500'
    },
    fontH1: {
        color: TEXT_COLOR,
        fontSize: 22,
        fontWeight: '500'
    },
    fontMiniLight: {
        color: GREY_3,
        fontSize: 14,
        fontWeight: '300'
    },
    inputTextContainer: {
        height: 100,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        height: 100,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    otpButtonContainer: {
        flexDirection: 'row',
        height: 100,
    },
    mobileNumberText: {
        fontSize: 14,
        color: PRIMARY_COLOR
    },
    editText: {
        color: SECONDARY_COLOR,
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default LoginScene;
