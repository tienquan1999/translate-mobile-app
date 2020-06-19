import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import HeaderSearchOnline from '../components/HeaderSearchOnline';
import BoxSearch from '../components/BoxSearch';
import HeaderDefinitionWord from "../components/HeaderDefinitionWord"
import HomeScreen from '../screens/HomeScreen';
import DefinitionScreen from "../screens/DefinitionScreen"
import SearchOnlineScreen from "../screens/SearchOnlineScreen"
import 'react-native-gesture-handler';
import BottomNavigation from "./BottomNavigation";

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Welcome',
          header: ({ navigation }) => <BoxSearch navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="Word"
        component={DefinitionScreen}
        options={{
          title: 'Word',
          header: ({ navigation, scene }) => {
            const title = scene.route.params.wordMeaning.data.word;
            return <HeaderDefinitionWord handleBack={() => navigation.goBack()} navigation={navigation} title={title} />
          }
        }}
      />
      <Stack.Screen
        name="SearchOnline"
        component={SearchOnlineScreen}
        options={{
          title: "Dịch online",
          header: ({ navigation }) => {
            return <HeaderSearchOnline handleBack={() => navigation.goBack()} title="Dịch online" />
          }
        }}
      />
    </Stack.Navigator>
  );
}
export default StackNavigation;