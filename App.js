import React, { useState, useEffect } from 'react';

import * as MetroConfig from './metro.config'
import { Provider } from 'react-redux';
import { store } from "./store"

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from "./src/navigation/BottomTab";
import Loading from "./src/components/Loading";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';



export default function App() {

  const[isLoading ,setLoading]= useState(true);

  // performTimeConsuming = async() =>{
  //   return new Promise((resolve) =>
  //   setTimeout (
  //     () => {
  //       resolve('result')},
  //       2000
  //   ));
  // }
  //  useEffect(async() =>{
  //   const data =  await performTimeConsuming();
  //   if(data!== null)
  //   {
  //     setLoading(false)
  //   }
  //  })
  
  // if(isLoading){
  //   return <Loading/>
  // }
  useEffect(()=>{
    const fontNativeBase = async() =>{
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    }
    fontNativeBase()
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab/>
      </NavigationContainer>
    </Provider>
  )

}
 