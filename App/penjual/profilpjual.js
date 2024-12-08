import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const handleLogout = () => {
  Alert.alert(
    "Konfirmasi",
    "Apakah yakin ingin keluar?",
    [
      {
        text: "Tidak",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel"
      },
      {
        text: "Ya",
        onPress: () => navigation.navigate('Signup') 
      }
    ]
  );
};
const ProfilpenjualScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    birthdate: '',
    email: '',
  });
  const [reviews, setReviews] = useState([]);
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
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      }
    };

    const fetchReviews = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const reviewsQuery = query(
            collection(db, 'reviews'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(reviewsQuery);
          const reviewsData = querySnapshot.docs.map(doc => doc.data());
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };

    fetchUserData();
    fetchReviews();
    setLoading(false);
  }, [auth, db]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack('homeScreen penjual')}>
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Profil Pengguna</Text>
      <View style={styles.boxContainer}>
        <Text style={styles.boxHeader}>DATA PRIBADI</Text>
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
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('edit profil penjual')}>
          <Text style={styles.editButtonText}>Ubah Informasi Pribadi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.boxHeader}>REVIEW</Text>
        <Text style={styles.rating}>Rating Rata-rata: {averageRating.toFixed(1)} ★</Text>
        <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('ulasan')}>
          <Text style={styles.reviewButtonText}>Lihat Ulasan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top:20,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginTop:40,
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  boxHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
    marginTop: 20,
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
  logoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  reviewButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
});

export default ProfilpenjualScreen;
