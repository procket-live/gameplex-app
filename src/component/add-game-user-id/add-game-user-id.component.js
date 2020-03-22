import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { connect } from 'react-redux';

import { setUserAction } from '../../action/user.action';
import TextInputComponent from '../text-input/text-input.component';
import Button from '../button/button.component';
import PrivateApi from '../../api/private.api';
import { ON_PRIMARY, PRIMARY_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigatePop, navigate } from '../../service/navigation.service';
import IconComponent from '../icon/icon.component';

class AddGameUserId extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const getUserId = navigation.getParam('getUserId');

        return {
            headerRight:
                getUserId ?
                    <View style={{ marginRight: 15 }} >
                        <Text
                            onPress={getUserId}
                            style={{ color: PRIMARY_COLOR, fontSize: 14 }}
                        >
                            How to get?
                        </Text>
                    </View> : null
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            loading: false
        }
    }

    process = async () => {
        const gameId = this.props.navigation.getParam('gameId');
        this.setState({ loading: true });
        const result = await PrivateApi.AddGameUserId(gameId, { user_id: this.state.userId });
        this.setState({ loading: false });
        if (result.success) {
            this.props.setUserAction(result.response);
            navigatePop();
        }
    }

    inputHandler = (userId) => {
        this.setState({ userId })
    }

    isButtonDisabled = () => {
        return this.state.userId == ""
    }

    render() {
        return (
            <View style={{ backgroundColor: ON_PRIMARY, width: widthPercentageToDP(100), height: this.props.contentHeight, alignItems: 'center' }} >
                <View style={{ alignItems: 'flex-start', width: widthPercentageToDP(100), padding: 10, paddingLeft: 10, paddingRight: 15 }}>
                    <View style={{ paddingTop: 5, paddingBottom: 5 }} >
                        <Text style={styles.fontH1} >Enter User ID</Text>
                    </View>
                </View>
                <View style={styles.inputTextContainer} >
                    <TextInputComponent
                        label="User ID"
                        value={this.state.userId}
                        onChangeText={this.inputHandler}
                        RenderRight={() => (
                            <TouchableOpacity
                                style={{ padding: 5, borderWidth: 1, borderRadius: 5, flexDirection: 'row', borderColor: PRIMARY_COLOR, alignItems: 'center' }}
                                onPress={async () => {
                                    const userId = await Clipboard.getString();
                                    this.setState({ userId })
                                }}
                            >
                                <IconComponent font={'fontawesome'} size={20} focused tintColor={PRIMARY_COLOR} name={"clipboard"} />
                                <Text style={{ color: PRIMARY_COLOR, fontSize: 14, marginRight: 5, marginLeft: 5 }} >Paste</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Button
                        loading={this.state.loading}
                        text={'SAVE'}
                        onSubmitEditing={this.propcess}
                        onPress={this.process}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 100,
        paddingRight: 20,
        width: widthPercentageToDP(100),
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default connect(null, { setUserAction })(AddGameUserId);;
