import React from "react";
import { View, StyleSheet } from "react-native"
import { Icon } from "native-base"
import PickerLanguage from "./PickerLanguage";

export default function BoxSwitchLanguage() {

  return (
    <View style={styles.boxTranslate}>
      <PickerLanguage languageDefault="English" />

      <Icon name="swap" style={styles.iconSwap} />

      <PickerLanguage languageDefault="VietNam" />
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
    paddingVertical:5
  },
})