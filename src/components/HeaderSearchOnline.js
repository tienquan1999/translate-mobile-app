import React from 'react';
import { StyleSheet, Text } from "react-native"
import { Header, Left, Body, Button, Right } from 'native-base';
import{AntDesign} from "@expo/vector-icons"

export default function HeaderSearchOnline(props) {
  const { handleBack, title } = props;
  return (
    <Header style={styles.headerTab}>
      <Left>
        <Button transparent onPress={handleBack}>
          <AntDesign name='arrowleft' size={30} color="#ffffff" />
        </Button>
      </Left>
      <Body>
        <Text style={styles.title}>{title}</Text>
      </Body>
      <Right />
    </Header>
  );
}
const styles = StyleSheet.create({
  headerTab: {
    backgroundColor: "#0077b3",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffffff"
  }
})
