import React from "react"
import { View,  StyleSheet } from "react-native"
import { Content, Text,Button, Icon, List, ListItem, Container, Header, Title, Body, Left, Right } from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function SettingScreen(props) {
  return (
    <Container>
      <Header style={styles.header}>
        <Left>
          <MaterialCommunityIcons name="settings" color="#ffffff" size={30} />
        </Left>
        <Body>
          <Title style={styles.title}>Cài đặt</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          <ListItem itemDivider/>
          <ListItem icon onPress={() => props.navigation.navigate('FavoriteWord')}>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="star" />
              </Button>
            </Left>
            <Body>
              <Text>Từ yêu thích của bạn </Text>
            </Body>
            <Right />
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="book" />
              </Button>
            </Left>
            <Body>
              <Text>Ngữ pháp theo chủ đề </Text>
            </Body>
            <Right />
          </ListItem>
        </List>
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  title: {
    color: "#ffffff",
    paddingLeft: 10
  },
  header: {
    backgroundColor: "#0077b3",
  }
})