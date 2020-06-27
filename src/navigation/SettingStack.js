import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import { FavoriteWordScreen } from "../screens/FavoriteWordScreen";
import SettingScreen from "../screens/SettingScreen";
import GrammarScreen from "../screens/GrammarScreen";

const Stack = createStackNavigator();

export default function SettingStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name="FavoriteWord"
        component={FavoriteWordScreen}
        options={{
          title: 'Từ yêu thích của bạn',
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
        }}
      />
       <Stack.Screen
        name="Grammar"
        component={GrammarScreen}
        options={{
          title: 'Ngữ pháp ',
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
        }}
      />
    </Stack.Navigator>
  )
}