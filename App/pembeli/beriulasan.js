import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; 

const BeriUlasan = ({ route, navigation }) => {
  const { transaksiId } = route.params; 
  const [review, setReview] = useState(''); 

  const handleReviewSubmit = async () => {
    if (!review.trim()) {
      Alert.alert('Peringatan', 'Ulasan tidak boleh kosong.');
      return;
    }

    try {
      const transaksiRef = doc(firestore, 'transactions', transaksiId);

      await updateDoc(transaksiRef, { review: review });

      Alert.alert('Terima Kasih', 'Ulasan Anda telah dikirim.');

      navigation.goBack();
    } catch (error) {
      console.error('Error mengirim ulasan:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengirim ulasan.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beri Ulasan</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Tulis ulasan Anda di sini"
        value={review} 
        onChangeText={setReview} 
        multiline             
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleReviewSubmit}>
        <Text style={styles.buttonText}>Kirim</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 150,
    textAlignVertical: 'top', 
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BeriUlasan;
