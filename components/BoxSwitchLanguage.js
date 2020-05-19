import React, { useState } from "react";
import { View, StyleSheet } from "react-native"
import { Icon, Button } from "native-base"
import PickerLanguage from "./PickerLanguage";

export default function BoxSwitchLanguage() {

  return (
    <View style={styles.boxTranslate}>
      <PickerLanguage languageDefault="English"/>
      <Button style={styles.btnSwap}>
        <Icon name="swap" style={styles.iconSwap}/>
      </Button>
      <PickerLanguage languageDefault="VietNam"/>
    </View>
  );
}
const styles = StyleSheet.create({
  btnSwap: {
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    height: 30
  },
  iconSwap:{
    color:"#000000"
  },
  boxTranslate: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },
})