import React, { useState } from 'react';
import { View, TextInput, Button, Text, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, firestore } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import AuthHeader from './AuthHeader';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setBirthdate(new Date());
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format dd-mm-yyyy
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Format tanggal lahir sebelum disimpan
      const formattedBirthdate = formatDate(birthdate);

      await addDoc(collection(firestore, 'users'), {
        userId: userId,
        name: name,
        birthdate: formattedBirthdate, // Menyimpan tanggal dalam format dd-mm-yyyy
        email: email,
        createdAt: new Date().toISOString(),
      });

      // Reset fields setelah berhasil sign up
      resetFields();

      // Navigasi ke halaman Login
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AuthHeader
        onLoginPress={() => navigation.navigate('Login')}
        onRegisterPress={() => navigation.navigate('Signup')}
        isOnSignupScreen={true}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: 30, padding: 20 }}>
          <Text style={{ fontSize: 70, fontWeight: 'bold', textAlign: 'left', marginBottom: 0, color: '#293C8F' }}>
            BELI
          </Text>
          <Text style={{ fontSize: 70, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#293C8F' }}>
            BEKAS
          </Text>
          <Text>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
          />
          <Text>Birthdate</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}>
            <Text>{formatDate(birthdate)}</Text> {/* Tampilkan tanggal dalam format dd-mm-yyyy */}
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
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
          <Button
            title="Sign Up"
            onPress={handleSignup}
            color="#293C8F"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
