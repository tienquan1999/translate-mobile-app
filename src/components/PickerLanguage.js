import React, { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { Picker, View } from "native-base"
import { LANGUAGE, TYPE_LANGUAGE, ACTION_LANGUAGE } from "../constants/languages"
import { connect } from "react-redux";
import {switchLanguage} from "../actions/switchLanguage"

function PickerLanguage(props) {
  const {languageDefault, typeLanguage} = props;
  const {from, to} = props.languages;

  const [language, setLanguageChange] = useState(languageDefault)

  useEffect(()=>{
    setLanguageChange(languageDefault)
  }, [languageDefault])

  return (
    <View>
      <Picker
        note
        mode="dropdown"
        style={styles.picker}
        selectedValue={language}
        onValueChange={(value) => {
          setLanguageChange(value);
          if(typeLanguage === TYPE_LANGUAGE.FROM)
            props.changeLanguage(value, to, ACTION_LANGUAGE.CHANGE)
          if(typeLanguage === TYPE_LANGUAGE.TO)
            props.changeLanguage(from, value, "change")
        }}
      >
        {
          (LANGUAGE || []).map((e, index) => {
            return <Picker.Item label={e.label} value={e.value} key={index}  />
          })
        }

      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  picker: {
   width :  120,
    height: 40,
    color: "#66a3ff",
    
  } 
})
const mapStateToProps = (state) =>{
  return {
    languages :state.languages,
  }
}
const mapDispatchToProps = (dispatch) =>({
  changeLanguage: (from, to, action) => dispatch(switchLanguage(from, to, action))
})
export default connect(mapStateToProps, mapDispatchToProps)(PickerLanguage)