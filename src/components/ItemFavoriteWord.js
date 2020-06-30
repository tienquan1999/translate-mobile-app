import React, { useState } from "react"
import { StyleSheet, ToastAndroid, Dimensions } from "react-native"
import { Ionicons, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import { ListItem, Right, Left, Button, Text } from "native-base"
import {textToSpeechWithApiGoogle} from "../utils/google-api/text-to-speech";

export function ItemFavoriteWord(props) {
  const {word} = props.item;
  const screen = Dimensions.get('screen');

  const speechText = async() =>{
    await textToSpeechWithApiGoogle(word, "en") //ban them from, to
  }
  const deleteWord = async() =>{
    await props.onDelete(word);
    ToastAndroid.showWithGravityAndOffset(
      `Đã xóa từ ${word} vào danh sách từ vựng của bạn`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM, 0, screen.height * 1 / 4
    );
  }

  return (
    <ListItem>
      <Left>
        <Text style={styles.boxWord}>{word}</Text>
      </Left>
      <Right style={styles.boxMedia}>
        <Ionicons name="md-volume-high" color="#0077b3" size={25} onPress={speechText}/>
        <Button transparent onPress={deleteWord}>
          <MaterialIcons name="delete" color="#ff4d4d" size={25} />
        </Button>
      </Right>
    </ListItem>
  )
}
const styles = StyleSheet.create({
  boxWord: {
    color: "#0077b3",
  },
  boxMedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})