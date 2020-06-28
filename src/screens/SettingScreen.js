import React from "react"
import { StyleSheet } from "react-native"
import { Card, CardItem, Content, Text, Container, Header, Title, Body, Left, Right } from "native-base"
import { MaterialIcons, FontAwesome, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"

export default function SettingScreen(props) {
  return (
    <Container>
      <Header style={styles.header}>
        <Left>
          <MaterialCommunityIcons name="menu" color="#ffffff" size={30} />
        </Left>
        <Body>
          <Title style={styles.title}>Tiện ích</Title>
        </Body>
        <Right />
      </Header>
      <Content padder backgroundColor="#ffffff">
        <Card>
          <CardItem button style={styles.listItem} onPress={() => props.navigation.navigate('FavoriteWord')}>
            <Left>
              <FontAwesome name="star" color="#ffff00" size={25} />
              <Text>Từ yêu thích của bạn </Text>
            </Left>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem button style={styles.listItem} onPress={() => props.navigation.navigate('Grammar')}>
            <Left>
              <FontAwesome5 name="book" color="#00ff00" size={25} />
              <Text>Ngữ pháp</Text>
            </Left>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem button style={styles.listItem} onPress={() => props.navigation.navigate('Topic')}>
            <Left>
              <FontAwesome5 name="book-reader" color="#33bbff" size={25} />
              <Text>Từ vựng theo chủ đề </Text>
            </Left>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  title: {
    color: "#ffffff",
  },
  header: {
    backgroundColor: "#0077b3",
  },
  listItem: {

  }
})