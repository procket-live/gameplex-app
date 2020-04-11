import React from 'react';
import { View, Text, Image } from 'react-native';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ON_PRIMARY, GREEN, YELLOW, RED, GREY_3, GREY_1, GREY_2, TEXT_COLOR } from '../../constant/color.constant';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';
import { DisplayPrice } from '../../utils/common.util';

function WithdrawRequestCard({ item }) {
    const status = item.status;
    const bankDetails = item.bank_details;

    return (
        <View style={{ width: widthPercentageToDP(95), backgroundColor: ON_PRIMARY, marginBottom: 10, marginTop: 10, borderRadius: 10 }} >
            <View style={{ padding: 10, flexDirection: 'row', }} >
                <View style={{ flex: 1 }} >
                    <Text style={{ fontSize: 14, color: GREY_1 }}>{moment(item.created_at).format(DISPLAY_DATE_TIME_FORMAT)}</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }} >
                            {
                                status == "success" ?
                                    <View style={{ width: 100, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: GREEN, borderRadius: 50 }} >
                                        <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >SUCCESS</Text>
                                    </View>
                                    : null
                            }
                            {
                                status == "pending" ?
                                    <View style={{ width: 100, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: YELLOW, borderRadius: 50 }} >
                                        <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >PENDING</Text>
                                    </View>
                                    : null
                            }
                            {
                                status == "failed" ?
                                    <View style={{ width: 100, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: RED, borderRadius: 50 }} >
                                        <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >FAILED</Text>
                                    </View>
                                    : null
                            }
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }} >

                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 20, color: GREY_2 }} >{DisplayPrice(item.amount)}</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: GREY_1, borderRadius: 10, padding: 10 }} >
                        <Text style={{ color: TEXT_COLOR, fontSize: 14, paddingTop: 5, paddingBottom: 5 }} >Name: {bankDetails.user_name}</Text>
                        <Text style={{ color: TEXT_COLOR, fontSize: 14, paddingTop: 5, paddingBottom: 5 }} >Account No.: {bankDetails.accont_number}</Text>
                        <Text style={{ color: TEXT_COLOR, fontSize: 14, paddingTop: 5, paddingBottom: 5 }} >IFSC: {bankDetails.ifsc}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WithdrawRequestCard;
