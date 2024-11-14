// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './App/login';
import SignupScreen from './App/signup';  // Pastikan pathnya benar
import HomeScreenPenjual from './App/penjual/homescreen_penjual';
import HomeScreenPembeli from './App/pembeli/homescreen_pembeli';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        {/* Semua komponen Screen harus dimasukkan di sini */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomeScreen penjual" 
          component={HomeScreenPenjual} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomeScreen pembeli" 
          component={HomeScreenPembeli} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
