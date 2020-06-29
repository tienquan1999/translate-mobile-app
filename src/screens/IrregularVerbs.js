import React, { useState, useEffect } from "react"
import {View, Text, StyleSheet} from "react-native"
import Axios from "axios";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import {Table, Row, Rows} from "react-native-table-component"

import {Ionicons,FontAwesome} from "@expo/vector-icons"
export default function IrregularVerbs(props)
{
  const [verbs , setVerbs ] = useState([]);
  const [textSearch , setText] =useState("")
  const tableHeader = ['Động từ' , 'Quá khứ đơn', 'Quá khứ phân từ']
   useEffect(() =>{
     Axios.get('http://34.87.80.48:3000/irregular')
      .then((res) =>{
         setVerbs(res.data.data.result)
        })
      .catch(err => console.log("err : ", err))
   }, [])
   const gotoWordSearch = () =>{
     
      Axios.get('http://34.87.80.48:3000/irregular?word='+ textSearch)
      .then((res) => {
        setVerbs(res.data.data.result)
      })
      .catch(err => console.log("err :",err))
     
   }
   const handleClear = () => {
    setText("")
  }
   return(
    <View style={{paddingLeft : 15 ,paddingRight : 15}}>
      <View style={styles.input}>
        <FontAwesome name="search" color="#0077b3"  size={20} style={{paddingRight :10 , paddingLeft : 10, paddingTop : 20,paddingBottom : 20}}/>
        <TextInput  placeholder=" nhập từ cần tra" value={textSearch} onChangeText={ (text) => setText(text)} onSubmitEditing={gotoWordSearch} style={styles.textInput}/>
        {textSearch !== "" && <Ionicons name="md-close" color="#0077b3" size={25} onPress={handleClear} style={{ paddingBottom : 20 , paddingTop : 20}} />}
      </View>
      <View style={styles.around}> 
        <Table>
          <Row data={tableHeader} textStyle={styles.tableHeader}/>
          </Table>
      </View>
      
        <ScrollView style={styles.viewTable}>
          <View  >
            <Table>
              <Rows data={verbs.map(e => Object.values(e))} style={styles.aroundRows} textStyle ={{fontSize: 15}}/>
            </Table>
          </View>
       
        </ScrollView>
    </View>
     
    )
}
const styles = StyleSheet.create({
  around : {
    
    borderWidth : 2,
    borderColor : "#0077b3",
    // borderTopColor : "#0077b3",
    // borderTopWidth : 2,
    borderTopLeftRadius :4,
    borderTopRightRadius : 4,
    paddingTop : 10,
    paddingBottom : 10
  },
  aroundRows : {
    borderBottomWidth : 0.5,
    borderBottomColor : "gray",
    paddingTop : 15,
    paddingLeft: 15,
    paddingBottom : 5
  },
  tableHeader : {
    color : "#0077b3",
    fontSize : 20,
    fontWeight : "bold",
    paddingLeft : 20,
  },
   input : {
     flexDirection : "row",
     marginBottom : 30,
     marginTop : 10 ,
     borderColor : "#0077b3",
     borderWidth : 2 ,
     borderRadius : 4,
     fontSize :  15,
   },
   textInput : {
     width : '83%',
     paddingBottom : 20,
     paddingTop : 20
   },
   viewTable :{
     height : "72%",
     borderWidth : 2,
     borderColor : "#0077b3",
     borderBottomLeftRadius : 4,
     borderBottomRightRadius : 4
   }
})