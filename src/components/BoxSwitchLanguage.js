import React from "react";
import { View, StyleSheet } from "react-native"
import PickerLanguage from "./PickerLanguage";
import { switchLanguage } from "../actions/switchLanguage";
import { connect } from "react-redux";
import { TYPE_LANGUAGE, ACTION_LANGUAGE } from "../constants/languages";
import {Ionicons} from "@expo/vector-icons"

function BoxSwitchLanguage(props) {
  const {from, to} = props.languages;
 const clickSwitchLanguage = () =>
  {
    if(props.screen === 'onlineScreen')
      {
        props.changeWordSearch();
        props.switchLanguage(from,to,ACTION_LANGUAGE.SWITCH)
      }

    else
      props.switchLanguage(from, to, ACTION_LANGUAGE.SWITCH)
  }
  return (
    <View style={styles.boxTranslate}>
      <PickerLanguage languageDefault={from} typeLanguage={TYPE_LANGUAGE.FROM}/>
      <Ionicons name="md-sync"size={30} onPress={ clickSwitchLanguage}/>
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