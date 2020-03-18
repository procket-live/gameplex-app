import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Spinner from 'react-native-loading-spinner-overlay';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { AccessNestedObject } from '../../utils/common.util';
import { PRIMARY_COLOR, YELLOW, GREEN, ON_PRIMARY, TEXT_COLOR } from '../../constant/color.constant';
import PrivateApi from '../../api/private.api';
import { navigate, navigatePop } from '../../service/navigation.service';

function SetRankingScene(props) {
    const errors = false;
    const tournament = props.navigation.getParam('tournament');
    const callback = props.navigation.getParam('callback');
    const [loading, setLoading] = useState(false);
    const [ranks, setRanks] = useState(AccessNestedObject(tournament, 'rank', []).map((item) => ({ rank: item.rank, user: null })))
    const [participents, setParticipents] = useState([])
    const [kills, setKills] = useState({});

    useEffect(() => {
        fetchParticipents();
        return () => { };
    }, [])

    async function fetchParticipents() {
        setLoading(true);
        const result = await PrivateApi.GetParticipents(tournament._id);
        setLoading(false);
        if (result.success) {
            setParticipents(AccessNestedObject(result, 'response'));
        }
    }

    function selectParticipent(rank) {
        navigate('SelectParticipent', {
            participents: participents,
            disabled: ranks.map((item) => AccessNestedObject(item, 'user._id')),
            callback: (user) => setRankWiseUser(user, rank)
        });
    }

    function setRankWiseUser(user, rank) {
        navigatePop();
        let index;
        ranks.forEach((item, key) => {
            if (item.rank == rank) {
                index = key;
            }
        })

        ranks[index] = { rank: rank, user: user };
        const newRanks = [...ranks];
        setRanks(newRanks);
    }

    function onNextStep() {

    }

    function isRankingSet() {
        let allSet = true;
        let oneSet = false
        ranks.forEach((item) => {
            if (!item.user) {
                allSet = false;
            }

            if (item.user) {
                oneSet = true;
            }
        })

        if (participents.length < ranks.length) {
            return oneSet;
        }

        return allSet;
    }

    function getUserObject(userId) {
        let user = null;
        let participentId = null;

        participents.forEach((item) => {
            if (userId == AccessNestedObject(item, 'user._id')) {
                user = item.user;
                participentId = item._id;
            }
        })

        return { user, participentId };
    }

    function getFinalOverviewResult() {
        const response = {};

        Object.keys(kills).forEach((userId) => {
            if (!response[userId]) {
                response[userId] = {
                    ...getUserObject(userId),
                    result_meta: {}
                }
            }

            response[userId].result_meta.kills = kills[userId];
        })

        ranks.forEach((rankObject) => {
            const userId = AccessNestedObject(rankObject, 'user._id');
            if (!userId) {
                return;
            }

            if (!response[userId]) {
                response[userId] = {
                    ...getUserObject(userId),
                    result_meta: {}
                }
            }

            response[userId].result_meta.rank = rankObject.rank;
        })

        return response;
    }

    function submit() {
        callback(Object.values(getFinalOverviewResult()))
    }

    return (
        <>
            <ProgressSteps>
                <ProgressStep
                    label="Set Ranking"
                    onNext={onNextStep}
                    errors={errors}
                    nextBtnDisabled={!isRankingSet()}
                >
                    <View style={{ alignItems: 'center' }}>
                        <FlatList
                            data={ranks}
                            renderItem={({ item }) => <RenderRankWithSetRank item={item} selectParticipent={selectParticipent} />}
                        />
                    </View>
                </ProgressStep>
                <ProgressStep label="Set Kills">
                    <View style={{ alignItems: 'center' }}>
                        <FlatList data={participents} renderItem={({ item }) => <RenderUserWiseKills item={item} kills={kills} setKills={setKills} />} />
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Review"
                    nextBtnDisabled={false}
                    onSubmit={submit}
                >
                    <ScrollView style={{ flex: 1 }}>
                        <Table borderStyle={{ borderColor: 'transparent' }}>
                            <Row data={['Name', 'Rank', 'Kill']} style={styles.head} textStyle={styles.text} />
                            {
                                Object.values(getFinalOverviewResult()).map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        <Cell key={1} data={rowData.user.name} textStyle={styles.text2} />
                                        <Cell key={1} data={rowData.result_meta.rank} textStyle={styles.text2} />
                                        <Cell key={1} data={rowData.result_meta.kills} textStyle={styles.text2} />
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    </ScrollView>
                </ProgressStep>
            </ProgressSteps>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </>
    )
}

function RenderRankWithSetRank({ item, selectParticipent }) {
    return (
        <View style={{ width: widthPercentageToDP(95), height: 50, flexDirection: 'row' }} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ fontSize: 16, color: PRIMARY_COLOR }} >
                    Rank #{item.rank}
                </Text>
            </View>
            <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }} >
                {
                    item.user ?
                        <View style={{ minWidth: 100, height: 30, borderWidth: 1, borderRadius: 5, borderColor: GREEN, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }} >
                            <Text style={{ fontSize: 16, color: GREEN }} >
                                {item.user.name}
                            </Text>
                        </View>
                        :
                        <TouchableOpacity
                            onPress={() => selectParticipent(item.rank)}
                            style={{ width: 100, height: 30, borderWidth: 1, borderRadius: 5, borderColor: YELLOW, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 16, color: YELLOW }} >
                                SET USER
                            </Text>
                        </TouchableOpacity>
                }

            </View>
        </View>
    )
}

function RenderUserWiseKills({ item, kills, setKills }) {
    return (
        <View style={{ width: widthPercentageToDP(95), height: 50, flexDirection: 'row' }} >
            <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text style={{ fontSize: 16, color: PRIMARY_COLOR }} >
                    {AccessNestedObject(item, 'user.name')}
                </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                <TextInput
                    style={{ width: 100, height: 40, borderWidth: 1, textAlign: 'center' }}
                    value={kills[AccessNestedObject(item, 'user._id')]}
                    placeholder="No. of kills"
                    onChangeText={(text) => {
                        kills[AccessNestedObject(item, 'user._id')] = text;
                        setKills({ ...kills })
                    }}
                    keyboardType="number-pad"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    head: { height: 40, backgroundColor: PRIMARY_COLOR },
    row: { flexDirection: 'row', backgroundColor: ON_PRIMARY },
    text: { margin: 6, color: ON_PRIMARY },
    text2: { margin: 6, color: TEXT_COLOR },
})

export default SetRankingScene;
