import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import moment from 'moment';
import { connect } from 'react-redux';
import libmoji from 'libmoji';
import FastImage from 'react-native-fast-image';

import Steps from '../../component/steps/steps.component';
import { GREY_3, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import TextInput from '../../component/text-input/text-input.component';
import Button from '../../component/button/button.component';
import DateTimePickerComponent from '../../component/date-time-input/date-time-input.component';
import { DISPLAY_DATE_FORMAT } from '../../constant/app.constant';
import PrivateApi from '../../api/private.api';
import { setUserAction } from '../../action/user.action';
import { resetToScreen } from '../../service/navigation.service';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const STEPS = {
    USER_DETAIL: 1,
    ENTER_EMAIL: 3,
    ENTER_EMAIL_OTP: 4,
    SELECT_AVATAR: 2
}

class UserDetailInputScene extends Component {
    constructor(props) {
        super(props);
        const user = props.user || {};
        this.state = {
            step: props.navigation.getParam('step') || STEPS.USER_DETAIL,
            loading: false,
            name: user.name || '',
            dob: user.dob ? moment(user.dob).format(DISPLAY_DATE_FORMAT) : '',
            email: user.email || '',
            otp: '',
            avatar: ''
        }
    }

    componentDidMount = () => {
        this.randomGenerate();
    }

    isUserDetailButtonDisabled = () => {
        return !(this.state.name.length > 3 && this.state.dob);
    }

    isEmailButtonDisabled = () => {
        return !(this.state.email)
    }

    isOTPDisabled = () => {
        return !(this.state.otp)
    }

    editEmail = () => {
        this.setState({ step: STEPS.ENTER_EMAIL })
    }

    userDetailProceed = () => {
        this.setState({ step: STEPS.SELECT_AVATAR })
    }

    avatarProceed = () => {
        this.setState({ step: STEPS.ENTER_EMAIL })
    }

    emailProceed = async () => {
        this.setState({ loading: true });

        const params = {
            name: this.state.name,
            email: this.state.email,
            dob: moment(this.state.dob).toDate(),
            profile_image: this.state.avatar
        };

        const result = await PrivateApi.SetUser(params);
        if (result.success) {
            const newUser = Object.assign(result.response, { token: this.props.user.token });
            this.props.setUserAction(newUser);
            this.skip();
        } else {
            this.setState({ loading: false });
        }
    }

    generateEmailOTP = async () => {
        const { user } = this.props;
        if (user.is_email_verified) {
            this.skip();
            return;
        }

        const result = await PrivateApi.GenerateEmailOTP()
        this.setState({ loading: false });
        if (result.success) {
            this.setState({ step: STEPS.ENTER_EMAIL_OTP });
        }
    }

    proceedOTP = async () => {
        const { otp } = this.state;
        this.setState({ loading: true });
        const result = await PrivateApi.VerifyEmailOTP(otp);
        this.setState({ loading: false });
        if (result.success) {
            const newUser = Object.assign(result.response, { token: this.props.user.token });
            this.props.setUserAction(newUser);
            this.skip();
        }
    }

    skip = () => {
        resetToScreen('TabNavigator');
    }

    RenderUserDetailForm = () => {
        return (
            <>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMini} >Help us to know you</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontH1} >Better !</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMiniLight} >mmm, one step at a time shall we?</Text>
                </View>
                <View style={styles.inputTextContainer} >
                    <TextInput
                        label="Name"
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                    />
                </View>
                <View style={styles.inputTextContainer} >
                    <DateTimePickerComponent
                        mode="date"
                        value={this.state.dob}
                        label="Date of birth"
                        format={DISPLAY_DATE_FORMAT}
                        onChange={(dob) => {
                            this.setState({ dob: String(dob) });
                        }}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Button
                        loading={this.state.loading}
                        disabled={this.isUserDetailButtonDisabled()}
                        text={'PROCEED'}
                        onPress={this.userDetailProceed}
                    />
                </View>
            </>
        )
    }

    RenderEmailForm = () => {
        return (
            <>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMini} >Enter your</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontH1} >Email address</Text>
                </View>
                <View style={styles.inputTextContainer} >
                    <TextInput
                        label="Email address"
                        keyboardType="email-address"
                        autoCapitalize={false}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Button
                        loading={this.state.loading}
                        disabled={this.isEmailButtonDisabled()}
                        text={'PROCEED'}
                        onPress={this.emailProceed}
                    />
                </View>
            </>
        )
    }

    RenderSelectAvatar = () => {
        return (
            <>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontMini} >Select your</Text>
                </View>
                <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                    <Text style={styles.fontH1} >Avatar</Text>
                </View>
                <View style={{ width: widthPercentageToDP(100), height: 230, alignItems: 'center', justifyContent: 'center' }} >
                    <FastImage
                        source={{ uri: this.state.avatar }}
                        style={{ width: 150, height: 200 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ width: widthPercentageToDP(90), height: 40, flexDirection: 'row' }} >
                    <TouchableOpacity
                        onPress={() => {
                            this.randomGenerate();
                        }}
                        style={styles.selected} >
                        <Text style={styles.selectedText} >
                            NEXT AVATAR
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.otpButtonContainer} >
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Button
                            loading={this.state.loading}
                            text={'PROCEED'}
                            onPress={this.avatarProceed}
                        />
                    </View>
                </View>
            </>
        )
    }

    randomGenerate = () => {
        let gender = libmoji.genders[libmoji.randInt(2)];
        let style = libmoji.styles[libmoji.randInt(3)];
        let traits = libmoji.randTraits(libmoji.getTraits(gender[0], style[0]));
        let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));

        const avatar = libmoji.buildPreviewUrl("head", 3, gender[1], style[1], 0, traits, outfit);
        this.setState({ avatar })
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
                    <Text style={styles.fontMiniLight} >Code sent to this email</Text>
                </View>
                <View style={{ paddingTop: 0, paddingBottom: 5, flexDirection: 'row' }} >
                    <Text style={styles.mobileNumberText} >{this.state.email}</Text>
                    <TouchableOpacity onPress={this.editEmail} >
                        <Text style={styles.editText} >Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputTextContainer} >
                    <OTPInputView
                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            this.setState({ otp: code });
                        })}
                    />
                </View>
                <View style={styles.otpButtonContainer} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity onPress={this.skip} >
                                <Text style={styles.editText} >SKIP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Button
                            loading={this.state.loading}
                            disabled={this.isOTPDisabled()}
                            text={'PROCEED'}
                            onPress={this.proceedOTP}
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
                <Steps currentStep={step} steps={Object.keys(STEPS).length} />
                {step == STEPS.USER_DETAIL ? this.RenderUserDetailForm() : null}
                {step == STEPS.SELECT_AVATAR ? this.RenderSelectAvatar() : null}
                {step == STEPS.ENTER_EMAIL ? this.RenderEmailForm() : null}
                {step == STEPS.ENTER_EMAIL_OTP ? this.RenerOTPInputForm() : null}
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
    unselected: {
        flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: PRIMARY_COLOR
    },
    selected: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: PRIMARY_COLOR
    },
    selectedText: {
        fontSize: 18, color: ON_PRIMARY
    },
    unselectedText: {
        fontSize: 18, color: PRIMARY_COLOR
    }
})


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { setUserAction })(UserDetailInputScene);
