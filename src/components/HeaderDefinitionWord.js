import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, Dimensions } from "react-native"
import { Header, Left, Body, Right, Button, Icon, Item } from 'native-base';
import { FontAwesome, AntDesign } from "@expo/vector-icons"
import { addWordToFavoriteList, deleteWordFromFavoriteList} from "../utils/controller"

export default function HeaderDefinitionWord(props) {
  const { navigation, route, handleBack } = props;

  const title = route.params.wordMeaning.data.word;
  const { liked } = route.params.wordMeaning;
  console.log("liked: ", route.params)
  const [nameIconStar, setNameIconStar] = useState(liked ? "star" : "star-o");

  const toggleStar = async() => {
    if (nameIconStar === "star")
    {
      setNameIconStar("star-o")
      await addWordToFavoriteList(title)
    }
    else
    {
      setNameIconStar("star")
      await deleteWordFromFavoriteList(title)
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
    <Header style={styles.headerTab}>
      <Left>
        <Button transparent onPress={handleBack}>
          <AntDesign name='arrowleft' size={25} color="#ffffff" />
        </Button>
      </Left>
      <Body>
        <Text style={styles.title}>{title}</Text>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.navigate('Home')}>
          <AntDesign name='search1' size={25} color="#ffffff" />
        </Button>
        <Button transparent onPress={showToastWithGravity}>
          <FontAwesome name={nameIconStar} color={nameIconStar === "star" ? "#e6e600" : "#ffffff"} backgroundColor="#ffffff" size={25} />
        </Button>
      </Right>
    </Header>
  );
}
const styles = StyleSheet.create({
  boxSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerTab: {
    backgroundColor: "#0077b3",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff"
  }
})
