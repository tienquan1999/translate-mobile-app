import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native"
import { Icon, Button, Body } from "native-base"
import PickerLanguage from "./PickerLanguage";

export default function BoxSwitchLanguage() {

  const [fromText, setFromText] = useState("English");
  const [toText, setToText] = useState("VietNam");

  const handleSwap = () => {
    let params1 = fromText;
    let params2 = toText;
    setToText(params1)
    setFromText(params2);
  }
  return (
    <View style={styles.boxTranslate}>
      <PickerLanguage languageDefault={fromText} />
      <Button onPress={handleSwap}>
        <Icon name="swap" style={styles.iconSwap} />
      </Button>
      <PickerLanguage languageDefault={toText} />
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