import React, { PureComponent, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Form4u from 'react-native-form4u';
import moment from 'moment';

import PrivateApi from '../../api/private.api';
import { navigatePop } from '../../service/navigation.service';
import { ON_PRIMARY } from '../../constant/color.constant';
import { connect } from 'react-redux';
import { AccessNestedObject } from '../../utils/common.util';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GetGameList } from '../../graphql/graphql.query';
import { AddTournamentMutation } from '../../graphql/graphql-mutation';

function AddTournamentScene({ navigation }) {
    const params = AccessNestedObject(navigation, 'state.params', {});
    const organizer = AccessNestedObject(params, 'organizer', {});

    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    const [addTournament] = useMutation(AddTournamentMutation, {
        onCompleted({ createTournament }) {
            console.log('createTournament', createTournament)
            if (createTournament) {
                navigatePop();
            }
        },
        onError(errors) {
            console.log('ERRORO', errors)
        }
    });

    useQuery(GetGameList, {
        onCompleted({ getGamesList }) {
            setLoading(false);
            setGames(getGamesList.map((item) => ({ label: item.name, value: item.id })));
        }
    })

    function form() {

        console.log('gamesgames', games)
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
                        multiline: true,
                        returnKeyType: "next"
                    },
                },
            ],
            [
                {
                    name: 'game',
                    placeholder: 'Select game',
                    pickerItems: games,
                    type: 'picker',
                    defaultValue: AccessNestedObject(games, `0.value`)
                },
            ],
            [
                {
                    name: 'teamSize',
                    label: 'Team Size',
                    type: 'only-numbers',
                    fieldProps: {
                        keyboardType: 'numeric',
                    },
                },
                {
                    name: 'minTeam',
                    label: 'Min Team',
                    type: 'only-numbers',
                    fieldProps: {
                        keyboardType: 'numeric',
                    },
                },
                {
                    name: 'maxTeam',
                    label: 'Max Team',
                    type: 'only-numbers',
                    fieldProps: {
                        keyboardType: 'numeric',
                    },
                }
            ],
            [
                {
                    name: 'registrationStart',
                    label: 'Reg. Start Time',
                    defaultValue: "",
                    placeholder: 'DD/MM/YYYY HH:mm',
                    type: 'datetime',
                    fieldProps: {
                        disabled: false
                    }
                },
                {
                    name: 'registrationEnd',
                    label: 'Reg. End Time',
                    defaultValue: "",
                    placeholder: 'DD/MM/YYYY HH:mm',
                    type: 'datetime',
                    fieldProps: {
                        disabled: false
                    }
                }
            ],
            [
                {
                    name: 'tournamentStart',
                    label: 'Start Time',
                    placeholder: 'DD/MM/YYYY HH:mm',
                    type: 'datetime',
                    fieldProps: {
                        disabled: false
                    }
                },
                {
                    name: 'duration',
                    label: 'Duration in minutes',
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

    function handleSubmit(props) {
        const { tournamentName, tournamentDescription, game, teamSize, minTeam, maxTeam, registrationStart, registrationEnd, tournamentStart, duration } = props;

        addTournament({
            variables: {
                organizer_id: organizer.id,
                name: tournamentName.value,
                description: tournamentDescription.value,
                game_id: game.value,
                team_size: parseInt(teamSize.value),
                min_size: parseInt(minTeam.value),
                max_size: parseInt(maxTeam.value),
                registration_start: String(moment(registrationStart.value, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")),
                registration_end: String(moment(registrationEnd.value, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")),
                tournament_start: String(moment(tournamentStart.value, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")),
                tournament_end: String(moment(tournamentStart.value, "DD/MM/YYYY HH:mm").add(duration.value, 'minutes').format("YYYY-MM-DD HH:mm"))
            },
        })
    }

    function handleValidation(props) {
        const errors = {};
        const { tournamentName, tournamentDescription, game, teamSize, minTeam, maxTeam, registrationStart, registrationEnd, tournamentStart, duration } = props;
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
            errors.teamSize = 'Please enter team size'
        }

        if (!minTeam.value) {
            errors.minTeam = 'Please enter min team count'
        }

        if (!maxTeam.value) {
            errors.maxTeam = 'Please enter max team count'
        }

        if (!registrationStart.value) {
            errors.registrationStart = 'Enter reg start time'
        }

        if (!registrationEnd.value) {
            errors.registrationEnd = 'Enter reg end time'
        }

        if (!tournamentStart.value) {
            errors.tournamentStart = 'Enter tournament start time'
        }

        if (!duration.value) {
            errors.duration = 'Enter tournament duration'
        }

        return errors;
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {
                    games.length && !loading ?
                        <Form4u
                            formFields={form()}
                            handleSubmit={handleSubmit}
                            validation={handleValidation}
                            submitOnDirty
                        /> : null
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

const mapStateToProps = state => ({
    organizer: state.organizer
})

export default connect(mapStateToProps)(AddTournamentScene);