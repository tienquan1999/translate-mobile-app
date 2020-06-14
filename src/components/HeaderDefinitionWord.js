import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native"
import { Header, Left, Body, Right, Button, Icon, Input } from 'native-base';
import { connect } from "react-redux";
import IconCustom from "react-native-vector-icons/FontAwesome"
import BoxSearch from "../components/BoxSearch"

function HeaderDefinitionWord(props) {
  const { handleBack } = props;
  const title = props.wordMeaning.data.word;
  const [toggle, setToggle] = useState(false)
  const showBoxSearch = () => {
    setToggle(true)
  }
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
          <Icon name='search' onPress={showBoxSearch} />
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
const mapStateToProps = (state) => {
  return {
    wordMeaning: state.wordMeaning.data
  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDefinitionWord)