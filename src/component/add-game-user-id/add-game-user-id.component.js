import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { connect } from 'react-redux';

import { setUserAction } from '../../action/user.action';
import TextInputComponent from '../text-input/text-input.component';
import Button from '../button/button.component';
import PrivateApi from '../../api/private.api';
import { ON_PRIMARY, PRIMARY_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigatePop, navigate } from '../../service/navigation.service';
import IconComponent from '../icon/icon.component';
import Header from '../header/header-battle.component';
import { useMutation } from '@apollo/react-hooks';
import { AddGameUserIdMutation } from '../../graphql/graphql-mutation';


function AddGameUserIdScene({ navigation }) {
    const gameId = navigation.getParam('gameId');

    const [userId, setUserId] = useState("");
    const [addGameId, { loading }] = useMutation(AddGameUserIdMutation, {
        onCompleted({ addGameUserId }) {
            if (addGameUserId) {
                navigatePop();
            }
        }
    })

    function process() {
        addGameId({
            variables: {
                game_id: gameId,
                game_username: userId
            }
        })
    }

    return (
        <>
            <Header
                name={"Add Username"}
                actionText="Instruction"
                actionIcon="question"
                action={() => navigate('InstructionGenerator', {
                    title: "How to get user id",
                    gameId: gameId,
                    category: "get_user_id"
                })}
            />
            <View style={{ backgroundColor: ON_PRIMARY, width: widthPercentageToDP(100), alignItems: 'center' }} >
                <View style={{ alignItems: 'flex-start', width: widthPercentageToDP(100), padding: 10, paddingLeft: 10, paddingRight: 15 }}>
                    <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                        <Text style={styles.fontH1} >Enter User ID</Text>
                    </View>
                </View>
                <View style={styles.inputTextContainer} >
                    <TextInputComponent
                        label="User ID"
                        value={userId}
                        onChangeText={setUserId}
                        RenderRight={() => (
                            <TouchableOpacity
                                style={{ padding: 5, borderWidth: 1, borderRadius: 5, flexDirection: 'row', borderColor: PRIMARY_COLOR, alignItems: 'center' }}
                                onPress={async () => {
                                    const userId = await Clipboard.getString();
                                    setUserId(userId)
                                }}
                            >
                                <IconComponent font={'fontawesome'} size={20} focused tintColor={PRIMARY_COLOR} name={"clipboard"} />
                                <Text style={{ color: PRIMARY_COLOR, fontSize: 14, marginRight: 5, marginLeft: 5 }} >Paste</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Button
                        loading={loading}
                        text={'SAVE'}
                        onSubmitEditing={process}
                        onPress={process}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 100,
        paddingRight: 20,
        width: widthPercentageToDP(100),
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default AddGameUserIdScene;
