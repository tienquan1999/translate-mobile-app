import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchOnlineScreen from "../screens/SearchOnlineScreen"

/*screen Search online stack */
const SearchStack = createStackNavigator();

const SearchOnlineStack = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
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
  </SearchStack.Navigator>
)

export {
    SearchOnlineStack
}