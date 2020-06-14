import React, { useState, Fragment } from 'react';
import { StyleSheet, Text, View } from "react-native"
import { Header, Left, Body, Right, Button, Icon, Input , Item} from 'native-base';
import { connect } from "react-redux";
import Search from "../components/Search"

function HeaderSearch(props) {
  const { handleBack } = props;
  return (
    <Header searchBar rounded style={styles.headerTab}>
      <Left>
        <Button transparent onPress={handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Search/>
    </Header>
  );
}
const styles = StyleSheet.create({
  fragment: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxSearch: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTab: {
    backgroundColor: "#0077b3",
    color: "#ffffff"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff"
  },
  boxSearch: {
    borderColor: '#0077b3',
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  iconMic: {
    color: "#ffffff",
    paddingLeft: 10
  },
  iconClose: {
    color: "#0077b3",
  },
})
const mapStateToProps = (state) => {
  return {
    wordMeaning: state.wordMeaning.data
  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)