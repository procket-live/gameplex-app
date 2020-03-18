import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { AccessNestedObject, DisplayPrice } from '../../utils/common.util';
import { ON_PRIMARY, GREY_1, TEXT_COLOR, GREY_BG, GREEN, YELLOW, PRIMARY_COLOR } from '../../constant/color.constant';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';

import PrivateApi from '../../api/private.api';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import IconComponent from '../../component/icon/icon.component';
import moment from 'moment';

function ManageParticipents(props) {
  const tournament = props.navigation.getParam('tournament');
  const id = AccessNestedObject(tournament, '_id');

  const [participents, setParticipents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    return () => { }
  }, [])

  async function loadData() {
    setLoading(true);
    const result = await PrivateApi.GetParticipents(id);
    setLoading(false);
    if (result.success) {
      setParticipents(AccessNestedObject(result, 'response', []));
    }
  }

  return (
    <>
      <FlatList
        renderItem={RenderItem}
        data={participents}
        ListHeaderComponent={<RenderHeader tournament={tournament} participents={participents} />}
      />
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </>
  )
}

function RenderHeader({ tournament, participents }) {
  const size = tournament.size;
  const participentsCount = (participents || []).length;
  let totalCollection = 0;

  participents.forEach((item) => {
    totalCollection += parseInt(AccessNestedObject(item, 'order.amount'));
  })

  return (
    <View style={{ width: widthPercentageToDP(100), height: 100, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: GREY_1 }} >
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10 }} >
        <Text style={{ fontSize: 14, color: TEXT_COLOR }}>
          Participents
        </Text>
        <Text style={{ fontSize: 22, color: TEXT_COLOR }}>
          {participentsCount}/{size}
        </Text>
      </View>
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-start', padding: 10 }} >
        <Text style={{ fontSize: 16, color: GREEN }}>
          Total Collection: {DisplayPrice(totalCollection)}
        </Text>
      </View>
    </View>
  )
}

function RenderItem({ item }) {
  console.log('item', item)
  const user = AccessNestedObject(item, 'user', {});
  const profileImage = AccessNestedObject(user, 'profile_image');

  return (
    <View style={{ borderBottomColor: GREY_BG, borderBottomWidth: 1, }} >
      <View style={{ height: 50, flexDirection: 'row' }} >
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
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
          <Text style={{ color: GREEN, fontSize: 18 }} >+ {DisplayPrice(AccessNestedObject(item, 'order.amount'))}</Text>
        </View>
      </View>
      <View style={{ paddingLeft: 15, paddingRight: 15, padding: 5, alignItems: 'flex-start', justifyContent: 'center' }} >
        <Text style={{ color: PRIMARY_COLOR, fontSize: 16 }} >Order Id: {AccessNestedObject(item, 'order.order_id')}</Text>
        <Text style={{ fontSize: 14, color: GREY_1 }}>{moment(item.created_at).format(DISPLAY_DATE_TIME_FORMAT)}</Text>
      </View>
      <View style={{ paddingLeft: 15, paddingRight: 15, padding: 5, alignItems: 'flex-start', justifyContent: 'center' }} >
        <Image source={{ uri: AccessNestedObject(item, 'order.document_links.0') }} style={{ borderWidth: 1, height: 300, width: widthPercentageToDP(90), resizeMode: 'contain' }} />
      </View>
    </View>
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

export default ManageParticipents;
