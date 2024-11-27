import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import AuthHeader from './AuthHeader';

const validateLoginInput = (email, password) => {
  if (email.trim() === '' || password.trim() === '') {
    return 'Email dan password tidak boleh kosong.';
  }
  return '';
};

const handleFirebaseLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async (userType) => {
    // Validasi input : fungsi murni
    const validationError = validateLoginInput(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await handleFirebaseLogin(email, password);

      if (userType === 'penjual') {
        navigation.navigate('HomeScreen penjual');
      } else if (userType === 'pembeli') {
        navigation.navigate('HomeScreen pembeli');
      } else {
        Alert.alert('Login Gagal', 'Jenis akun tidak sesuai dengan yang dipilih.');
      }
    } catch (error) {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthHeader 
        onLoginPress={() => navigation.navigate('Login')} 
        onRegisterPress={() => navigation.navigate('Signup')}
        isOnSignupScreen={false}
      />
      <View style={{ marginTop: 30, padding: 20 }}>
        <Text style={{ fontSize: 70, fontWeight: 'bold', textAlign: 'left', marginBottom: 0, color: '#293C8F' }}>
          BELI
        </Text>
        <Text style={{ fontSize: 70, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#293C8F'  }}>
          BEKAS
        </Text>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        />
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Login sebagai Penjual" onPress={() => handleLogin('penjual')} color='#293C8F' />
            <View style={{ height: 10 }} />
            <Button title="Login sebagai Pembeli" onPress={() => handleLogin('pembeli')} color='#293C8F' />
          </>
        )}
      </View>
    </View>
  );
}
