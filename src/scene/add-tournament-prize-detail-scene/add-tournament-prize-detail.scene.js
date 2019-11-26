import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Form4u from 'react-native-form4u';
import PrivateApi from '../../api/private.api';
import { navigatePop } from '../../service/navigation.service';
import { Camelize, AccessNestedObject, ConvertToWord } from '../../utils/common.util';

class AddTournamentPrizeDetailScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }
    }

    form = () => {
        const prizeMeta = this.props.navigation.getParam('prizeMeta') || [];

        const form = prizeMeta.map((meta) => {
            return [{
                name: Camelize(meta.key),
                placeholder: meta.key,
                type: 'only-numbers',
                label: meta.key,
                fieldProps: {
                    keyboardType: 'numeric',
                },
            }]
        });

        form.push([
            {
                name: 'submit',
                label: 'Sumbit',
                type: 'button',
            },
        ])

        return form;
    }

    handleSubmit = (state) => {
        const callback = this.props.navigation.getParam('callback');
        const prizeMeta = this.props.navigation.getParam('prizeMeta');

        const response = [];

        prizeMeta.forEach((item) => {
            response.push({ key: item.key, value: state[Camelize(item.key)].value })
        })

        console.log('response', response, 'callback', callback);

        callback(response);
        navigatePop()
    }

    handleValidation = (state) => {
        const errors = {};
        const keys = Object.keys(state);

        keys.forEach((key) => {
            if (!state[key].value && key != 'submit') {
                errors[key] = `Please select ${ConvertToWord(key)}`
            }
        })

        console.log('errors', errors)

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

export default AddTournamentPrizeDetailScene;