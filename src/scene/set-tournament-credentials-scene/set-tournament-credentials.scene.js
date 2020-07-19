import React, { PureComponent } from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import Form4u from 'react-native-form4u';
import { navigatePop } from '../../service/navigation.service';
import { Camelize, AccessNestedObject, ConvertToWord } from '../../utils/common.util';
import { useMutation } from '@apollo/react-hooks';
import { AddTournamentRoomMutation } from '../../graphql/graphql-mutation';


function SetTournamentCredentials({ navigation }) {
    const params = AccessNestedObject(navigation, 'state.params', {});
    const tournamentId = AccessNestedObject(params, 'tournament_id');

    const [addRoom] = useMutation(AddTournamentRoomMutation, {
        onCompleted({ addTournamentRoom }) {
            if (addTournamentRoom) {
                navigatePop();
            }
        }
    })

    function inputForm() {
        const form = [
            [{
                name: 'roomId',
                label: 'Room Id',
                type: 'text',
            }],
            [{
                name: 'roomPassword',
                label: 'Room Password',
                type: 'text',
            }]
        ]

        form.push([
            {
                name: 'submit',
                label: 'Sumbit',
                type: 'button',
            },
        ])

        return form;
    }

    function handleValidation(state) {
        const errors = {};

        if (state.roomId.value == "") {
            errors["roomId"] = "Please enter Room Id"
        }

        if (state.roomPassword.value == "") {
            errors["roomPassword"] = "Please enter Room Id"
        }

        return errors;
    }

    function handleSubmit(state) {
        const params = {
            room_id: AccessNestedObject(state, 'roomId.value'),
            room_password: AccessNestedObject(state, 'roomPassword.value')
        }

        addRoom({
            variables: {
                room: params,
                tournament_id: tournamentId
            }
        })
        navigatePop()
    }


    return (
        <ScrollView style={styles.container}>
            <Form4u
                formFields={inputForm()}
                handleSubmit={handleSubmit}
                validation={handleValidation}
                submitOnDirty
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    submitButton: {
        paddingHorizontal: 10,
        paddingTop: 20,
    }
})

export default SetTournamentCredentials;