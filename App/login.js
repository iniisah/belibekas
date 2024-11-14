// login.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = (userType) => {
    if (email.trim() === '' || password === '') {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const userEmail = userCredential.user.email;

        // Penyesuaian: Hanya memeriksa tipe user tanpa email hardcoded
        if (userType === 'penjual') {
          navigation.navigate('HomeScreen penjual');
        } else if (userType === 'pembeli') {
          navigation.navigate('HomeScreen pembeli');
        } else {
          Alert.alert('Login Gagal', 'Jenis akun tidak sesuai dengan yang dipilih.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error Code:", error.code);
        console.log("Error Message:", error.message);
        Alert.alert('Login Gagal', 'Email atau password salah');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Masuk sebagai</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login sebagai Penjual" onPress={() => handleLogin('penjual')} />
          
          <View style={{ height: 10 }} />

          <Button title="Login sebagai Pembeli" onPress={() => handleLogin('pembeli')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
