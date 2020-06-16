import React from 'react';
import { StyleSheet, Text } from "react-native"
import { Header, Left, Body, Right, Button, Icon, Input } from 'native-base';
import IconCustom from "react-native-vector-icons/FontAwesome"

export default function HeaderDefinitionWord(props) {
  const { navigation, title, handleBack} = props;
  return (
    <Header style={styles.headerTab}>
      <Left>
        <Button transparent onPress={handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Text style={styles.title}>{title}</Text>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.navigate('Home')}>
          <Icon name='search'/>
        </Button>
        <Button transparent>
          <IconCustom name='star-o' color="#ffffff" backgroundColor="#ffffff" size={25} />
          {/* <IconCustom name='star' color="#ffffff" backgroundColor="#ffffff" size={25}/> */}
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
