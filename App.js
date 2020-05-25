import React from 'react';

import HomeScreen from './screens/HomeScreen';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import DefinationScreen from './screens/DefinationScreen';
import BoxSearch from './components/BoxSearch';

const stack  = createStackNavigator({
  Home: {
    screen: HomeScreen,
     navigationOptions:()=>({
      title: "home",
      header: <BoxSearch/>
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