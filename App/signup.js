import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthHeader from './AuthHeader';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthHeader 
        onLoginPress={() => navigation.navigate('Login')} 
        onRegisterPress={() => navigation.navigate('Signup')}
        isOnSignupScreen={true} 
      />
      <View style={{ padding: 20 }}>
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
        <Button title="Sign Up" onPress={handleSignup} />
      </View>
    </View>
  );
};

export default SignupScreen;
