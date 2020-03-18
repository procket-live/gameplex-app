import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { TEXT_COLOR, GREY_3, GREY_2, GREY_1, PRIMARY_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export function Title(props) {
  return (
    <View style={styles.titleContainer} >
      <Text style={styles.title} >
        {props.children}
      </Text>
    </View>
  )
}

export function Content(props) {
  return (
    <View style={styles.contentContainer} >
      <Text style={[styles.content, props.bold ? styles.bold : {}]} >
        {props.children}
      </Text>
    </View>
  )
}

export function ImageComponent(props) {
  return (
    <Image source={{ uri: props.children }} style={styles.image} />
  )
}

export function Break() {
  return (
    <View style={styles.break} />
  )
}

function TournamentHowToPlayScene(props) {
  return (
    <ScrollView style={styles.container} >
      <Title>Step 1:</Title>
      <Content>
        Register for PUBG Tournament inside GamePlex. This is mandatory. Make sure
        that your PUBG ID is correct. Else, you will be unable to play.
      </Content>
      <Content bold >
        10 mins before the Tournament starts, you'll receive joining details for PUBG.
      </Content>
      <Break />

      <Title>Step 2:</Title>
      <Content>
        Open PUBG Mobile app on your device.
      </Content>
      <Content bold >
        NOTE: You should have already played at least one game of PUBG after installing. Else,
        PUBG will not allow to participate in tournament.
      </Content>
      <Break />

      <Title>Step 3:</Title>
      <Content>
        Tap on section as shown in the screenshot.
      </Content>
      <ImageComponent>
        https://firebasestorage.googleapis.com/v0/b/gameplex-5a29e.appspot.com/o/1-min.png?alt=media&token=23609899-5ddd-40b6-b75b-a4c6cde5b4ac
      </ImageComponent>
      <Break />

      <Title>Step 4:</Title>
      <Content>
        Tap on the Room option as shown in screenshot.
      </Content>
      <ImageComponent>
        https://firebasestorage.googleapis.com/v0/b/gameplex-5a29e.appspot.com/o/2-min.png?alt=media&token=2edd0501-e7c8-41ae-a25c-b6ef046f6122
      </ImageComponent>
      <Break />

      <Title>Step 5:</Title>
      <Content>
        Enter the Room ID in the text box shown in screenshot
      </Content>
      <ImageComponent>
        https://firebasestorage.googleapis.com/v0/b/gameplex-5a29e.appspot.com/o/3-min.png?alt=media&token=258799e0-0537-40df-a039-9707e916aa48
      </ImageComponent>
      <Break />

      <Title>Step 6:</Title>
      <Content>
        Enter the password for the Room as shown in screenshot
      </Content>
      <ImageComponent>
        https://firebasestorage.googleapis.com/v0/b/gameplex-5a29e.appspot.com/o/4-min.png?alt=media&token=3da37dc0-32d1-43cd-ab6b-8dc79be13811
      </ImageComponent>
      <Break />

      <Title>Step 7:</Title>
      <Content>
        You have joined the PUBG room successfully. Please wait until all the players join.
        The match will start automatically when all playes join or at Tournament start time,
        whichever is earlier.
      </Content>
      <ImageComponent>
        https://firebasestorage.googleapis.com/v0/b/gameplex-5a29e.appspot.com/o/5-min.png?alt=media&token=c880d9ac-9553-4529-8a9f-ddec009c6496
      </ImageComponent>
      <Break />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  titleContainer: {
    height: 40,
  },
  title: {
    fontSize: 18,
    color: GREY_2
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  bold: {
    color: PRIMARY_COLOR,
  },
  break: {
    borderTopWidth: 1,
    borderColor: GREY_1,
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    width: widthPercentageToDP(90),
    height: 200,
    resizeMode: 'contain'
  }
})

export default TournamentHowToPlayScene;