import React from 'react';

import HomeScreen from './screens/HomeScreen';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import DefinationScree from './screens/DefinationScreen';

const stack  = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:()=>({
      title:"Home"
    })
  },
  Word:{
    screen: DefinationScree,
    navigationOptions:()=>({
      title: "Word"
    })
  }
},{
  initialRouteName:"Home"
})
export default createAppContainer(stack)