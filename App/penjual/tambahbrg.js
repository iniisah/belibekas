import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Tambahbrg = () => {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [informasiLain, setInformasiLain] = useState('');
  const navigation = useNavigation();
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser; 

  const handleUpload = async () => {
    if (!nama || !harga || !deskripsi) {
      Alert.alert('Error', 'Semua field kecuali Informasi Lain wajib diisi!');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User tidak terautentikasi. Silakan login ulang.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'barang'), {
        nama,
        harga: parseFloat(harga),
        deskripsi,
        informasiLain,
        createdAt: new Date(),
        userId: user.uid,  
      });

      const barangId = docRef.id;

      await updateDoc(docRef, {
        barangId: barangId, 
      });

      Alert.alert('Sukses', `Barang berhasil ditambahkan dengan ID: ${barangId}`);
      navigation.goBack(); 
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Terjadi kesalahan saat menambahkan barang.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Tambah Barang</Text>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />
        <TextInput
          style={styles.input}
          placeholder="Harga"
          value={harga}
          keyboardType="numeric"
          onChangeText={setHarga}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Deskripsi"
          value={deskripsi}
          onChangeText={setDeskripsi}
          multiline
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Informasi Lain"
          value={informasiLain}
          onChangeText={setInformasiLain}
          multiline
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 7,
  },
  boxContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tambahbrg;
