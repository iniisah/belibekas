import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfilScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true); 
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userQuery = query(
            collection(db, 'users'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setName(userData.name || '');
            setBirthdate(userData.birthdate ? new Date(userData.birthdate) : new Date());
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

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSave = async () => {
    if (!name.trim() || !birthdate) {
      Alert.alert('Error', 'Nama dan Tanggal Lahir harus diisi!', [{ text: 'OK' }]);
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        const userQuery = query(
          collection(db, 'users'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;

          const formattedBirthdate = formatDate(birthdate);

          await updateDoc(userDocRef, {
            name: name.trim(),
            birthdate: formattedBirthdate, 
          });

          Alert.alert('Sukses', 'Data berhasil disimpan!', [{ text: 'OK' }]);

          setName('');
          setBirthdate(new Date()); 

          navigation.goBack();
        } else {
          Alert.alert('Error', 'Dokumen pengguna tidak ditemukan!', [{ text: 'OK' }]);
        }
      } catch (error) {
        console.error('Error updating user data:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data.', [{ text: 'OK' }]);
      }
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    if (selectedDate) {
      setBirthdate(selectedDate);
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
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={birthdate ? birthdate.toLocaleDateString() : ''}
            editable={false}
            placeholder="Pilih tanggal lahir"
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthdate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
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
