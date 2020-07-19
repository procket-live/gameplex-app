import React, { PureComponent, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Form4u from 'react-native-form4u';
import Spinner from 'react-native-loading-spinner-overlay';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import _ from 'lodash';

import PrivateApi from '../../api/private.api';
import { navigatePop } from '../../service/navigation.service';
import { Camelize, AccessNestedObject, ConvertToWord, DisplayPrice } from '../../utils/common.util';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GetGameTypeQuery } from '../../graphql/graphql.query';
import { TextInput } from 'react-native-gesture-handler';
import { SECONDARY_COLOR, PRIMARY_COLOR, GREY_BG, GREEN, RED, TEXT_COLOR, GREY_1 } from '../../constant/color.constant';
import { ResolveExpression } from '../../utils/expression.util';
import { AddTournamentPaymentMutation } from '../../graphql/graphql-mutation';

function AddTournamentPrizeDetailScene({ navigation }) {
    const params = AccessNestedObject(navigation, 'state.params', {});
    const gameId = AccessNestedObject(params, 'game_id');
    const tournament = AccessNestedObject(params, 'tournament', {});

    const [gameType, setGameType] = useState([]);
    const [gameTypeId, setGameTypeId] = useState();
    const [selectedGameType, setSelectedGameType] = useState();
    const [reward, setReward] = useState({});
    const [entryFee, setEntryFee] = useState("0");
    const [rankReward, setRankReward] = useState({ 1: 0 });

    const [addTournamentPayment] = useMutation(AddTournamentPaymentMutation, {
        onCompleted({ addTournamentPayment }) {
            if (addTournamentPayment) {
                navigatePop();
            }
        }
    })

    const { loading } = useQuery(GetGameTypeQuery, {
        onCompleted({ game }) {
            const gameType = AccessNestedObject(game, 'game_type');
            setGameType(gameType);
        },
        variables: {
            game_id: gameId
        }
    })

    const minSize = parseInt(tournament.min_size);
    const maxSize = parseInt(tournament.max_size);

    function addField() {
        const length = Object.keys(rankReward).length;
        setRankReward((oldValue) => ({ ...oldValue, [length + 1]: 0 }))
    }

    function removeField() {
        const length = Object.keys(rankReward).length;

        if (length == 1) {
            return;
        }

        setRankReward((oldValue) => {
            return _.omit(oldValue, length);
        })
    }

    function getTotalRankReward() {
        let reward = 0;
        Object.keys(rankReward).forEach((item) => {
            reward += parseInt(rankReward[item]);
        })

        return reward
    }

    function calculatePrizePool() {
        const formula = AccessNestedObject(selectedGameType, 'payment_make.prize_pool_calculation');
        const ENV = {
            '$RANK_TOTAL$': getTotalRankReward(),
            '$TOURNAMENT': tournament,
            '$RANK_REWARD': AccessNestedObject(selectedGameType, 'payment_make.reward_keys', []).map((item) => ({
                key: item.key,
                value: reward[item.id] || 0
            }))
        }

        return ResolveExpression(ENV, formula);
    }

    function gameTypeForm() {
        const items = gameType.map((gameTypeItem) => ({
            label: gameTypeItem.key,
            value: gameTypeItem.id,
        }))

        const form = [
            [{
                name: "gameType",
                placeholder: "Select Game Type",
                type: 'picker',
                pickerItems: [
                    {
                        label: "Select game type",
                        value: ""
                    },
                    ...items
                ]
            }],
            [{
                name: 'submit',
                label: 'Sumbit',
                type: 'button',
            }],
        ];

        return form
    }

    function gameTypeFormValidation(state) {
        const errors = {};
        if (!state["gameType"].value) {
            errors["gameType"] = "Please select game type"
        }
        return errors;
    }


    function gameTypeFormSubmit(state) {
        const value = state["gameType"].value;
        if (value) {
            let item;

            gameType.forEach((i) => {
                if (i.id == value) {
                    item = i;
                }
            })

            setSelectedGameType(item);
            setGameTypeId(value);
        }
    }

    function submit() {
        const variables = {
            entry_fee: entryFee,
            prize_pool: String(calculatePrizePool()),
            game_type_id: selectedGameType.id,
            tournament_rank_payment: Object.keys(rankReward).map((rank) => ({ rank, amount: rankReward[rank] || 0 })).filter((item) => item.amount > 0),
            tournament_reward_payment: Object.keys(reward).map((key_id) => ({ key_id, amount: reward[key_id] || 0 })),
            tournament_id: tournament.id
        };
        console.log("VARIABLES", variables);
        addTournamentPayment({
            variables: variables
        })
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {
                    Array.isArray(gameType) && gameType.length && !loading && !gameTypeId ?
                        <Form4u
                            formFields={gameTypeForm()}
                            handleSubmit={gameTypeFormValidation}
                            validation={gameTypeFormSubmit}
                            submitOnDirty={false}
                        /> : null
                }
                {
                    gameTypeId && selectedGameType ?
                        <View style={{ width: widthPercentageToDP(100), alignItems: 'flex-start', padding: 10 }} >
                            <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 20, fontWeight: '500', color: SECONDARY_COLOR }} >Enter Payment Details</Text>
                            <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 18, fontWeight: '300', color: PRIMARY_COLOR }} >Game Type: {selectedGameType.key}</Text>
                            <View>
                                <Text style={{ paddingTop: 10, paddingBottom: 10 }} >Entry Fee</Text>
                                <TextInput
                                    placeholder="Enter Per Team Entry Fee"
                                    style={{ padding: 10, borderWidth: 1, width: widthPercentageToDP("95"), borderColor: GREY_1 }}
                                    onChangeText={setEntryFee}
                                    value={entryFee}
                                />
                            </View>
                            {
                                AccessNestedObject(selectedGameType, 'payment_make.reward_keys', []).map((rewardKey) => (
                                    <View>
                                        <Text style={{ paddingTop: 10, paddingBottom: 10 }} >{rewardKey.key}</Text>
                                        <TextInput
                                            placeholder={`Enter Per ${rewardKey.key}`}
                                            style={{ padding: 10, borderWidth: 1, width: widthPercentageToDP("95"), borderColor: GREY_1 }}
                                            onChangeText={(text) => {
                                                setReward((oldValue) => ({ ...oldValue, [rewardKey.id]: text }));
                                            }}
                                            value={reward[rewardKey.id]}
                                        />
                                    </View>
                                ))
                            }
                            {
                                AccessNestedObject(selectedGameType, 'payment_make.rank_based') ?
                                    <View>
                                        <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 18, fontWeight: '300', color: PRIMARY_COLOR }} >Enter Rank Wise Rewards</Text>
                                        {
                                            Object.keys(rankReward).map((rankKey) => (
                                                <View
                                                    style={{ padding: 10, borderWidth: 1, borderColor: GREY_BG, width: widthPercentageToDP("95"), flexDirection: 'row' }}
                                                >
                                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                                        <Text style={{ fontSize: 14, color: SECONDARY_COLOR, fontWeight: '500' }} >Rank #{rankKey}</Text>
                                                    </View>
                                                    <View style={{ flex: 4 }} >
                                                        <TextInput
                                                            keyboardType="numeric"
                                                            placeholder="Enter Amount"
                                                            style={{ padding: 10, flex: 1, borderWidth: 1, borderColor: PRIMARY_COLOR, textAlign: 'center' }}
                                                            onChangeText={(text) => {
                                                                setRankReward((oldValue) => ({ ...oldValue, [rankKey]: text }))
                                                            }}
                                                            value={rankReward[rankKey]}
                                                        />
                                                    </View>
                                                </View>
                                            ))
                                        }

                                        <View style={{ padding: 10, flexDirection: 'row' }} >
                                            <TouchableOpacity
                                                onPress={addField}
                                                style={{ flex: 1, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 18, color: GREEN, fontWeight: '500' }} >Add Field</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={removeField}
                                                style={{ flex: 1, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 18, color: RED, fontWeight: '500' }} >Remove Field</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ borderWidth: 1, width: widthPercentageToDP(95), marginTop: 20, marginBottom: 20 }} />

                                        <View style={{ flexDirection: 'row' }} >
                                            <View
                                                style={{ flex: 2, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: TEXT_COLOR, fontWeight: '500' }} >Minimum Collection</Text>
                                            </View>
                                            <View
                                                style={{ flex: 1, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: GREEN, fontWeight: '500' }} >{DisplayPrice(parseInt(entryFee) * minSize)}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row' }} >
                                            <View
                                                style={{ flex: 2, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: TEXT_COLOR, fontWeight: '500' }} >Maximum Collection</Text>
                                            </View>
                                            <View
                                                style={{ flex: 1, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: GREEN, fontWeight: '500' }} >{DisplayPrice(parseInt(entryFee) * maxSize)}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row' }} >
                                            <View
                                                style={{ flex: 2, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: TEXT_COLOR, fontWeight: '500' }} >Total Rank Reward</Text>
                                            </View>
                                            <View
                                                style={{ flex: 1, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: GREEN, fontWeight: '500' }} >{DisplayPrice(getTotalRankReward())}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }} >
                                            <View
                                                style={{ flex: 2, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: TEXT_COLOR, fontWeight: '500' }} >Prize Pool</Text>
                                            </View>
                                            <View
                                                style={{ flex: 1, borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                                                <Text style={{ fontSize: 16, color: GREEN, fontWeight: '500' }} >{DisplayPrice(calculatePrizePool())}</Text>
                                            </View>
                                        </View>

                                        {
                                            (parseInt(entryFee) * minSize) < calculatePrizePool() ?
                                                <Text style={{ fontSize: 16, color: RED, fontWeight: '500' }} >
                                                    **Prize Pool is greater that Minimum Collection amount(in case of {minSize} entry only). In that case you will face loss of {DisplayPrice(Math.abs((parseInt(entryFee) * minSize) - calculatePrizePool()))}. Please try to maintain entries greater that {Math.ceil(calculatePrizePool() / entryFee)} for benefits.
                                                </Text>
                                                : null
                                        }
                                    </View>
                                    : null
                            }
                            <TouchableOpacity
                                onPress={submit}
                                style={{ width: widthPercentageToDP(95), borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: GREEN }} >
                                <Text style={{ fontSize: 18, color: "#fff", fontWeight: '500' }} >Submit</Text>
                            </TouchableOpacity>
                        </View>
                        : null


                }
            </ScrollView>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </>
    )
}

