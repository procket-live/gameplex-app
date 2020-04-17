import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import useAppState from 'react-native-appstate-hook';
import OpenApp from 'react-native-open-app';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import HeaderBattleComponent from '../../component/header/header-battle.component';
import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { GREY_BG, ON_PRIMARY, TEXT_COLOR, YELLOW, GREEN, GREY_3, PRIMARY_COLOR, RED, SECONDARY_COLOR, BLUE } from '../../constant/color.constant';
import { TOKEN, DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';
import NotifyService from '../../service/notify.service';
import IconComponent from '../../component/icon/icon.component';
import PrivateApi from '../../api/private.api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { fetchAllJoinedMatchAction } from '../../action/all-match.action';
import { GetSocket } from '../../utils/soket.utils';

const socket = GetSocket();

function BattleChatScene({ navigation, user, fetchAllJoinedMatchAction, onlineList }) {
    const initialBattleQueue = navigation.getParam('battleQueue') || {};
    const battleQueueId = navigation.getParam('id') || AccessNestedObject(initialBattleQueue, '_id');

    const [battleQueue, setBattleQueue] = useState(initialBattleQueue);
    const [roomId, setRoomId] = useState(initialBattleQueue.chat_room);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reconnectId, setReconnectId] = useState(Math.random());
    const [loadingText, setLoadingText] = useState('Loading ...');

    const headerTitle = AccessNestedObject(battleQueue, 'match.name');
    const headerIcon = AccessNestedObject(battleQueue, 'tournament.game.thumbnail');
    const gameName = AccessNestedObject(battleQueue, 'tournament.game.name');
    const matchEntryFee = AccessNestedObject(battleQueue, 'match.entry_fee');
    const winningAmount = AccessNestedObject(battleQueue, 'match.winning_amount');
    const participents = AccessNestedObject(battleQueue, 'tournament.participents', []);
    const completed = AccessNestedObject(battleQueue, 'completed', false);
    const scorecardUploaded = !!AccessNestedObject(battleQueue, 'scorecard.image_link');
    const noOpponent = participents.length == 1;

    const { appState } = useAppState({
        onForeground: () => {
            setReconnectId(Math.random());
        },
        onBackground: disconnect,
    });

    useEffect(() => {
        fetchInitial();
    }, [])

    async function fetchInitial() {
        if (battleQueueId) {
            setLoading(true);
            const result = await PrivateApi.GetBattleQueuqEntry(battleQueueId);
            setLoading(false);
            if (result.success) {
                const battleQueue = result.response;
                setRoomId(battleQueue.chat_room);
                setBattleQueue(battleQueue);
            }
        }
    }

    async function openScorecardUplod() {
        const image = await ImagePicker
            .openPicker({
                width: 300,
                height: 400,
                cropping: false
            });

        if (image && battleQueueId) {
            setLoading(true);
            setLoadingText('Uploading ...');
            const result = await firebase.storage().ref(`/chat_rooms/${roomId}_${Math.random()}`).putFile(image.path)
            const link = result.downloadURL;
            const uploadResult = await PrivateApi.UploadScorecardBattleQueueEntry(battleQueueId, { link });
            setLoadingText('Loading ...');
            setLoading(false);
            if (uploadResult.success) {
                fetchInitial();
                sendMessage(['Scorecard'], link);
            }
        }
    }

    useEffect(() => {
        if (!roomId) return;

        socket.emit('join', { token: TOKEN, roomId: roomId }, (err) => {
            if (err && typeof err == 'object' && Object.keys(err).length) {
                NotifyService.notify({ title: "Unable to connect", type: "error" });
            }
        })

        socket.on('message', message => {
            setMessages((messages) => {
                const messageObject = {
                    _id: message._id,
                    text: message.text,
                    createdAt: moment(message.created_at).format(),
                    image: message.image,
                    user: {
                        _id: message.created_by._id,
                    },
                }

                return GiftedChat.append(messages, [messageObject]);
            });
        });

        socket.on("roomData", (data) => {
            const messages = data.messages
                .map((message = {}) => ({
                    _id: message._id,
                    text: message.text,
                    createdAt: moment(message.created_at).format(),
                    image: message.image,
                    user: {
                        _id: AccessNestedObject(message, 'created_by._id'),
                    }
                }))
                .reverse();
            setMessages(messages);
        });

        socket.on("battleQueueUpdate", (data) => {
            setBattleQueue(data);
        });

        return disconnect;
    }, [roomId, reconnectId])

    function disconnect() {
        if (!socket) {
            return;
        }

        socket?.emit("disconnect");
        socket?.off();
    }

    function sendMessage(messages, image) {
        const message = AccessNestedObject(messages, '0.text');
        socket.emit('sendMessage', { token: TOKEN, roomId: roomId, message, image });
    }

    async function uploadImage() {
        const image = await ImagePicker
            .openPicker({
                width: 300,
                height: 400,
                cropping: false
            });
        if (image) {
            setLoading(true);
            setLoadingText('Uploading ...');
            const result = await firebase.storage().ref(`/chat_rooms/${roomId}_${Math.random()}`).putFile(image.path)
            setLoadingText('Loading ...');
            setLoading(false);
            sendMessage('', result.downloadURL);
        }
    }

    async function finishMatch() {
        setLoading(true);
        setLoadingText('Uploading ...');
        const result = await PrivateApi.MarkCompletedBattleQueueEntry(battleQueueId);
        setLoading(false);
        setLoadingText('Loading ...');
        if (result.success) {
            fetchInitial();
            fetchAllJoinedMatchAction();
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderBattleComponent
                name={headerTitle}
                icon={headerIcon}
                actionText="Play"
                actionIcon={"play-circle"}
                action={() => {
                    const config = {
                        playStoreId: AccessNestedObject(battleQueue, 'tournament.game.packageId'),
                    };

                    OpenApp.openInStore(config);
                }}
            />
            <View style={{ flexDirection: 'row', height: 70 }} >
                {
                    participents.map((participent) => (
                        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: GREY_BG }} >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Image source={{ uri: AccessNestedObject(participent, 'user.profile_image') }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 50 }} />
                                {
                                    onlineList[AccessNestedObject(participent, 'user._id')] ?
                                        <View style={{ width: 15, height: 15, backgroundColor: GREEN, borderRadius: 15, position: 'absolute', right: 0, bottom: 10, borderWidth: 1, borderColor: ON_PRIMARY }} />
                                        : null
                                }
                            </View>
                            <View style={{ flex: 3, padding: 5, alignItems: 'center' }} >
                                <View style={{ flex: 1, justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 14, color: TEXT_COLOR, fontWeight: 'bold' }} >
                                        {AccessNestedObject(participent, 'user.name')}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: GREY_3, fontWeight: '100' }} >
                                        {moment(participent.created_at).format(DISPLAY_DATE_TIME_FORMAT)}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: GREEN, fontWeight: 'bold' }} >
                                        PAID {DisplayPrice(Math.abs(participent.wallet_transaction.amount))}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))
                }
                {
                    noOpponent ?
                        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: GREY_BG }} >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <IconComponent font={'fontawesome'} size={20} focused tintColor={TEXT_COLOR} name={"user"} />
                            </View>
                            <View style={{ flex: 3, padding: 5, alignItems: 'center' }} >
                                <View style={{ flex: 1, justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 14, color: TEXT_COLOR, fontWeight: 'bold' }} >
                                        Waiting for opponent
                                    </Text>
                                    <ActivityIndicator
                                        animating
                                        size="small"
                                        color={PRIMARY_COLOR}
                                    />
                                </View>
                            </View>
                        </View>
                        : null
                }
            </View>

            <View style={styles.gameContainer} >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 16, color: TEXT_COLOR, fontWeight: 'bold' }} >
                        {gameName}
                    </Text>
                </View>
                <View style={{ flex: 1, padding: 5, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 14, color: GREEN, fontWeight: '100' }} >
                        Entry Fee: {matchEntryFee == 0 ? "FREE" : matchEntryFee}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 14, color: GREEN, fontWeight: '100' }} >
                        WINNING:  {DisplayPrice(winningAmount)}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', height: 50, borderBottomColor: GREY_BG, borderBottomWidth: 1, padding: 10 }} >
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <View style={{ padding: 5, backgroundColor: !completed ? YELLOW : SECONDARY_COLOR, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14 }} >
                            Status: {completed ? "Completed" : "Open"}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }} >
                    {
                        !noOpponent && !scorecardUploaded ?
                            <TouchableOpacity
                                onPress={openScorecardUplod}
                                style={{ padding: 5, backgroundColor: BLUE, width: 200, height: 35, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                                <IconComponent font={'fontawesome'} size={18} focused tintColor={ON_PRIMARY} name={"upload"} />
                                <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14, marginLeft: 15 }} >
                                    Upload Scorecard
                                </Text>
                            </TouchableOpacity> : null
                    }
                    {
                        scorecardUploaded ?
                            <View
                                style={{ margin: 5, padding: 10, backgroundColor: GREEN, width: 110, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                            >
                                <IconComponent font={'fontawesome'} size={18} focused tintColor={ON_PRIMARY} name={"check"} />
                                <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14, marginLeft: 15 }} >
                                    Uploaded
                                </Text>
                            </View> : null
                    }
                    {
                        scorecardUploaded && !completed ?
                            <TouchableOpacity
                                onPress={openScorecardUplod}
                                style={{ margin: 5, padding: 10, backgroundColor: BLUE, width: 120, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                            >
                                <IconComponent font={'fontawesome'} size={18} focused tintColor={ON_PRIMARY} name={"upload"} />
                                <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14, marginLeft: 15 }} >
                                    Re-Upload
                                </Text>
                            </TouchableOpacity> : null
                    }

                </View>
            </View>
            {
                scorecardUploaded && !completed ?
                    <View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                        <TouchableOpacity
                            onPress={finishMatch}
                            style={{ padding: 5, backgroundColor: PRIMARY_COLOR, width: widthPercentageToDP(80), height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                        >
                            <IconComponent font={'fontawesome'} size={18} focused tintColor={ON_PRIMARY} name={"arrow-right"} />
                            <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14, marginLeft: 15 }} >
                                Finish Match
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }
            {
                completed ?
                    <View style={{ height: 80, padding: 10, alignItems: 'center', justifyContent: 'center' }} >
                        <View
                            style={{ padding: 5, backgroundColor: PRIMARY_COLOR, width: widthPercentageToDP(80), height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                        >
                            <IconComponent font={'fontawesome'} size={18} focused tintColor={ON_PRIMARY} name={"check-circle"} />
                            <Text style={{ fontWeight: 'bold', color: ON_PRIMARY, fontSize: 14, marginLeft: 15 }} >
                                Match Finished
                            </Text>
                        </View>
                        {
                            winningAmount > 0 ?
                                <Text style={{ color: TEXT_COLOR, padding: 5, fontWeight: 'bold', fontSize: 14 }} >
                                    Winning amount will transferred to the Winner's wallet.
                                </Text> : null
                        }
                    </View>
                    : null
            }

            <GiftedChat
                style={{ height: 400 }}
                messages={messages}
                onSend={sendMessage}
                user={{ _id: user._id }}
                placeholder="Enter message ..."
                alwaysShowSend
                isLoadingEarlier
                renderLoading={() => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator
                            animating
                            size='large'
                            color={PRIMARY_COLOR}
                        />
                    </View>
                )}
                renderInputToolbar={((participents.length == 1) || completed) ? () => null : undefined}
                onPressActionButton={uploadImage}
            />
            <Spinner
                visible={loading}
                textContent={loadingText}
                textStyle={{ color: ON_PRIMARY }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREY_BG
    },
    gameContainer: {
        padding: 5,
        flexDirection: 'row',
        height: 40,
        borderBottomColor: GREY_BG,
        borderBottomWidth: 1
    },
    userContainer: {
        height: 80,
        flexDirection: 'row',
    },
    buttonContainer: {
        width: 70,
        height: 30,
        borderRadius: 5,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 5
    }
})

const mapStateToProps = state => ({
    user: state.user,
    onlineList: state.online
});

export default connect(mapStateToProps, { fetchAllJoinedMatchAction })(BattleChatScene);