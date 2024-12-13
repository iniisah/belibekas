import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeranjangProvider } from './App/KeranjangContext';

import LoginScreen from './App/login';
import SignupScreen from './App/signup';
import HomeScreenPenjual from './App/penjual/homescreen_penjual';
import HomeScreenPembeli from './App/pembeli/homescreen_pembeli';
import ProfilPembeliScreen from './App/pembeli/profilpbeli';
import keranjang from './App/pembeli/keranjang';
import riwayat from './App/pembeli/riwayat';
import detailbrg from './App/pembeli/detailbrg';
import beriulasan from './App/pembeli/beriulasan';
import transaksi from './App/penjual/transaksi';
import profilpenjual from './App/penjual/profilpjual';
import editprofilpbli from './App/pembeli/editprofil';
import editprofilpjual from './App/penjual/editprofil2';
import ulasan from './App/penjual/ulasan';
import tambahbrg from './App/penjual/tambahbrg';
import detailbrgpjual from './App/penjual/detailbrgpjual';
import AuthHeader from './App/AuthHeader';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <KeranjangProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name="AuthHeader" component={AuthHeader} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen penjual" component={HomeScreenPenjual} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen pembeli" component={HomeScreenPembeli} options={{ headerShown: false }} />
          <Stack.Screen name="profil pembeli" component={ProfilPembeliScreen} options={{ headerShown: false }} />
          <Stack.Screen name="keranjang" component={keranjang} options={{ headerShown: false }} />
          <Stack.Screen name="detailbrg" component={detailbrg} options={{ headerShown: false }} />
          <Stack.Screen name="riwayat" component={riwayat} options={{ headerShown: false }} />
          <Stack.Screen name="transaksi" component={transaksi} options={{ headerShown: false }} />
          <Stack.Screen name="profil penjual" component={profilpenjual} options={{ headerShown: false }} />
          <Stack.Screen name="edit profil pembeli" component={editprofilpbli} options={{ headerShown: false }} />
          <Stack.Screen name="edit profil penjual" component={editprofilpjual} options={{ headerShown: false }} />
          <Stack.Screen name="ulasan" component={ulasan} options={{ headerShown: false }} />
          <Stack.Screen name="tambah barang" component={tambahbrg} options={{ headerShown: false }} />
          <Stack.Screen name="beri ulasan" component={beriulasan} options={{ headerShown: false }} />
          <Stack.Screen name="detail barang pjual" component={detailbrgpjual} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeranjangProvider>
  );
}
