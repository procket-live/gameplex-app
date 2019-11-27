import React, { PureComponent } from 'react';
import { View, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import Form4u from 'react-native-form4u';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import PrivateApi from '../../api/private.api';
import { navigatePop } from '../../service/navigation.service';
import { Camelize, AccessNestedObject, ConvertToWord } from '../../utils/common.util';
import { PRIMARY_COLOR, GREY_BG, ON_PRIMARY, TEXT_COLOR } from '../../constant/color.constant';

class AddTournamentRankDetailScene extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { color: '#fff' },
            headerStyle: { backgroundColor: '#3c3c3c' },
            headerRight: params.isSet ?
                <View style={{ marginRight: 15 }} >
                    <Button
                        disabled={params.isInactive}
                        title="Edit"
                        onPress={params.edit}
                    />
                </View> :
                <View style={{ marginRight: 15 }} >
                    <Button
                        title="SAVE"
                        onPress={params.handleSubmit}
                    />
                </View>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Rank', 'Amount'],
            tableData: [],
            amount: {},
            isSet: props.navigation.getParam('isSet'),
        }
    }

    fetchData = () => {
        const toRender = this.props.navigation.getParam('size');
        const tableData = [];
        const arr = Array.from(Array(toRender).keys())
        arr.forEach((value, index) => {
            tableData.push([index + 1, 'amount'])
        })
        this.setState({ tableData });
    }

    setData = () => {
        const rank = this.props.navigation.getParam('rank');
        const amount = {};
        const props = {};

        if (rank && Array.isArray(rank) && rank.length) {
            rank.forEach((item) => {
                amount[item.rank - 1] = item.amount ? String(item.amount) : '';
                // props[item.rank] = item.props ? String(item.props) : ''
            })
        }
        this.setState({ amount, props });
    }

    componentDidMount() {
        this.props.navigation.setParams({ edit: this.edit });
        this.props.navigation.setParams({ handleSubmit: this.handleSubmit });
        this.fetchData();
        this.setData();
    }

    edit = () => {
        this.props.navigation.setParams({ isSet: false });
        this.setState({ isSet: false })
    }

    handleSubmit = () => {
        const { amount } = this.state;
        const callback = this.props.navigation.getParam('callback');
        const size = this.props.navigation.getParam('size');
        const arr = Array.from(Array(size).keys())

        const response = [];

        arr.forEach((value, index) => {
            const rank = index + 1;
            const calAmount = amount[index];
            if (calAmount) {
                response.push({ rank, amount: calAmount });
            }
        })
        console.log('response', response)
        callback(response);
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    renderInput = (data, index) => {
        return (
            <TextInput
                value={this.state[data][index]}
                onChangeText={(value) => {
                    this.setState({ [data]: { ...this.state[data], [index]: value } })
                }}
                placeholder={data}
                editable={!this.state.isSet}
                keyboardType={data == 'amount' ? 'number-pad' : 'default'}
                style={styles.inputText}
            />
        )
    }

    render() {
        console.log(this.state.amount);
        return (
            <ScrollView style={styles.container}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                    {
                        this.state.tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData, cellIndex) => (<Cell key={cellIndex} data={cellIndex == 0 ? cellData : this.renderInput(cellData, index)} textStyle={styles.text2} />))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
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
    },
    head: { height: 40, backgroundColor: PRIMARY_COLOR },
    text: { margin: 6, color: ON_PRIMARY },
    text2: { margin: 6, color: TEXT_COLOR },
    row: { flexDirection: 'row', backgroundColor: ON_PRIMARY },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    inputText: {
        borderWidth: 1,
        borderColor: GREY_BG,
        width: 70,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        textAlign: 'center'
    }
})

export default AddTournamentRankDetailScene;