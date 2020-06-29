import React, { useState, useEffect } from "react"
import {View, Text, StyleSheet} from "react-native"
import Axios from "axios";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import {Table, Row, Rows} from "react-native-table-component"
import { Icon } from "native-base";
import {Ionicons} from "@expo/vector-icons"
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
        <Icon name="search" color="#0077b3" style={{paddingRight :10}}/>
        <TextInput  placeholder=" nhập từ cần tra" value={textSearch} onChangeText={ (text) => setText(text)} onSubmitEditing={gotoWordSearch}/>
        {textSearch !== "" && <Ionicons name="md-close-circle-outline" size={30} style={styles.iconClose} onPress={handleClear} />}
      </View>
      <View style={styles.around}> 
        <Table>
          <Row data={tableHeader} textStyle={styles.tableHeader}/>
          </Table>
      </View>
      
        <ScrollView>
          <View >
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
    
    borderBottomWidth : 2,
    borderBottomColor : "#0077b3",
    borderTopColor : "#0077b3",
    borderTopWidth : 2,
    paddingTop : 10,
    paddingBottom : 10
  },
  aroundRows : {
    borderBottomWidth : 0.5,
    borderBottomColor : "gray",
    paddingTop : 15,
    paddingLeft: 15,
  },
  tableHeader : {
    color : "#003366",
    fontSize : 20,
    fontWeight : "bold",
    paddingLeft : 20,
  },
   input : {
     flexDirection : "row",
     marginBottom : 50,
     marginTop : 20 ,
     borderBottomColor : "#0077b3",
     borderBottomWidth : 1 ,
     fontSize :  15,
   }
})