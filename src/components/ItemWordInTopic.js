import React, { useState } from "react"
import { StyleSheet, Dimensions, View, ToastAndroid } from "react-native"
import { Body, Left, Right, Button, Text, ListItem } from "native-base"
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { addWordToFavoriteList, deleteWordFromFavoriteList } from "../utils/controller"

export default function ItemWordInTopic(props) {

  const { content, mean } = props.item;
  const [nameIconStar, setNameIconStar] = useState("star");

  const toggleStar = async () => {
    //console.log(title);
    if (nameIconStar === "star-o") {
      setNameIconStar("star")
      //await addWordToFavoriteList(title)
    }
    else {
      setNameIconStar("star-o")
      //await deleteWordFromFavoriteList(title)
    }
  }
  const toggleNotice = () => {
    if (nameIconStar === "star-o")
      ToastAndroid.showWithGravityAndOffset(
        "Đã thêm vào danh sách từ vựng của bạn",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM, 0, screen.height * 1 / 4
      );
    else
      ToastAndroid.showWithGravityAndOffset(
        "Đã loại khỏi danh sách từ vựng của bạn",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM, 0, screen.height * 1 / 4
      );
  }
  const screen = Dimensions.get('screen');

  const showToastWithGravity = () => {
    toggleStar();
    toggleNotice()
  };
  return (
    <ListItem>
      <Left >
        <View style={styles.boxWord}>
          <Text style={styles.word}>{content}</Text>
          <Text style={styles.mean}>{mean}</Text>
        </View>
      </Left>
      <Body />
      <Right>
        <View style={styles.boxMedia}>
          <Ionicons name="md-volume-high" color="#0077b3" size={25} />
          <Button transparent onPress={showToastWithGravity}>
            <FontAwesome name={nameIconStar} color={nameIconStar === "star" ? "#e6e600" : "#0077b3"} backgroundColor="#ffffff" size={25} />
          </Button>
        </View>
      </Right>
    </ListItem>
  )
}
const styles = StyleSheet.create({
  boxWord: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  word: {
    color: "#004466",
    fontWeight: "bold",
    fontSize: 18
  },
  mean: {
    color: "#bfbfbf",
    fontSize: 16
  },
  boxMedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})