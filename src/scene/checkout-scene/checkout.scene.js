import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Image, ScrollView } from 'react-native';
import RNUpiPayment from 'react-native-upi-payment';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';


import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { GREY_1, TEXT_COLOR, RED, GREEN, GREY_3, ON_PRIMARY, GREY_BG, PRIMARY_COLOR, GREY_2 } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigate, navigatePop } from '../../service/navigation.service';
import PrivateApi from '../../api/private.api';
import { fetchTournaments } from '../../action/tournament.action';
import { setUserAction } from '../../action/user.action';
import IconComponent from '../../component/icon/icon.component';
import NotifyService from '../../service/notify.service';

function CheckoutScene(props) {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});
    const [image, setImage] = useState('');
    const tournament = props.navigation.getParam('tournament') || {};
    const user = props.user;
    const organizer = AccessNestedObject(tournament, 'organizer', {});
    const entryFee = AccessNestedObject(tournament, 'prize', []).find((item) => item.key == 'Entry Fee').value;

    useEffect(function () {
        fetchOrder();
        return function () {

        }
    }, [])

    async function fetchOrder() {
        setLoading(true);
        const body = {
            amount: entryFee,
            organizer_id: AccessNestedObject(organizer, '_id'),
            tournament_id: AccessNestedObject(tournament, '_id')
        };

        const result = await PrivateApi.InitiatePayment(body);
        setLoading(false);
        if (result.success) {
            const documents = AccessNestedObject(result, 'response.document_links', []);
            setOrder(AccessNestedObject(result, 'response'));
            setImage(documents[documents.length - 1])
        }
    }

    async function join() {
        setLoading(true);
        const result = await PrivateApi.JoinTournament(tournament._id, { order_id: order.order_id });
        setLoading(false);
        if (result.success) {
            updateUser();
        }
    }

    async function updateUser() {
        const result = await PrivateApi.GetUser();
        if (result.success) {
            const user = AccessNestedObject(result, 'response');
            props.setUserAction(user);
        }
        props.fetchTournaments();
        navigate('TabNavigator')
    }

    async function gotResponse(payload) {
        const status = AccessNestedObject(payload, 'status') || AccessNestedObject(payload, 'Status');
        if (status == "FAILURE" || status == "Failed" || status == "Failure") {
            NotifyService.notify({ title: "Payment failed", message: AccessNestedObject(payload, 'message'), type: "error" });
            return;
        }

        const body = {
            order_id: AccessNestedObject(order, 'order_id'),
            string_response: JSON.stringify(payload)
        }
        setLoading(true);
        const result = await PrivateApi.ValidatePayment(body);
        setLoading(false);
        if (result.success) {
            setOrder(AccessNestedObject(result, 'response'));
            setImage(AccessNestedObject(result, `response.document_links.${response.document_links.length - 1}`));
        }
    }

    function UpiPayment() {
        const upi = AccessNestedObject(organizer, 'upi_address');
        const name = AccessNestedObject(organizer, 'organizer_name');

        RNUpiPayment.initializePayment({
            vpa: upi,
            payeeName: name,
            amount: 1,
            transactionRef: AccessNestedObject(order, 'order_id'),
            transactionNote: `${AccessNestedObject(tournament, 'tournament_name')}-${AccessNestedObject(tournament, '_id')}`
        }, function (payload) {
            gotResponse(payload);
        }, function (error) {
            gotResponse(error);
        });
    }

    function openGallary() {
        if (!(requestCameraPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) && requestCameraPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))) {
            return;
        }

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, async (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri.includes('file') ? response.uri : `file://${response.uri}`;
                const result = await firebase.storage().ref(`/profile_image/image_${Math.random()}`).putFile(uri);
                setImage(result.downloadURL);
            }
        });
    }

    async function requestCameraPermission(type) {
        try {
            const granted = await PermissionsAndroid.request(
                type,
                {
                    title: 'Storage Permission',
                    message: '',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    function disabled() {
        if (entryFee == 0) {
            return false;
        }

        return !(image && AccessNestedObject(order, 'status') == 'success');
    }

    return (
        <View style={{ flex: 1 }} >
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} >
                <Text style={{ fontSize: 16, color: PRIMARY_COLOR }} >Note: Payment will be directly done to Organizer</Text>
                <View style={{ flexDirection: 'row', height: 35 }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: GREY_3 }} >Organizer</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }} >
                        <Text style={{ fontSize: 16, color: TEXT_COLOR, paddingRight: 10 }} >{AccessNestedObject(organizer, 'organizer_name')}</Text>
                        <IconComponent font={'fontawesome'} size={15} focused tintColor={GREEN} name={"check-circle"} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 35 }} >
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: GREY_3 }} >Entry Fee</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 16, color: TEXT_COLOR }} >{DisplayPrice(entryFee)}</Text>
                    </View>
                </View>
                <View style={{ height: 1, borderTopWidth: 1, borderTopColor: GREY_1 }} />
                {
                    entryFee > 0 ?
                        <View style={{ padding: 5 }} >
                            <Text style={{ fontSize: 19, color: PRIMARY_COLOR, marginBottom: 10 }} >Step 1</Text>
                            <Text style={{ fontSize: 16, color: TEXT_COLOR }} >Make payment of {DisplayPrice(entryFee)} to organizer's upi address</Text>
                            <View style={[styles.detailsContainer, { marginTop: 10 }]} >
                                <View style={{ flexDirection: 'row', height: 40, padding: 5 }} >
                                    <View style={{ flex: 0.3, alignItems: 'flex-start', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 14, color: GREY_1 }} >
                                            UPI ID
                                </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_COLOR }} >
                                            {AccessNestedObject(organizer, 'upi_address')}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.7, alignItems: 'flex-end', justifyContent: 'center' }} >
                                        {
                                            AccessNestedObject(order, 'status') == "pending" ?
                                                <TouchableOpacity
                                                    style={{ padding: 5, borderRadius: 5, flexDirection: 'row', backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, borderWidth: 1, alignItems: 'center' }}
                                                    onPress={() => {
                                                        UpiPayment();
                                                    }}
                                                >
                                                    <IconComponent font={'fontawesome'} size={14} focused tintColor={ON_PRIMARY} name={"arrow-right"} />
                                                    <Text style={{ color: ON_PRIMARY, fontSize: 12, marginRight: 5, marginLeft: 5 }} >Pay Now</Text>
                                                </TouchableOpacity> : null
                                        }
                                        {
                                            AccessNestedObject(order, 'status') == "success" ?
                                                <View
                                                    style={{ padding: 5, borderRadius: 5, flexDirection: 'row', backgroundColor: GREEN, alignItems: 'center' }}
                                                >
                                                    <IconComponent font={'fontawesome'} size={14} focused tintColor={ON_PRIMARY} name={"check-circle"} />
                                                    <Text style={{ color: ON_PRIMARY, fontSize: 12, marginRight: 5, marginLeft: 10 }} >Paid</Text>
                                                </View> : null
                                        }
                                    </View>
                                </View>
                            </View>
                        </View> : null
                }
                {
                    entryFee > 0 ?
                        <View style={{ padding: 5 }} >
                            <Text style={{ fontSize: 19, color: PRIMARY_COLOR, marginBottom: 10 }} >Step 2</Text>
                            <Text style={{ fontSize: 16, color: TEXT_COLOR }} >Upload screenshot of payment success</Text>
                            <View style={[styles.detailsContainer, { marginTop: 10 }]} >
                                <View style={{ flexDirection: 'row', height: 40, padding: 5 }} >
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: GREY_1 }} >
                                            Payment confirmation
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.7, alignItems: 'flex-end', justifyContent: 'center' }} >
                                        <TouchableOpacity
                                            style={{ padding: 5, borderRadius: 5, flexDirection: 'row', backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, borderWidth: 1, alignItems: 'center' }}
                                            onPress={() => {
                                                openGallary();
                                            }}
                                        >
                                            <IconComponent font={'fontawesome'} size={14} focused tintColor={ON_PRIMARY} name={"upload"} />
                                            <Text style={{ color: ON_PRIMARY, fontSize: 12, marginRight: 5, marginLeft: 5 }} >Upload Recipt</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <Image source={{ uri: image }} style={{ width: widthPercentageToDP(92), height: 500 }} />
                        </View> : null
                }
            </ScrollView >
            <TouchableOpacity
                disabled={disabled()}
                onPress={join}
                style={{ position: 'absolute', bottom: widthPercentageToDP(5 / 2), left: widthPercentageToDP(5 / 2), right: 0, width: widthPercentageToDP(95), height: 50, backgroundColor: (loading || disabled()) ? GREY_BG : GREEN, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} >
                {
                    loading ?
                        <ActivityIndicator
                            animating
                            size="small"
                            color={ON_PRIMARY}
                        /> :
                        <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >
                            JOIN TOURNAMENT
                        </Text>
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { fetchTournaments, setUserAction })(CheckoutScene);
