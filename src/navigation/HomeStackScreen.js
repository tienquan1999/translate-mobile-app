import React from "react"
import { createStackNavigator } from '@react-navigation/stack';

import BoxSearch from '../components/BoxSearch';
import HeaderDefinitionWord from "../components/HeaderDefinitionWord"
import SearchOnlineScreen from "../screens/SearchOnlineScreen";

import HomeScreen from '../screens/HomeScreen';
import DefinitionScreen from "../screens/DefinitionScreen"

const HomeStack = createStackNavigator();

export default function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Welcome',
          header: ({ navigation }) => <BoxSearch navigation={navigation} />
        }}
      />
      <HomeStack.Screen
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
    </HomeStack.Navigator>
  )
}