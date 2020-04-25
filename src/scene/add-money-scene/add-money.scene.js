import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { GREY_BG, TEXT_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import IconComponent from '../../component/icon/icon.component';
import BottomStickButton from '../../component/bottom-stick-button/bottom-stick-button.component';
import { AddAmountToWallet } from '../../utils/paytm.utils';
import { setUserAction } from '../../action/user.action';
import NotifyService from '../../service/notify.service';
import { navigatePop } from '../../service/navigation.service';
import { TOKEN } from '../../constant/app.constant';
import HeaderBattleComponent from '../../component/header/header-battle.component';
import DiamondIcon from '../../assets/svg/diamong';
import { DisplayPrice } from '../../utils/common.util';

class AddMoneyScene extends Component {
    constructor(props) {
        super(props);
        const amount = props.navigation.getParam('amount') || 0;
        this.state = {
            amount: String(amount),
            loading: false
        }
    }

    pressOne = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}1` })
    }

    pressTwo = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}2` })
    }

    pressThree = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}3` })
    }

    pressFour = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}4` })
    }

    pressFive = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}5` })
    }

    pressSix = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}6` })
    }

    pressSeven = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}7` })
    }

    pressEight = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}8` })
    }

    pressNine = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}9` })
    }

    pressZero = () => {
        this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}0` })
    }

    pressRemove = () => {
        if (this.state.amount.length == 1) {
            this.setState({ amount: '0' })
            return;
        }

        this.setState({ amount: this.state.amount.slice(0, -1) })
    }

    initiatePayment = () => {
        if (this.state.amount > 0) {
            this.setLoading(true);
            AddAmountToWallet(this.state.amount, this.props.user, this.paymentResponse)
        } else {
            NotifyService.notify({
                title: "Error",
                message: "Please enter amount",
                type: "error"
            })
        }
    }

    setLoading = (success) => {
        this.setState({ loading: success });
    }

    paymentResponse = ({ success, user, err }) => {
        this.setLoading(false);
        if (success) {
            const newUser = Object.assign(user, { token: TOKEN })
            this.props.setUserAction(newUser);
            NotifyService.notify({
                title: "success",
                message: "wallet updated",
                type: "success"
            });
        } else {
            NotifyService.notify({
                title: "failed",
                message: "something went wrong",
                type: "error"
            })
        }

        navigatePop();
    }

    render() {
        return (
            <>
                <HeaderBattleComponent
                    name={"Add diamonds"}
                />
                <View style={styles.container}>
                    <View style={styles.amountContainer} >
                        <Text style={styles.amountText} >{this.state.amount}</Text>
                        <DiamondIcon width={25} height={25} />
                    </View>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={{ fontWeight: '300', fontSize: 12, color: TEXT_COLOR, marginTop: 5, marginBottom: 5 }} >
                            Add diamonds to wallet
                        </Text>
                        {
                            this.state.amount > 0 ?
                                < Text style={{ fontWeight: '300', fontSize: 12, color: TEXT_COLOR, marginTop: 5, marginBottom: 5 }} >
                                    You have to pay {DisplayPrice(this.state.amount)}
                                </Text> : null
                        }
                    </View>
                    <View style={styles.keybordContainer} >
                        <View style={styles.row}>
                            <TouchableOpacity
                                onPress={this.pressOne}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText} >1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pressTwo} style={styles.button} >
                                <Text style={styles.buttonText} >2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pressThree} style={styles.button} >
                                <Text style={styles.buttonText} >3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={this.pressFour} style={styles.button} >
                                <Text style={styles.buttonText} >4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pressFive} style={styles.button} >
                                <Text style={styles.buttonText} >5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pressSix} style={styles.button} >
                                <Text style={styles.buttonText} >6</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.button} >
                                <Text onPress={this.pressSeven} style={styles.buttonText} >7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pressEight} style={styles.button} >
                                <Text style={styles.buttonText} >8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pressNine} style={styles.button} >
                                <Text style={styles.buttonText} >9</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.button} >
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pressZero} style={styles.button} >
                                <Text style={styles.buttonText} >0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.pressRemove} >
                                <IconComponent name="left" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <BottomStickButton
                        onPress={this.initiatePayment}
                        text={`Pay ${DisplayPrice(this.state.amount)}`}
                    />

                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading...'}
                        textStyle={{ color: TEXT_COLOR }}
                    />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREY_BG
    },
    amountContainer: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    amountText: {
        fontSize: 30,
        color: TEXT_COLOR,
        fontWeight: '500',
        paddingRight: 10
    },
    keybordContainer: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(40),
        marginTop: 50
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ON_PRIMARY
    },
    buttonText: {
        fontSize: 16,
        color: TEXT_COLOR,
        backgroundColor: ON_PRIMARY,
        fontWeight: '500'
    }
})

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { setUserAction })(AddMoneyScene);
