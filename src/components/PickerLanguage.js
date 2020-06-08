import React, { useState } from "react"
import {StyleSheet} from "react-native"
import {Picker,View} from "native-base"
import {LANGUAGE} from "../constants/languages"

export default function PickerLanguage(props) {
  const [language, setLanguageChange] = useState(props.languageDefault)
    return (
    <View>
      <Picker 
        note
        mode="dropdown"
        style={styles.picker}
        selectedValue={language}
        onValueChange={(value) => setLanguageChange(value)}
      >
        {
          (LANGUAGE || []).map((e, index)=>{
            return <Picker.Item label={e.label} value={e.value} key={index}/>
          })
        }
        
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  picker:{
    width: 130, 
    height:40,
    color: "#66a3ff",
  }
})