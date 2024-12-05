import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';  

const ProfilPembeliScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    birthdate: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          let docRef = doc(db, 'users', user.uid);
          let docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserInfo({
              name: docSnap.data().name || 'Tidak Tersedia',
              birthdate: docSnap.data().birthdate || 'Tidak Tersedia',
              email: docSnap.data().email || user.email,
            });
          } else {
            const userQuery = query(
              collection(db, 'users'),
              where('userId', '==', user.uid)
            );
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              setUserInfo({
                name: userData.name || 'Tidak Tersedia',
                birthdate: userData.birthdate || 'Tidak Tersedia',
                email: userData.email || user.email,
              });
            } else {
              console.log('No document matches the UID!');
            }
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No user logged in.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth, db]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil Pengguna</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nama:</Text>
        <Text style={styles.value}>{userInfo.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tanggal Lahir:</Text>
        <Text style={styles.value}>{userInfo.birthdate}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userInfo.email}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('edit profil pembeli')}>
        <Text style={styles.editButtonText}>Ubah Informasi Pribadi</Text>
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  editButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfilPembeliScreen;
