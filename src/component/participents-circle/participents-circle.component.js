import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import { ON_PRIMARY, PRIMARY_COLOR, GREY_1, GREEN } from '../../constant/color.constant';
import IconComponent from '../icon/icon.component';
import { AccessNestedObject } from '../../utils/common.util';

function ParticipentsCircle({ participents = [], onlineList }) {
    const participentCount = participents.length;
    if (participentCount == 0) {
        return <Text style={{ fontSize: 14, color: GREEN }} >Registration Open</Text>;
    }

    const firstThree = participents.slice(0, 3);
    return (
        <View style={styles.container} >
            {
                firstThree.map((item, index) => {
                    const online = onlineList[AccessNestedObject(item, 'user._id')];

                    return (
                        <>
                            <View style={[styles.circleContainer, index != 0 ? styles.moveLeft : {}]} >
                                {
                                    AccessNestedObject(item, 'user.profile_image') ?
                                        <>
                                            <Image
                                                style={styles.circle}
                                                source={{ uri: AccessNestedObject(item, 'user.profile_image') }}
                                            />
                                        </>
                                        :
                                        <IconComponent
                                            style={styles.circle}
                                            font="fontawesome"
                                            size={25}
                                            name="user-circle"
                                            focused
                                            tintColor={GREY_1}
                                        />
                                }
                                {
                                    online ?
                                        <View style={{ width: 10, height: 10, backgroundColor: GREEN, borderRadius: 10, position: 'absolute', right: -3, bottom: 0, borderWidth: 1, borderColor: ON_PRIMARY }} />
                                        : null
                                }
                            </View>
                        </>
                    )
                })
            }
            {
                (participentCount > 3) ?
                    <View style={[styles.countCircleContainer, styles.moveLeft]} >
                        <Text style={{ fontWeight: '300', fontSize: 8, color: ON_PRIMARY }} >+{participentCount - 3}</Text>
                    </View> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3
    },
    circleContainer: {
        width: 30,
        height: 30,
        borderWidth: 3,
        borderColor: ON_PRIMARY,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        width: 20,
        height: 20,
        resizeMode: 'center',
    },
    moveLeft: {
        marginLeft: 0
    },
    countCircleContainer: {
        width: 30,
        height: 30,
        borderWidth: 3,
        borderColor: ON_PRIMARY,
        borderRadius: 30,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => ({
    onlineList: state.online
})

export default connect(mapStateToProps)(ParticipentsCircle);