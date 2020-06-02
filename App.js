import React from 'react';

import HomeScreen from './src/screens/HomeScreen';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import DefinationScreen from './src/screens/DefinationScreen';
import BoxSearch from './src/components/BoxSearch';
import HeaderDefinitionWord from "./src/components/HeaderDefinitionWord"
import 'react-native-gesture-handler';
import * as MetroConfig from "./metro.config"

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
      title: "Word",
      header: ({sence,previous, navigation}) =>{
          const title = navigation.getParam('word', "Word")
          return <HeaderDefinitionWord title={title} handleBack={() => navigation.goBack()}/>
      }
    })
  }
},{
  initialRouteName:"Home"
})
export default createAppContainer(stack)