import React, { PureComponent } from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import Form4u from 'react-native-form4u';
import { navigatePop } from '../../service/navigation.service';
import moment from 'moment';

class AddTournamentRegistrationDetailScene extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { color: '#fff' },
            headerStyle: { backgroundColor: '#3c3c3c' },
            headerRight: params.isSet ? (
                <View style={{ marginRight: 15 }} >
                    <Button
                        disabled={params.isInactive}
                        title="Edit"
                        onPress={params.edit}
                    />
                </View>
            ) : null
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            isSet: props.navigation.getParam('isSet'),
        }
    }

    componentDidMount = () => {
        this.props.navigation.setParams({ edit: this.edit });
    }

    edit = () => {
        this.setState({ isSet: false })
    }

    form = () => {
        const { isSet } = this.state;
        return isSet ? this.displayForm() : this.inputForm();
    }

    displayForm = () => {
        const regisrationDetails = this.props.navigation.getParam('regisrationDetails') || [];

        return [
            [
                {
                    name: 'registrationOpening',
                    label: 'Reg. Start Datetime',
                    defaultValue: this.reverseFormat(regisrationDetails.registration_opening),
                    type: 'text',
                    fieldProps: {
                        disabled: true
                    }
                }
            ],
            [
                {
                    name: 'registrationClosing',
                    label: 'Reg. end Datetime',
                    defaultValue: this.reverseFormat(regisrationDetails.registration_closing),
                    type: 'text',
                    fieldProps: {
                        disabled: true
                    }
                }
            ]
            ,
            [
                {
                    name: 'tournamentStartTime',
                    label: 'Tournament Start Datetime',
                    defaultValue: this.reverseFormat(regisrationDetails.tournament_start_time),
                    type: 'text',
                    fieldProps: {
                        disabled: true
                    }
                }
            ]
            ,
            [
                {
                    name: 'formMessage',
                    label: 'Form message',
                    defaultValue: (regisrationDetails.form_message),
                    type: 'text',
                    fieldProps: {
                        disabled: true
                    }
                }
            ]
            ,
            [
                {
                    name: 'validationMessage',
                    label: 'Validation message',
                    defaultValue: regisrationDetails.validation_message,
                    type: 'text',
                    fieldProps: {
                        disabled: true
                    }
                }
            ]
            ,
            [
                {
                    name: 'tnc',
                    label: 'Custom TNC link',
                    defaultValue: regisrationDetails.tnc_link,
                    type: 'text',
                    fieldProps: {
                        disabled: true
                    }
                }
            ]
        ]
    }

    inputForm = () => {

        return [
            [
                {
                    name: 'registrationOpening',
                    label: 'Reg. Start Datetime ex - 12/05/2019 18:55',
                    placeholder: 'DD/MM/YYYY',
                    type: 'datetime'
                }
            ],
            [
                {
                    name: 'registrationClosing',
                    label: 'Reg. end Datetime ex - 12/05/2019 18:55',
                    type: 'datetime'
                }
            ]
            ,
            [
                {
                    name: 'tournamentStartTime',
                    label: 'Tournament Start Datetime ex - 12/05/2019 18:55',
                    type: 'datetime'
                }
            ]
            ,
            [
                {
                    name: 'formMessage',
                    label: 'Form message (on registraton form)',
                    type: 'text'
                }
            ]
            ,
            [
                {
                    name: 'validationMessage',
                    label: 'Validation message (on payment completion)',
                    type: 'text'
                }
            ]
            ,
            [
                {
                    name: 'tnc',
                    label: 'Custom TNC link',
                    type: 'text'
                }
            ],
            [
                {
                    name: 'submit',
                    label: 'Sumbit',
                    type: 'button',
                }
            ]
        ]
    }

    format = (date) => {
        return moment(date, 'DD/MM/YYYY HH:mm').toDate()
    }

    reverseFormat = (date) => {
        return moment(date).format('DD/MM/YYYY HH:mm')
    }

    handleSubmit = (state) => {
        const callback = this.props.navigation.getParam('callback');
        const response = {
            registration_opening: this.format(state.registrationOpening.value),
            registration_closing: this.format(state.registrationClosing.value),
            tournament_start_time: this.format(state.tournamentStartTime.value),
            form_message: state.formMessage.value,
            validation_message: state.validationMessage.value,
            tnc_link: state.tnc.value
        };

        callback(response);
        navigatePop()
    }

    handleValidation = (state) => {
        const errors = {};

        if (!state.registrationOpening.value) {
            errors.registrationOpening = 'Please set registation opening date';
        }

        if (!state.registrationClosing.value) {
            errors.registrationClosing = 'Please set registation closing date';
        }

        if (!state.tournamentStartTime.value) {
            errors.tournamentStartTime = 'Please set tournament start time';
        }

        if (!state.formMessage.value) {
            errors.formMessage = 'Please add form message';
        }

        if (!state.validationMessage.value) {
            errors.validationMessage = 'Please add validation message';
        }

        return errors;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Form4u
                    formFields={this.form()}
                    handleSubmit={this.handleSubmit}
                    validation={this.handleValidation}
                    submitOnDirty
                />
            </ScrollView>
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
    }
})

export default AddTournamentRegistrationDetailScene;