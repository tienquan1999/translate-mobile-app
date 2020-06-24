import React from "react"
import {View, Text, StyleSheet} from "react-native"
import { Content, Button, Container, Header, Title, Body, Left, Right } from "native-base"
import { MaterialCommunityIcons} from "@expo/vector-icons"

export default function SettingScreen(props){
  return(
    <Container>
      <Header style={styles.header}>
        <Left>
          <MaterialCommunityIcons name="settings" color="#ffffff" size={30}/>
        </Left>
        <Body>
        <Title style={styles.title}>Cài đặt</Title>
        </Body>
        <Right/>
      </Header>
      <Body>

      </Body>
    </Container>
    )
}
const styles = StyleSheet.create({
  title:{
    color:"#ffffff",
    paddingLeft:10
  },
  header:{
    backgroundColor:"#0077b3",
  }
})