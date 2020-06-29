import React from "react"
import { createStackNavigator } from '@react-navigation/stack';

import BoxSearch from '../components/BoxSearch';
import HeaderDefinitionWord from "../components/HeaderDefinitionWord"
import SearchOnlineScreen from "../screens/SearchOnlineScreen";
import HeaderSearchOnline from "../components/HeaderSearchOnline"

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
          header: ({navigation}) => <BoxSearch navigation={navigation} />
        }}
      />
      <HomeStack.Screen
        name="Word"
        component={DefinitionScreen}
        options={({route, navigation}) => ({
          title: route.params.wordMeaning.data.word,
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
          route:{route},
          navigation:{navigation},
          headerRight: () => {
            return (<HeaderDefinitionWord navigation={navigation} route={route} />)
          }
        })}
      />
    </HomeStack.Navigator>
  )
}