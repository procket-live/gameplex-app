import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import Tabs from '../../component/tabs/tabs.component';
import PrivateApi from '../../api/private.api';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ON_PRIMARY, GREY_BG, GREEN, GREY_1, GREY_3, GREY_2, YELLOW, RED, TEXT_COLOR, PRIMARY_COLOR } from '../../constant/color.constant';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';

import { DisplayPrice, AccessNestedObject } from '../../utils/common.util';
import moment from 'moment';
import { RazorpayIcon } from '../../config/image.config';

function TransactionsScene(props) {
    const [transactions, setTransactions] = React.useState([]);
    const [walletStatements, setWalletStatements] = React.useState([]);
    const [withdrawals, setWithdrawals] = React.useState([]);

    React.useEffect(() => {
        fetchData();
        fetchWalletStatements();
        return () => { }
    }, [])

    async function fetchData() {
        const result = await PrivateApi.GetTransactions();
        if (result.success) {
            setTransactions(result.response);
        }
    }

    async function fetchWalletStatements() {
        const result = await PrivateApi.GetWalletTransactions();
        console.log('result', result)
        if (result.success) {
            setWalletStatements(result.response.reverse());
        }
    }

    function RenderWalletTransaction({ item }) {
        const tournament = AccessNestedObject(item, 'source.tournament_name');
        const order = item.amount > 0;

        return (
            <View style={{ width: widthPercentageToDP(95), backgroundColor: ON_PRIMARY, marginBottom: 10, marginTop: 10, borderRadius: 10 }} >
                <View style={{ padding: 10, flexDirection: 'row', }} >
                    <View style={{ flex: 3, paddingTop: 5, paddingBottom: 5 }} >
                        <Text style={{ fontSize: 14, color: GREY_1 }}>{moment(item.created_at).format(DISPLAY_DATE_TIME_FORMAT)}</Text>
                        {
                            order ?
                                <Text style={{ fontSize: 14, color: GREY_3, fontWeight: 'bold' }} >Added to wallet</Text> :

                                <Text style={{ fontSize: 14, color: GREY_3, fontWeight: 'bold' }} >Deducted from wallet</Text>
                        }
                        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <View style={{ width: 100, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: order ? GREEN : RED, borderRadius: 50 }} >
                                    <Text style={{ color: ON_PRIMARY, fontSize: 14 }} >{order ? 'Added' : 'Duducted'}</Text>
                                </View>
                            </View>
                        </View>
                        {
                            tournament ?
                                <Text style={{ color: TEXT_COLOR, fontWeight: 'bold' }} >{tournament}</Text> : null
                        }
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 18, color: order ? GREEN : RED }} >{order ? '+ ' : '- '} {DisplayPrice(Math.abs(item.amount))}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function RenderCard({ item }) {
        const response = JSON.parse(item.response || JSON.stringify({}));
        const status = item.status;

        return (
            <View style={{ width: widthPercentageToDP(95), backgroundColor: ON_PRIMARY, marginBottom: 10, marginTop: 10, borderRadius: 10 }} >
                <View style={{ padding: 10, flexDirection: 'row', }} >
                    <View style={{ flex: 3 }} >
                        <Text style={{ fontSize: 14, color: GREY_3 }} >Order Id: {item.order_id}</Text>
                        <Text style={{ fontSize: 14, color: GREY_1 }}>{moment(item.created_at).format(DISPLAY_DATE_TIME_FORMAT)}</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }} >
                                <Image source={RazorpayIcon()} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }} >
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
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 18, color: GREY_2 }} >{DisplayPrice(item.amount)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: GREY_BG }}>
            <Tabs >
                <Box tabLabel="Paid"  >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        renderItem={RenderCard}
                        data={transactions}
                    />
                </Box>
                <Box tabLabel="Wallet Statements"  >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        renderItem={RenderWalletTransaction}
                        data={walletStatements}
                    />
                </Box>
                <View tabLabel="Received" style={{ flex: 1 }}  ></View>
            </Tabs>
        </View>
    )
}

function Box(props) {
    return (
        <View tabLabel="Wallet Statements" style={{ flex: 1, alignItems: 'center' }}  >
            {props.children}
        </View>
    )
}

export default TransactionsScene;
