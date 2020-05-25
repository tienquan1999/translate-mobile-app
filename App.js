import React from 'react';

import HomeScreen from './src/screens/HomeScreen';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import DefinationScreen from './src/screens/DefinationScreen';
import BoxSearch from './src/components/BoxSearch';
import 'react-native-gesture-handler';

const stack  = createStackNavigator({
  Home: {
    screen: HomeScreen,
     navigationOptions:()=>({
      title: "home",
      header: () => <BoxSearch/>
    })
  },
  Word:{
    screen: DefinationScreen,
    navigationOptions:()=>({
      title: "Word"
    })
  }
},{
  initialRouteName:"Home"
})
export default createAppContainer(stack)