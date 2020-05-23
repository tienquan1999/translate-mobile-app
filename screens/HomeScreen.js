import React from 'react';
import { StyleSheet, View , Button} from 'react-native';
import { Text } from "native-base"
import BoxSearch from "../components/BoxSearch"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage"
import CardWord from  "../components/CardWord"

export default function HomeScreen(props) {
  return (
    <View>
      <Text style={styles.styleTitle}>Từ điển tra cứu </Text>
      <BoxSwitchLanguage/>
      <BoxSearch/>
      <CardWord/>
      <Button
        title="Go to Word"
        onPress={() => props.navigation.navigate('Word')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  styleTitle: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  }
})