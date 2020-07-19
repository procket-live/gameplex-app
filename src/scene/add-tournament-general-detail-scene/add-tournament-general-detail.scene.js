import React, { PureComponent, useState } from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import Form4u from 'react-native-form4u';
import { navigatePop } from '../../service/navigation.service';
import { Camelize, AccessNestedObject, ConvertToWord } from '../../utils/common.util';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GetGameMetaQuery } from '../../graphql/graphql.query';
import Spinner from 'react-native-loading-spinner-overlay';
import { AddTournamentMetaMutation } from '../../graphql/graphql-mutation';

function AddTournamentGeneralDetailScene({ navigation }) {
    const params = AccessNestedObject(navigation, 'state.params', {});
    const gameId = AccessNestedObject(params, 'game_id');
    const tournamentId = AccessNestedObject(params, 'tournament_id');

    const [gameMeta, setGameMeta] = useState([]);
    const [addTournamentMeta] = useMutation(AddTournamentMetaMutation, {
        onCompleted({ setTournamentMeta }) {
            if (setTournamentMeta) {
                navigatePop();
            }
        }
    })

    const { loading } = useQuery(GetGameMetaQuery, {
        onCompleted({ game }) {
            console.log('game', game)
            setGameMeta(AccessNestedObject(game, 'game_meta', []))
        },
        variables: {
            id: gameId
        }
    })

    function getForm() {
        const form = gameMeta.map((meta) => {
            const pickerItems = AccessNestedObject(meta, 'lookup_type.values', []).map((item) => ({ label: item.name, value: item.value }));
            return [{
                name: Camelize(meta.key),
                placeholder: meta.key,
                type: 'picker',
                pickerItems: [{ label: `Select ${meta.key}`, value: '' }, ...pickerItems],
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

    function handleValidation(state) {
        const errors = {};
        const keys = Object.keys(state);

        keys.forEach((key) => {
            if (!state[key].value && key != 'submit') {
                errors[key] = `Please select ${ConvertToWord(key)}`
            }
        })

        return errors;
    }

    function handleSubmit(state) {
        const response = [];
        gameMeta.forEach((item) => {
            response.push({ key: item.key, value: state[Camelize(item.key)].value })
        })

        addTournamentMeta({
            variables: {
                input: response,
                tournament_id: tournamentId
            }
        })
    }

    return (
        <>
            <ScrollView style={styles.container}>
                {
                    !loading && Array.isArray(gameMeta) && gameMeta.length ?
                        <Form4u
                            formFields={getForm()}
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

// class AddTournamentGeneralDetailScene extends PureComponent {
//     static navigationOptions = ({ navigation }) => {
//         const { params = {} } = navigation.state;
//         return {
//             headerTitleStyle: { color: '#fff' },
//             headerStyle: { backgroundColor: '#3c3c3c' },
//             headerRight: params.isSet ? (
//                 <View style={{ marginRight: 15 }} >
//                     <Button
//                         disabled={params.isInactive}
//                         title="Edit"
//                         onPress={params.edit}
//                     />
//                 </View>
//             ) : null
//         };
//     };

//     constructor(props) {
//         super(props);
//         this.state = {
//             formData: {},
//             isSet: props.navigation.getParam('isSet'),
//         }
//     }

//     componentDidMount = () => {
//         this.props.navigation.setParams({ edit: this.edit });
//     }

//     edit = () => {
//         this.setState({ isSet: false })
//     }

//     form = () => {
//         const { isSet } = this.state;
//         return isSet ? this.displayForm() : this.inputForm();
//     }

//     inputForm = () => {
//         const gameMeta = this.props.navigation.getParam('gameMeta') || [];

//         const form = gameMeta.map((meta) => {
//             const pickerItems = AccessNestedObject(meta, 'lookup_type.values', []).map((item) => ({ label: item.name, value: item.value }));
//             return [{
//                 name: Camelize(meta.key),
//                 placeholder: meta.key,
//                 type: 'picker',
//                 pickerItems: [{ label: `Select ${meta.key}`, value: '' }, ...pickerItems],
//             }]
//         });

//         form.push([
//             {
//                 name: 'submit',
//                 label: 'Sumbit',
//                 type: 'button',
//             },
//         ])

//         return form;
//     }

//     displayForm = () => {
//         const tournamentMeta = this.props.navigation.getParam('tournamentMeta') || [];

//         const form = tournamentMeta.map((meta) => {
//             return [{
//                 name: Camelize(meta.key),
//                 label: meta.key,
//                 type: 'text',
//                 defaultValue: meta.value,
//                 fieldProps: {
//                     disabled: true
//                 }
//             }]
//         });

//         return form;
//     }

//     handleSubmit = (state) => {
//         const callback = this.props.navigation.getParam('callback');
//         const gameMeta = this.props.navigation.getParam('gameMeta');

//       

//         callback(response);
//         navigatePop();
//     }

//     handleValidation = (state) => {
//         const errors = {};
//         const keys = Object.keys(state);

//         keys.forEach((key) => {
//             if (!state[key].value && key != 'submit') {
//                 errors[key] = `Please select ${ConvertToWord(key)}`
//             }
//         })

//         return errors;
//     }

//     render() {
//         return (
//             <ScrollView style={styles.container}>
//                 <Form4u
//                     formFields={this.form()}
//                     handleSubmit={this.handleSubmit}
//                     validation={this.handleValidation}
//                     submitOnDirty
//                 />
//             </ScrollView>
//         )
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    submitButton: {
        paddingHorizontal: 10,
        paddingTop: 20,
    }
})

export default AddTournamentGeneralDetailScene;