// class AddTournamentPrizeDetailScene extends PureComponent {
//     static navigationOptions = ({ navigation }) => {
//         const { params = {} } = navigation.state;
//         return {
//             headerTitleStyle: { color: '#fff' },
//             headerStyle: { backgroundColor: '#3c3c3c' },
//             headerRight: params.isSet ? (
//                 <View style={{ marginRight: 15 }} >
//                     <Button
//                         disabled={params.isInactive}
//                         title="Edit"
//                         onPress={params.edit}
//                     />
//                 </View>
//             ) : null
//         };
//     };

//     constructor(props) {
//         super(props);
//         this.state = {
//             formData: {},
//             isSet: props.navigation.getParam('isSet'),
//         }
//     }

//     componentDidMount = () => {
//         this.props.navigation.setParams({ edit: this.edit });
//     }

//     edit = () => {
//         this.setState({ isSet: false })
//     }

//     form = () => {
//         const { isSet } = this.state;
//         return isSet ? this.displayForm() : this.inputForm();
//     }

//     inputForm = () => {
//         const prizeMeta = this.props.navigation.getParam('prizeMeta') || [];

//         const form = prizeMeta.map((meta) => {
//             return [{
//                 name: Camelize(meta.key),
//                 placeholder: meta.key,
//                 type: 'only-numbers',
//                 label: meta.key,
//                 fieldProps: {
//                     keyboardType: 'numeric',
//                 },
//             }]
//         });

