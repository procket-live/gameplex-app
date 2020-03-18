import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import Tabs from '../../component/tabs/tabs.component';
import PrivateApi from '../../api/private.api';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ON_PRIMARY, GREY_BG, GREEN, GREY_1, GREY_3, GREY_2, YELLOW, RED, TEXT_COLOR, PRIMARY_COLOR } from '../../constant/color.constant';
import { DISPLAY_DATE_TIME_FORMAT } from '../../constant/app.constant';

import { DisplayPrice, AccessNestedObject } from '../../utils/common.util';
import moment from 'moment';
import { PaytmIcon, UpiIcon } from '../../config/image.config';

function JoinedTournamentScene(props) {
  const [upcomingActiveTournaments, setUpcomingActiveTournaments] = React.useState([]);
  const [completedTournaments, setCompletedTournaments] = React.useState([]);

  React.useEffect(() => {
    fetchData();
    return () => { }
  }, [])

  async function fetchData() {

  }

  function RenderCard({ item }) {
    const response = JSON.parse(item.response || JSON.stringify({}));
    const status = item.status;

    return null
  }

  return (
    <View style={{ flex: 1, backgroundColor: GREY_BG }}>
      <Tabs >
        <Box tabLabel="Upcoming Tournaments"  >
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            renderItem={RenderCard}
            data={upcomingActiveTournaments}
          />
        </Box>
        <Box tabLabel="Completed Tournaments"  >
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            renderItem={RenderCard}
            data={completedTournaments}
          />
        </Box>
      </Tabs>
    </View>
  )
}

function Box(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}  >
      {props.children}
    </View>
  )
}

export default JoinedTournamentScene;
