import React from 'react';

import * as MetroConfig from './metro.config'
import { Provider } from 'react-redux';
import { store } from "./store"

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/screens/HomeScreen"
import DefinitionScreen from "./src/screens/DefinitionScreen"
import SearchOnlineScreen from "./src/screens/SearchOnlineScreen"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import HeaderDefinitionWord from "./src/components/HeaderDefinitionWord"
import BoxSearch from "./src/components/BoxSearch"

const stackH = createStackNavigator();
const stackS = createStackNavigator();

const HomeStack = () => (
  <stackH.Navigator>
    <stackH.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Welcome',
        header: ({ navigation }) => <BoxSearch navigation={navigation} />
      }}
    />
  </stackH.Navigator>
)
const SearchOnlineStack = () => (
  <stackS.Navigator>
    <stackS.Screen
      name="SearchOnline"
      component={SearchOnlineScreen}
      options={{
        title: 'Dịch Online',
        headerStyle: {
          backgroundColor: '#0077b3',
        },
        headerTitleStyle: {
          color: "#ffffff"
        },
      }}
    />
  </stackS.Navigator>
)

const Tab = createBottomTabNavigator()

const TabsNavigation = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#0077b3',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="dictionary" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchOnline"
      component={SearchOnlineStack}
      options={{
        tabBarLabel: 'Search online',
        tabBarIcon: ({ color, size }) => (
          <Icon name="earth" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
