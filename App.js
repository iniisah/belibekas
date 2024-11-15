import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './App/login';
import SignupScreen from './App/signup'; 
import HomeScreenPenjual from './App/penjual/homescreen_penjual';
import HomeScreenPembeli from './App/pembeli/homescreen_pembeli';
import ProfilPembeliScreen from './App/pembeli/profilpbeli';
import keranjang from './App/pembeli/keranjang';
import transaksi from './App/penjual/transaksi';
import profilpenjual from './App/penjual/profilpjual';
import AuthHeader from './App/AuthHeader';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen 
          name="AuthHeader" 
          component={AuthHeader} 
          options={{ headerShown: false }} 
        />
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
        <Stack.Screen 
          name="profil pembeli" 
          component={ProfilPembeliScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="keranjang" 
          component={keranjang} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="transaksi" 
          component={transaksi} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="profil penjual" 
          component={profilpenjual} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}