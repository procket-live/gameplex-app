import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { GREY_BG, TEXT_COLOR, ON_PRIMARY } from '../../constant/color.constant';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import IconComponent from '../../component/icon/icon.component';
import BottomStickButton from '../../component/bottom-stick-button/bottom-stick-button.component';
import { AddAmountToWallet } from '../../utils/paytm.utils';
import NotifyService from '../../service/notify.service';
import { navigatePop } from '../../service/navigation.service';
import HeaderBattleComponent from '../../component/header/header-battle.component';
import { DisplayPrice } from '../../utils/common.util';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GetUserBasicDetailsQuery } from '../../graphql/graphql.query';
import { GenerateOrderMutation, VerifyOrderMutation } from '../../graphql/graphql-mutation';


function AddMoneyScene() {
    const [amount, setAmount] = useState("0");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    useQuery(GetUserBasicDetailsQuery, {
        onCompleted({ me }) {
            setUser(me);
        }
    })

    const [generateOrder] = useMutation(GenerateOrderMutation, {
        async onCompleted({ generatePaymentOrder: order }) {
            const data = await AddAmountToWallet(order, user)
            validatePayment(data);
        }
    })

    const [verifyPayment] = useMutation(VerifyOrderMutation, {
        onCompleted({ validatePaymentOrder }) {
            if (validatePaymentOrder) {
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
            setLoading(false)
        }
    })

    function validatePayment(data) {
        verifyPayment({
            variables: {
                payment_response: JSON.stringify(data),
                source: "razorpay"
            }
        })
    }

    function initiatePayment() {
        generateOrder({
            variables: {
                amount: parseInt(amount),
                source: "razorpay"
            }
        })
    }


    function pressButton(number) {
        setAmount((oldValue) => oldValue == "0" ? `${number}` : `${oldValue}${number}`)
    }

    function pressRemove() {
        if (amount.length == 1) {
            setAmount("0");
            return;
        }

        setAmount((oldValue) => oldValue.slice(0, -1));
    }

    return (
        <>
            <HeaderBattleComponent
                name={"Add moeny"}
            />
            <View style={styles.container}>
                <View style={styles.amountContainer} >
                    <Text style={styles.amountText} >{amount}</Text>
                </View>
                <View style={{ alignItems: 'center' }} >
                    <Text style={{ fontWeight: '300', fontSize: 12, color: TEXT_COLOR, marginTop: 5, marginBottom: 5 }} >
                        Add money to wallet
                    </Text>
                    {
                        amount > 0 ?
                            < Text style={{ fontWeight: '300', fontSize: 12, color: TEXT_COLOR, marginTop: 5, marginBottom: 5 }} >
                                You have to pay {DisplayPrice(amount)}
                            </Text> : null
                    }
                </View>
                <View style={styles.keybordContainer} >
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => pressButton("1")} style={styles.button}>
                            <Text style={styles.buttonText} >1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressButton("2")} style={styles.button} >
                            <Text style={styles.buttonText} >2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressButton("3")} style={styles.button} >
                            <Text style={styles.buttonText} >3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => pressButton("4")} style={styles.button} >
                            <Text style={styles.buttonText} >4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressButton("5")} style={styles.button} >
                            <Text style={styles.buttonText} >5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressButton("6")} style={styles.button} >
                            <Text style={styles.buttonText} >6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => pressButton("7")} style={styles.button} >
                            <Text style={styles.buttonText} >7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressButton("8")} style={styles.button} >
                            <Text style={styles.buttonText} >8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressButton("9")} style={styles.button} >
                            <Text style={styles.buttonText} >9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} >
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressButton("0")} style={styles.button} >
                            <Text style={styles.buttonText} >0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={pressRemove} >
                            <IconComponent name="left" />
                        </TouchableOpacity>
                    </View>
                </View>

                <BottomStickButton
                    onPress={initiatePayment}
                    text={`Pay ${DisplayPrice(amount)}`}
                />

                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={{ color: TEXT_COLOR }}
                />
            </View>
        </>
    );
}

// class AddMoneyScene extends Component {
//     constructor(props) {
//         super(props);
//         const amount = props.navigation.getParam('amount') || 0;
//         this.state = {
//             amount: String(amount),
//             loading: false
//         }
//     }

//     pressOne = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}1` })
//     }

//     pressTwo = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}2` })
//     }

//     pressThree = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}3` })
//     }

//     pressFour = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}4` })
//     }

//     pressFive = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}5` })
//     }

//     pressSix = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}6` })
//     }

//     pressSeven = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}7` })
//     }

//     pressEight = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}8` })
//     }

//     pressNine = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}9` })
//     }

//     pressZero = () => {
//         this.setState({ amount: `${this.state.amount == '0' ? '' : this.state.amount}0` })
//     }

//     pressRemove = () => {
//         if (this.state.amount.length == 1) {
//             this.setState({ amount: '0' })
//             return;
//         }

//         this.setState({ amount: this.state.amount.slice(0, -1) })
//     }

//     initiatePayment = () => {
//         if (this.state.amount > 0) {
//             this.setLoading(true);
//             AddAmountToWallet(this.state.amount, this.props.user, this.paymentResponse)
//         } else {
//             NotifyService.notify({
//                 title: "Error",
//                 message: "Please enter amount",
//                 type: "error"
//             })
//         }
//     }

//     setLoading = (success) => {
//         this.setState({ loading: success });
//     }

//     paymentResponse = ({ success, user, err }) => {
//         this.setLoading(false);
//         if (success) {
//             const newUser = Object.assign(user, { token: TOKEN })
//             this.props.setUserAction(newUser);
//             NotifyService.notify({
//                 title: "success",
//                 message: "wallet updated",
//                 type: "success"
//             });
//         } else {
//             NotifyService.notify({
//                 title: "failed",
//                 message: "something went wrong",
//                 type: "error"
//             })
//         }

//         navigatePop();
//     }

//     render() {

//     }
// }

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

export default AddMoneyScene;
