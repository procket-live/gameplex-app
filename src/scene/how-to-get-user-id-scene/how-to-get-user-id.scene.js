import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { TEXT_COLOR, GREY_3, GREY_2, GREY_1, PRIMARY_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Title, Content, ImageComponent, Break } from '../tournament-how-to-play-scene/tournament-how-to-play.scene';

function HowToGetUserId() {
  return (
    <ScrollView style={styles.container} >
      <Title>Step 1:</Title>
      <Content>
        Tap on profile button
      </Content>
      <ImageComponent>
        https://firebasestorage.googleapis.com/v0/b/gameplex-5a29e.appspot.com/o/a.png?alt=media&token=65a94ede-d67d-4c4d-83ce-c9d71b8c34c6
      </ImageComponent>
      <Break />

      <Title>Step 2:</Title>
      <Content>
        Copy PUBG ID
      </Content>
      <ImageComponent>
        https://firebasestorage.googleapis.com/v0/b/gameplex-5a29e.appspot.com/o/b.png?alt=media&token=70b7fdb8-1b7e-4e91-a05f-64449ad7a7db
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

export default HowToGetUserId;