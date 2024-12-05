//masih error



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const EditProfilScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid); 
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name || '');
            setBirthdate(userData.birthdate || '');
          } else {
            console.log('No user data found!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [auth, db]);

  const handleSave = async () => {
    // Validate inputs
    if (!name || !birthdate) {
      Alert.alert('Error', 'Nama dan Tanggal Lahir harus diisi!', [{ text: 'OK' }]);
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          name: name,
          birthdate: birthdate,
        });

        Alert.alert('Sukses', 'Data berhasil disimpan!', [{ text: 'OK' }]);
        navigation.goBack();
      } catch (error) {
        console.error('Error updating user data: ', error);
        Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data.', [{ text: 'OK' }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profil Pembeli</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Masukkan nama"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tanggal Lahir:</Text>
        <TextInput
          style={styles.input}
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="Masukkan tanggal lahir"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
    fontSize: 16,
    color: '#555',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfilScreen;
