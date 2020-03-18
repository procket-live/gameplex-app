import React, { PureComponent } from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import Form4u from 'react-native-form4u';
import { navigatePop } from '../../service/navigation.service';
import { Camelize, AccessNestedObject, ConvertToWord } from '../../utils/common.util';

class SetTournamentCredentials extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    }
  }


  inputForm = () => {
    const roomDetail = this.props.navigation.getParam('roomDetail');
    const isSet = this.props.navigation.getParam('isSet')

    const form = [
      [{
        name: 'roomId',
        label: 'Room Id',
        type: 'text',
        defaultValue: AccessNestedObject(roomDetail, 'room_id'),
        fieldProps: {
          disabled: isSet
        }
      }],
      [{
        name: 'roomPassword',
        label: 'Room Password',
        type: 'text',
        defaultValue: AccessNestedObject(roomDetail, 'room_password'),
        fieldProps: {
          disabled: isSet
        }
      }]
    ]

    !isSet && form.push([
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

    callback({
      room_id: AccessNestedObject(state, 'roomId.value'),
      room_password: AccessNestedObject(state, 'roomPassword.value')
    })
    navigatePop()
  }

  handleValidation = (state) => {
    const errors = {};

    if (state.roomId.value == "") {
      errors["roomId"] = "Please enter Room Id"
    }

    if (state.roomPassword.value == "") {
      errors["roomPassword"] = "Please enter Room Id"
    }

    return errors;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form4u
          formFields={this.inputForm()}
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

export default SetTournamentCredentials;