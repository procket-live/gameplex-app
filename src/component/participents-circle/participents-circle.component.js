import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { ON_PRIMARY, PRIMARY_COLOR, GREY_1, GREEN } from '../../constant/color.constant';
import { Header } from 'react-navigation-stack';
import IconComponent from '../icon/icon.component';
import { AccessNestedObject } from '../../utils/common.util';

function ParticipentsCircle({ participents = [] }) {
  const participentCount = participents.length;
  if (participentCount == 0) {
    return <Text style={{ fontSize: 14, color: GREEN }} >Registration Open</Text>;
  }

  const firstThree = participents.slice(0, 3);
  return (
    <View style={styles.container} >
      {
        firstThree.map((item, index) => (
          <View style={[styles.circleContainer, index != 0 ? styles.moveLeft : {}]} >
            {
              AccessNestedObject(item, 'profile_image') ?
                <Image
                  style={styles.circle}
                  source={{ uri: AccessNestedObject(item, 'profile_image') }}
                /> :
                <IconComponent
                  style={styles.circle}
                  font="fontawesome"
                  size={25}
                  name="user-circle"
                  focused
                  tintColor={GREY_1}
                />
            }
          </View>
        ))
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
    alignItems: 'center'
  },
  circleContainer: {
    width: 30,
    height: 30,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: ON_PRIMARY,
    borderRadius: 30,
  },
  circle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',

  },
  moveLeft: {
    marginLeft: -10
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

export default ParticipentsCircle;