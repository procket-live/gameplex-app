import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

import { GREY_1, GREY_2, GREY_3, ON_PRIMARY } from '../../constant/color.constant';
import Button from '../../component/button/button.component';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import PrivateApi from '../../api/private.api';
import { setOrganizerActions } from '../../action/organizer.action';
import { AccessNestedObject } from '../../utils/common.util';
import { navigate } from '../../service/navigation.service';


function ManageOrganizerProfile(props) {
    const [loading, setLoading] = useState(false);
    const [organizerName, setOrganizerName] = useState(AccessNestedObject(props, 'organizer.organizer_name'));
    const [organizerUpi, setOrganizerUpi] = useState(AccessNestedObject(props, 'organizer.upi_address'));


    function disabled() {
        return organizerName && organizerUpi;
    }

    async function createProfile() {
        const callback = props.navigation.getParam('callback');

        const body = {
            organizer_name: organizerName,
            // upi_address: organizerUpi
        }
        setLoading(true);
        const result = await PrivateApi.CreateOrganizerProfile(body);
        setLoading(false);
        if (result.success) {
            navigate('Dashboard');
            props.setOrganizerActions(AccessNestedObject(result, 'response', {}))
            callback();
        }
    }

    return (
        <>
            <ScrollView style={styles.container} >
                <View style={styles.inputContainer} >
                    <Text style={styles.inputLabel} >Organizer Name</Text>
                    <TextInput
                        style={styles.input}
                        value={organizerName}
                        editable={!disabled()}
                        onChangeText={setOrganizerName}
                        placeholder="Enter Organizer Name"
                    />
                </View>

                {/* <View style={styles.inputContainer} >
                    <Text style={styles.inputLabel} >Organizer UPI ID</Text>
                    <TextInput
                        style={styles.input}
                        value={organizerUpi}
                        editable={!disabled()}
                        onChangeText={setOrganizerUpi}
                        placeholder="Enter UPI ID. eg - ba"
                    />
                </View> */}

                <View style={styles.information} >
                    <Text style={styles.inputLabel} >Q. What is Organizer Name?</Text>
                    <Text style={styles.informationText} >
                        Please enter valid organizer name.
                    </Text>
                </View>
                {
                    !disabled() ? <Button style={styles.button} onPress={createProfile} text="Submit" /> : null
                }
            </ScrollView>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: ON_PRIMARY }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    inputContainer: {
        padding: 5
    },
    inputLabel: {
        color: GREY_2,
        paddingBottom: 5,
        paddingLeft: 5
    },
    informationText: {
        paddingBottom: 5,
        paddingLeft: 5,
        color: GREY_3,
    },
    input: {
        borderWidth: 1,
        borderColor: GREY_1,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
    },
    imageUploadButton: {
        borderWidth: 1,
        borderColor: GREY_1,
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    information: {
        borderWidth: 1,
        borderColor: GREY_1,
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    button: {
        width: widthPercentageToDP(92),
        borderRadius: 10
    }
})

const mapStateToProps = state => ({
    organizer: state.organizer
})

export default connect(mapStateToProps, { setOrganizerActions })(ManageOrganizerProfile)
