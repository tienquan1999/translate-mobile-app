import React from 'react';
import {StyleSheet,Text} from "react-native"
import {Header, Left, Body, Right, Button, Icon } from 'native-base';
import {connect} from "react-redux";

function HeaderDefinitionWord(props) {
  const {handleBack} = props;
  const title = props.wordMeaning.data.word;
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
  },
  title: {
    fontWeight : "bold",
    fontSize : 20,
    color : "#ffffff"
  }
})
const mapStateToProps = (state) =>{
  return {
    wordMeaning: state.wordMeaning.data
  }
}
const mapDispatchToProps = (dispatch) =>({
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDefinitionWord)