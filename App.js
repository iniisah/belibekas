// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './App/login';
import HomeScreenPenjual from './App/penjual/homescreen_penjual';
import HomeScreenPembeli from './App/pembeli/homescreen_pembeli';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeScreen penjual" component={HomeScreenPenjual} />
        <Stack.Screen name="HomeScreen pembeli" component={HomeScreenPembeli} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
