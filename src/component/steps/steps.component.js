import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, GREY_1, SECONDARY_COLOR } from '../../constant/color.constant';



const StepsIndicator = ({ steps, currentStep }) => (
    < View style={styles.container} >
        {
            Array(steps).fill(0).map((item, index) => (
                <View key={index} style={[styles.step, (currentStep == (index + 1)) ? styles.activeStep : styles.inactiveStep]} ></View>
            ))
        }
    </View >
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    step: {
        height: 10,
        paddingRight: 4,
        marginRight: 4,
        borderRadius: 5
    },
    activeStep: {
        backgroundColor: SECONDARY_COLOR,
        width: 50,
    },
    inactiveStep: {
        backgroundColor: GREY_1,
        width: 20,
    }
})

export default StepsIndicator;
