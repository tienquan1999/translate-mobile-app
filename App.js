import React from 'react';

import HomeScreen from './src/screens/HomeScreen';
import BoxSearch from './src/components/BoxSearch';
import HeaderDefinitionWord from "./src/components/HeaderDefinitionWord"
import DefinitionScreen from "./src/screens/DefinitionScreen"

import * as MetroConfig from './metro.config'
import { Provider } from 'react-redux';
import { store } from "./store"

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Welcome',
              header: ({navigation}) => <BoxSearch navigation={navigation}/>
            }}
          />
          <Stack.Screen
            name="Word"
            component={DefinitionScreen}
            options={{
              title: 'Word',
              header: ({ navigation}) => {
                return <HeaderDefinitionWord handleBack={() => navigation.goBack()} />
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
