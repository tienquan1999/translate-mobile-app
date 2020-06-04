import React from 'react';
import {StyleSheet,Text} from "react-native"
import {Header, Left, Body, Right, Button, Icon, Title, View } from 'native-base';

export default function HeaderDefinitionWord(props) {
  const {title, handleBack} = props;
  
  return (
      <Header style={styles.headerTab}>
        <Left>
          <Button transparent onPress={handleBack}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Text>{title}</Text>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='search' />
          </Button>
          <Button transparent>
            <Icon name='star' />
          </Button>
        </Right>
      </Header>
      
  );
}
const styles = StyleSheet.create({
  headerTab:{
    backgroundColor: "#0077b3",
  }
})
