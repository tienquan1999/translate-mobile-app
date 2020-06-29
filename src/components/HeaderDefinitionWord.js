import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, Dimensions } from "react-native"
import { Button, View } from 'native-base';
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { addWordToFavoriteList, deleteWordFromFavoriteList } from "../utils/controller"

export default function HeaderDefinitionWord(props) {
  const { navigation, route } = props;
 
  let title = route.params.wordMeaning.data.word;
  let { liked } = route.params.wordMeaning;
  
  const [nameIconStar, setNameIconStar] = useState(liked ? "star" : "star-o");

  const toggleStar = async () => {
    
    if (nameIconStar === "star-o") {
      setNameIconStar("star")
      await addWordToFavoriteList(title)
    }
    else {
      setNameIconStar("star-o")
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
    <View style={styles.boxRight}>
      <Button transparent onPress={() => navigation.navigate('Home')}>
        <Ionicons name='md-search' size={25} color="#ffffff" />
      </Button>
      <Button transparent onPress={showToastWithGravity}>
        <FontAwesome name={nameIconStar} color={nameIconStar === "star" ? "#e6e600" : "#ffffff"} backgroundColor="#ffffff" size={25} />
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  boxRight:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex:1,
    width:100,
    padding:20
  },
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
