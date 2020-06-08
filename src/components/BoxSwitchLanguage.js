import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native"
import { Icon, Button, Body } from "native-base"
import PickerLanguage from "./PickerLanguage";
import { switchLanguage } from "../actions/switchLanguage";
import { connect } from "react-redux";
import { TYPE_LANGUAGE, ACTION_LANGUAGE } from "../constants/languages";

function BoxSwitchLanguage(props) {
  const {from, to} = props.languages;
  
  return (
    <View style={styles.boxTranslate}>
      <PickerLanguage languageDefault={from} typeLanguage={TYPE_LANGUAGE.FROM}/>
      <Button onPress={()=>props.switchLanguage(from, to, ACTION_LANGUAGE.SWITCH)}>
        <Icon name="swap" style={styles.iconSwap} />
      </Button>
      <PickerLanguage languageDefault={to} typeLanguage={TYPE_LANGUAGE.TO}/>
    </View>
  );
}
const styles = StyleSheet.create({
  iconSwap: {
    color: "#bfbfbf"
  },
  boxTranslate: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    paddingVertical: 5
  },
})
const mapStateToProps = (state) =>{
  return {
    languages :state.languages,
  }
}
const mapDispatchToProps = (dispatch) =>({
  switchLanguage: (from, to, action) => dispatch(switchLanguage(from, to, action))
})
export default connect(mapStateToProps, mapDispatchToProps)(BoxSwitchLanguage)