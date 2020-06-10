import React from 'react';
import { StyleSheet, Text } from "react-native"
import { Header, Left, Body, Button, Icon, Right } from 'native-base';
import { connect } from "react-redux";

function HeaderSearchOnline(props) {
  const { handleBack, title } = props;
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
const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchOnline)