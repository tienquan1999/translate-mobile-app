import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import SearchOnlineScreen from "../screens/SearchOnlineScreen";
import HomeScreen from '../screens/HomeScreen';
import 'react-native-gesture-handler';
import StackNavigation from "../navigations/StackNavigation"
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0077b3',
      }}
      options={{headerShown: false}}
    >
      <Tab.Screen
        name="Home"
        component={StackNavigation}
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