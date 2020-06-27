import React, { useState } from 'react';
import { StyleSheet, Text , ToastAndroid,Dimensions} from "react-native"
import { Header, Left, Body, Right, Button, Icon, Item } from 'native-base';
import {FontAwesome,AntDesign} from "@expo/vector-icons"

export default function HeaderDefinitionWord(props) {
  const { navigation, title, handleBack, route} = props;
  console.log("route in header: ", route)
  const [nameIconStar, setNameIconStar] = useState("star-o");
  const screen = Dimensions.get('screen');
  console.log(route.params.wordMeaning.liked)

  const showToastWithGravity = () => {
    setNameIconStar("star")
    ToastAndroid.showWithGravityAndOffset(
      "Đã thêm vào danh sách từ vựng của bạn",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,0,screen.height*1/4
    );
  };
  return (
    <Header style={styles.headerTab}>
      <Left>
        <Button transparent onPress={handleBack}>
          <AntDesign name='arrowleft'  size={25} color="#ffffff"/>
        </Button>
      </Left>
      <Body>
        <Text style={styles.title}>{title}</Text>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.navigate('Home')}>
          <AntDesign name='search1' size={25} color="#ffffff"/>
        </Button>
        <Button transparent onPress={showToastWithGravity}>
          
          <FontAwesome name={nameIconStar} color={route.params.wordMeaning.liked === true ? "#e6e600" : "#ffffff"} backgroundColor="#ffffff" size={25} />
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
