import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import SearchOnlineScreen from "../screens/SearchOnlineScreen";
import HomeScreen from '../screens/HomeScreen';
import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="dictionary" color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="SearchOnline"
        component={SearchOnlineScreen}
        options={{
          tabBarLabel: 'Search online',
          tabBarIcon: ({ color, size }) => (
            <Icon name="earth" color={color} size={size}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation;