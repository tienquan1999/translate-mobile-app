import React ,{useState}from "react";
import { View, StyleSheet ,FlatList,Text,ScrollView} from "react-native";
import CardWord from "./CardWord"
export default function ListrecentWords(){
    const [recentWords, setrecentWords]= useState(
        [{ word :"face", proper: "danh tu", mean:"abcxyz", key: "1"},
        { word :"cat", proper: "danh tu", mean:"abcxyz", key: "2"},
        { word :"dog", proper: "danh tu", mean:"abcxyz", key: "3"},
        { word :"dog", proper: "danh tu", mean:"abcxyz", key: "4"},
        { word :"dog", proper: "danh tu", mean:"abcxyz", key: "5"},
        { word :"dog", proper: "danh tu", mean:"abcxyz", key: "6"}
    ]
    );
     return(
         <View>
              
                <View style={styles.list}>
                    <FlatList
                    data={recentWords}
                    renderItem={({item})=>(
                        <CardWord item={item}/>
                    )}
                    />

                </View>
              
         </View>
     )
}
const styles=StyleSheet.create({
    list: {
        marginBottom : 300
    }
})
