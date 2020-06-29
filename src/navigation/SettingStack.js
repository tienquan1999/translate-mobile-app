import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import { FavoriteWordScreen } from "../screens/FavoriteWordScreen";
import SettingScreen from "../screens/SettingScreen";
import GrammarScreen from "../screens/GrammarScreen";
import TopicWordScreen from "../screens/TopicWordScreen";
import ItemTopicScreen from "../screens/ItemTopicScreen"
import ChildFirstOfGrammar from "../screens/ChildFirstOfGrammar";
import ChildSecondOfGrammar from "../screens/ChildSecondOfGrammar";
import TestScreen from "../screens/TestScreen";
import WordType from "../screens/WordType";

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
      <Stack.Screen
        name="Topic"
        component={TopicWordScreen}
        options={{
          title: 'Từ vựng ',
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
        name="ItemTopic"
        component={ItemTopicScreen}
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
        })}
      />
      <Stack.Screen
        name="ChildFirst"
        component={ChildFirstOfGrammar}
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
        })}
      />
      <Stack.Screen
        name="ChildSecond"
        component={ChildSecondOfGrammar}
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
        })}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={({route}) => ({
          title: "Bài Test",
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
        })}
      />
      <Stack.Screen
        name="WordType"
        component={WordType}
        options={({route}) => ({
          title: "Động từ bất quy tắc",
          headerStyle: {
            backgroundColor: '#0077b3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color:"#ffffff"
          },
        })}
      />
    </Stack.Navigator>
  )
}