import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { ON_PRIMARY, GREY_1, TEXT_COLOR, GREY_BG, GREEN, YELLOW, PRIMARY_COLOR } from '../../constant/color.constant';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';

import PrivateApi from '../../api/private.api';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import IconComponent from '../../component/icon/icon.component';
import moment from 'moment';

function SelectParticipentScene(props) {
  const participents = props.navigation.getParam('participents');
  const callback = props.navigation.getParam('callback');
  const disabled = props.navigation.getParam('disabled');

  return (
    <>
      <FlatList
        renderItem={({ item }) => <RenderItem disabled={disabled} item={item} callback={callback} />}
        data={participents}
      />
    </>
  )
}

function RenderItem({ item, callback, disabled = [] }) {
  const user = AccessNestedObject(item, 'user', {});
  const profileImage = AccessNestedObject(user, 'profile_image');
  const isDisabled = disabled.includes(user._id);
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={{ borderBottomColor: GREY_BG, borderBottomWidth: 1, }}
      onPress={() => callback(user)}
    >
      <View style={{ height: 50, flexDirection: 'row', backgroundColor: isDisabled ? GREY_1 : ON_PRIMARY }} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          {
            profileImage ?
              <Image source={{ uri: profileImage }} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
              :
              <IconComponent
                font="fontawesome"
                size={25}
                name="user-circle"
                focused
                tintColor={GREY_1}
              />
          }
        </View>
        <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }} >
          <Text style={{ color: TEXT_COLOR, fontSize: 18 }} >{user.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
// document_links
const styles = StyleSheet.create({
  container: {

  },
  spinnerTextStyle: {
    color: ON_PRIMARY
  }
})

export default SelectParticipentScene;
