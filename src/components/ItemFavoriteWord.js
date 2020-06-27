import React, { useState, useEffect } from "react"
import { StyleSheet, ToastAndroid, Dimensions } from "react-native"
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ListItem, Right, Left, Button, Text } from "native-base"
import { addWordToFavoriteList, deleteWordFromFavoriteList } from "../utils/controller"

export function ItemFavoriteWord(props) {
  const {liked, word} = props.item;
  const screen = Dimensions.get('screen');

  const [nameIconStar, setNameIconStar] = useState(liked ? "star" : "star-o");

  const toggleStar = async () => {
    if (nameIconStar === "star") {
      setNameIconStar("star-o")
      //await addWordToFavoriteList(title)
    }
    else {
      setNameIconStar("star")
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
  const showToastWithGravity = () => {
    toggleStar();
    toggleNotice()
  };
  return (
    <ListItem>
      <Left>
        <Text style={styles.boxWord}>{word}</Text>
      </Left>
      <Right style={styles.boxMedia}>
        <Ionicons name="md-volume-high" color="#0077b3" size={25} />
        <Button transparent onPress={showToastWithGravity}>
          <FontAwesome name={nameIconStar} color={nameIconStar === "star" ? "#e6e600" : "#0077b3"} backgroundColor="#ffffff" size={25} />
        </Button>
      </Right>
    </ListItem>
  )
}
const styles = StyleSheet.create({
  boxWord: {
    color: "#004466",
    fontWeight: "bold",
    fontSize: 18
  },
  boxMedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})