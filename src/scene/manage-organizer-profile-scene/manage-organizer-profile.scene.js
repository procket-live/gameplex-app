import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

import { GREY_1, GREY_2, GREY_3, ON_PRIMARY, PRIMARY_COLOR, SECONDARY_COLOR } from '../../constant/color.constant';
import Button from '../../component/button/button.component';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import PrivateApi from '../../api/private.api';
import { setOrganizerActions } from '../../action/organizer.action';
import { AccessNestedObject } from '../../utils/common.util';
import { navigate, navigatePop } from '../../service/navigation.service';
import { useMutation } from '@apollo/react-hooks';
import { AddOrganizerMutation } from '../../graphql/graphql-mutation';


function ManageOrganizerProfile({ navigation }) {
    const params = AccessNestedObject(navigation, 'state.params', {});
    const organizer = AccessNestedObject(params, 'organizer', {});

    const [uploading, setUploading] = useState(false);
    const [organizerLogo, setOrganizerLogo] = useState(organizer?.organizer_logo);
    const [organizerName, setOrganizerName] = useState(organizer?.organizer_name);
    const [organizerUpi, setOrganizerUpi] = useState(organizer?.upi_address);
    const [addOrganizer, { loading }] = useMutation(AddOrganizerMutation, {
        onCompleted({ addOrganizer }) {
            if (addOrganizer) {
                navigatePop();
            }
        }
    });

    function disabled() {
        return !!(organizer)
    }

    function submitDisabled() {
        return (!organizerLogo || !organizerName || !organizerUpi) || uploading
    }

    async function uploadImage() {
        const image = await ImagePicker
            .openPicker({
                width: 512,
                height: 512,
                cropping: true
            });

        if (image) {
            setUploading(true);
            const path = `/chat_rooms/${Math.random()}`;
            await storage().ref(path).putFile(image.path);
            const url = await storage().ref(path).getDownloadURL();
            setUploading(false);
            setOrganizerLogo(url);
        }
    }


    async function createProfile() {
        addOrganizer({
            variables: {
                organizer_name: organizerName,
                organizer_logo: organizerLogo,
                upi_address: organizerUpi
            }
        })
    }

    return (
        <>
            <ScrollView style={styles.container} >
                <View style={styles.inputContainer} >
                    <Text style={styles.inputLabel} >Organizer Logo</Text>
                    <TouchableOpacity
                        disabled={disabled()}
                        onPress={uploadImage}
                        style={{ borderWidth: 1, borderRadius: 10, padding: 10, width: 150, height: 150, alignItems: 'center', justifyContent: 'center' }}
                    >
                        {
                            uploading ?
                                <ActivityIndicator color={SECONDARY_COLOR} animating size={"large"} />
                                :
                                (
                                    organizerLogo ?
                                        <Image
                                            source={{ uri: organizerLogo }}
                                            style={{ width: 150, height: 150, resizeMode: 'contain', borderRadius: 10 }}
                                        /> :
                                        <Text style={{ fontWeight: '300', fontSize: 20, color: PRIMARY_COLOR }} >
                                            Add Image
                                        </Text>
                                )
                        }
                    </TouchableOpacity>
                    <Text style={[styles.inputLabel, { color: SECONDARY_COLOR }]} >Image Should be 512 x 512 px</Text>
                </View>

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

                <View style={styles.inputContainer} >
                    <Text style={styles.inputLabel} >Organizer UPI ID</Text>
                    <TextInput
                        style={styles.input}
                        value={organizerUpi}
                        editable={!disabled()}
                        onChangeText={setOrganizerUpi}
                        placeholder="Enter UPI ID. eg - ba"
                    />
                </View>

                <View style={{ height: 50 }} />

                {
                    !disabled() ?
                        <Button
                            style={styles.button}
                            onPress={createProfile}
                            text="Submit"
                            disabled={submitDisabled()}
                            loading={loading}
                        />
                        : null
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

export default ManageOrganizerProfile;
