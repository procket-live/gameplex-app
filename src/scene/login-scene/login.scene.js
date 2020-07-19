import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import SmsRetriever from 'react-native-sms-retriever';
import { useMutation } from '@apollo/react-hooks';

import Steps from '../../component/steps/steps.component';
import { GREY_3, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../../constant/color.constant';
import TextInput from '../../component/text-input/text-input.component';
import Button from '../../component/button/button.component';
import { resetToScreen } from '../../service/navigation.service';
import { GenerateOtpMutation, VerifyOtpMutation, ResendOtp } from '../../graphql/graphql-mutation';
import NotifyService from '../../service/notify.service';

const STEPS = {
    MOBILE_NUMBER_INPUT: 1,
    OTP_INPUT: 2
}

function LoginScene() {
    const [step, setStep] = useState(1);
    const [otpId, setOptId] = useState(null);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    const [generateOtp, { loading: generateOtpLoading }] = useMutation(GenerateOtpMutation, {
        onCompleted({ generateOtp }) {
            setOptId(generateOtp.id);
            setStep(STEPS.OTP_INPUT);
            detectOtp();
        },
        onError() {
            NotifyService.notify({
                title: "Error!",
                message: "Unable to generate otp.",
                type: 'error'
            })
        }
    });

    const [verifyOtp, { loading: verifyOtpLoading }] = useMutation(VerifyOtpMutation, {
        onCompleted({ verifyOtp }) {
            if (verifyOtp && verifyOtp.token && verifyOtp.user) {
                resetToScreen('TabNavigator');
                SmsRetriever.removeSmsListener();
            }
        },
        onError() {
            NotifyService.notify({
                title: "Error!",
                message: "Unable to verify otp.",
                type: 'error'
            })
        }
    })

    const [resendOtp] = useMutation(ResendOtp, {
        onCompleted({ resendOtp }) {
            console.log('resendOtp', resendOtp);
            if (resendOtp) {
                setOptId(resendOtp.id);
            }

            NotifyService.notify({
                title: "",
                message: "Otp sent",
                type: 'success'
            })
        },
        onError() {
            NotifyService.notify({
                title: "Error!",
                message: "Unable to resend otp.",
                type: 'error'
            })
        }
    })

    useEffect(() => {
        return () => {
            SmsRetriever.removeSmsListener();
        }
    }, []);

    async function detectOtp() {
        try {
            const registered = await SmsRetriever.startSmsRetriever();
            if (registered) {
                SmsRetriever.addSmsListener(event => {
                    const message = event.message;
                    if (message) {
                        const otp = message.match(/\d/g).join("").substring(0, 4);
                        setOtp(otp);
                        verifyOTP();
                        SmsRetriever.removeSmsListener();
                    }
                });
            }
        } catch (error) {
        }
    }

    function inputHandler(mobile) {
        setMobile(mobile);
        if (mobile.length == 10) {
            Keyboard.dismiss();
        }
    }

    function isButtonDisabled() {
        return (!(mobile.length == 10) || generateOtpLoading)
    }

    function isOtpButtonDisabled() {
        return (!(otp.length == 4) || verifyOtpLoading);
    }

    function editMobileNumber() {
        setStep(1);
    }

    async function resendOTP() {
        resendOtp({
            variables: {
                id: otpId
            }
        })
    }

    function proceed() {
        setLoading(true);
        setStep(STEPS.OTP_INPUT);
    }

    async function generateOTP() {
        generateOtp({
            variables: { mobile: mobile }
        })
    }

    async function verifyOTP() {
        verifyOtp({
            variables: {
                mobile: mobile,
                otp: otp
            }
        });
    }

    function RenderMobileNumberInputForm() {
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
                        keyboardType="number-pad"
                        maxLength={10}
                        value={mobile}
                        onChangeText={inputHandler}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Button
                        loading={generateOtpLoading}
                        disabled={isButtonDisabled()}
                        text={'PROCEED'}
                        onPress={generateOTP}
                    />
                </View>
            </>
        )
    }

    function RenerOTPInputForm() {
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
                    <Text style={styles.mobileNumberText} >{`+91 ${mobile}`}</Text>
                    <TouchableOpacity onPress={editMobileNumber} >
                        <Text style={styles.editText} >Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputTextContainer} >
                    <OTPInputView
                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeChange={(code) => {
                        }}
                        onCodeFilled={setOtp}
                    />
                </View>
                <View style={styles.otpButtonContainer} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity onPress={resendOTP} >
                                <Text style={styles.editText} >Resend OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Button
                            loading={verifyOtpLoading}
                            disabled={isOtpButtonDisabled()}
                            text={'PROCEED'}
                            onPress={verifyOTP}
                        />
                    </View>
                </View>
            </>
        )
    }

    return (
        <ScrollView
            style={styles.container}
        >
            <Steps currentStep={step} steps={2} />
            {step == STEPS.MOBILE_NUMBER_INPUT ? RenderMobileNumberInputForm() : null}
            {step == STEPS.OTP_INPUT ? RenerOTPInputForm() : null}
        </ScrollView>
    );
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
    },
    borderStyleHighLighted: {
        borderColor: PRIMARY_COLOR,
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: PRIMARY_COLOR,
    },
})

export default LoginScene;
