import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './HomeStackScreen';

import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import SettingScreen from '../screens/SettingScreen';
import SearchOnlineScreen from '../screens/SearchOnlineScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000000',
      }}
      options={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Tra từ ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="dictionary" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchOnline"
        component={SearchOnlineScreen}
        options={{
          tabBarLabel: 'Dịch online',
          tabBarIcon: ({ color, size }) => (
            <Icon name="earth" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Icon name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}