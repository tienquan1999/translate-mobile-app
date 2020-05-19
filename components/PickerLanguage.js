import React, { useState } from "react"
import {StyleSheet} from "react-native"
import { Form, Picker} from "native-base"

export default function PickerLanguage(props) {

  const listLanguage = ["English", "Japan", "Chinese", "Andian", "VietNam"]
  const [language, setLanguageChange] = useState(props.languageDefault)
  
  return (
    <Form>
      <Picker 
        note
        mode="dropdown"
        style={styles.picker}
        selectedValue={language}
        onValueChange={(value) => setLanguageChange(value)}
      >
        {
          (listLanguage || []).map((e, index)=>{
            return <Picker.Item label={e} value={e} key={index}/>
          })
        }
        
      </Picker>
    </Form>
  );
}
const styles = StyleSheet.create({
  picker:{
    width: 100, 
    backgroundColor:"#ffffff", 
    padding: 5,
    fontSize: 15,
    color: "#66a3ff",
    borderColor:"gray"
  }
})