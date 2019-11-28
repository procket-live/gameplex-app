import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Form4u from 'react-native-form4u';

import PrivateApi from '../../api/private.api';
import { navigatePop } from '../../service/navigation.service';
import { ON_PRIMARY } from '../../constant/color.constant';

class AddTournamentScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            loading: false
        }
    }

    getGames = () => {
        const game = this.props.navigation.getParam('game') || [];

        return game.map((item) => ({ label: item.name, value: item._id }));
    }

    form = () => {
        return [
            [
                {
                    name: 'tournamentName',
                    label: 'Tournament name',
                    type: 'text',
                    fieldProps: {
                        autoCorrect: false,
                    },
                },
            ],
            [
                {
                    name: 'tournamentDescription',
                    label: 'description',
                    type: 'text',
                    fieldProps: {
                        autoCorrect: false,
                    },
                },
            ],
            [
                {
                    name: 'game',
                    placeholder: 'Select game',
                    pickerItems: this.getGames(),
                    type: 'picker',
                },
            ],
            [
                {
                    name: 'teamSize',
                    label: 'Number of players in tournament',
                    type: 'only-numbers',
                    fieldProps: {
                        keyboardType: 'numeric',
                    },
                }
            ],
            [
                {
                    name: 'submit',
                    label: 'Create Tournament',
                    type: 'button',
                },
            ]
        ];
    }

    handleSubmit = (state) => {
        const {
            tournamentName,
            tournamentDescription,
            game,
            teamSize,
        } = state;

        const params = {
            tournament_name: tournamentName.value,
            description: tournamentDescription.value,
            game: game.value,
            size: teamSize.value,
        }

        this.makeApiCall(params);
    };

    makeApiCall = async (params) => {
        const callback = this.props.navigation.getParam('callback');
        this.setState({ loading: true })
        const result = await PrivateApi.CreateTournament(params);
        this.setState({ loading: false });
        if (result.success) {
            navigatePop();
            if (callback && typeof callback == 'function') {
                callback();
            }
        }
    }

    handleValidation = ({ tournamentName, tournamentDescription, game, teamSize }) => {
        const errors = {};

        if (!tournamentName.value) {
            errors.tournamentName = 'Tournament name required';
        }

        if (!tournamentDescription.value) {
            errors.tournamentDescription = 'Please add tournament description';
        }

        if (!game.value) {
            errors.game = 'Please select game';
        }

        if (!teamSize.value) {
            errors.teamSize = 'Please enter number of participents'
        }

        return errors;
    }

    render() {
        const { loading } = this.state;

        return (
            <>
                <ScrollView style={styles.container}>
                    <Form4u
                        formFields={this.form()}
                        handleSubmit={this.handleSubmit}
                        validation={this.handleValidation}
                        submitOnDirty
                    />
                </ScrollView>
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    submitButton: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    spinnerTextStyle: {
        color: ON_PRIMARY
    }
})

export default AddTournamentScene;