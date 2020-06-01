import React from 'react';
import {StyleSheet} from "react-native"
import {Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default function HeaderDefinitionWord(props) {
  const {title, handleBack} = props;
  
  return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={handleBack}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
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
  header:{
    backgroundColor: "#0077b3",
  }
})