//         form.push([
//             {
//                 name: 'submit',
//                 label: 'Sumbit',
//                 type: 'button',
//             },
//         ])

//         return form;
//     }

//     displayForm = () => {
//         const prizeSetMeta = this.props.navigation.getParam('prizeSetMeta') || [];

//         const form = prizeSetMeta.map((meta) => {
//             return [{
//                 name: Camelize(meta.key),
//                 label: meta.key,
//                 type: 'text',
//                 defaultValue: meta.value,
//                 fieldProps: {
//                     disabled: true
//                 }
//             }]
//         });

//         return form;
//     }

//     handleSubmit = (state) => {
//         const callback = this.props.navigation.getParam('callback');
//         const prizeMeta = this.props.navigation.getParam('prizeMeta');

//         const response = [];

//         prizeMeta.forEach((item) => {
//             response.push({ key: item.key, value: state[Camelize(item.key)].value })
//         })

//         callback(response);
//         navigatePop()
//     }

//     handleValidation = (state) => {
//         const errors = {};
//         const keys = Object.keys(state);

//         keys.forEach((key) => {
//             if (!state[key].value && key != 'submit') {
//                 errors[key] = `Please select ${ConvertToWord(key)}`
//             }
//         })

//         return errors;
//     }

//     render() {
//         return (
//             <ScrollView style={styles.container}>
//                 <Form4u
//                     formFields={this.form()}
//                     handleSubmit={this.handleSubmit}
//                     validation={this.handleValidation}
//                     submitOnDirty
//                 />
//             </ScrollView>
//         )
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    submitButton: {
        paddingHorizontal: 10,
        paddingTop: 20,
    }
})

export default AddTournamentPrizeDetailScene;