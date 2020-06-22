import React, { useState, useEffect } from 'react';

import * as MetroConfig from './metro.config'
import { Provider } from 'react-redux';
import { store } from "./store"

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from "./src/navigation/BottomTab";
import Loading from "./src/components/Loading";
 

export default function App() {

  const[isLoading ,setLoading]= useState(false);

  // performTimeConsuming = async() =>{
  //   return new Promise((resolve) =>
  //   setTimeout (
  //     () => {
  //       resolve('result')},
  //       2000
  //   ));
  // }
  //  useEffect(() =>{
  //    SplashScreen.preventAutoHideAsync();
  //  })
  
  // if(isLoading){
  //   return <Loading/>
  // }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab/>
      </NavigationContainer>
    </Provider>
  )

}
 