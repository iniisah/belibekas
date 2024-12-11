import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { firestore } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UlasanScreen = () => {
  const [ulasanData, setUlasanData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUlasan = async () => {
      try {
        const transaksiCollection = collection(firestore, 'transactions');
        
        const q = query(transaksiCollection, where('status', '==', 'Selesai'));
        const transaksiSnapshot = await getDocs(q);

        if (transaksiSnapshot.empty) {
          Alert.alert('Tidak ada ulasan', 'Tidak ada ulasan yang ditemukan.');
          return;
        }

        const ulasanList = transaksiSnapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().userName, 
          review: doc.data().review, 
          orderId: doc.data().orderId || 'Tidak diketahui', 
          items: doc.data().items || [], 
        }));

        setUlasanData(ulasanList);
      } catch (error) {
        console.error('Error fetching ulasan:', error);
        Alert.alert('Gagal', 'Terjadi kesalahan saat mengambil data ulasan.');
      }
    };

    fetchUlasan();
  }, []);

  const renderUlasanItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.orderId}>Pesanan: {item.orderId}</Text>
      {item.items.length > 0 && (
        <View style={styles.itemsContainer}>
          <Text style={styles.itemsHeader}>Item Pesanan:</Text>
          {item.items.map((itm, index) => (
            <Text key={index} style={styles.itemText}>
              {itm.nama} (Rp {itm.harga?.toLocaleString() || '0'})
            </Text>
          ))}
        </View>
      )}
      <View style={styles.reviewBox}>
        <Text style={styles.review}>{item.review}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Ulasan</Text>
      <FlatList
        data={ulasanData}
        renderItem={renderUlasanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ulasanList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  ulasanList: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  orderId: {
    color: "#777",
    fontSize: 14,
    marginVertical: 5,
  },
  itemsContainer: {
    marginTop: 5,
  },
  itemsHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: "#333",
  },
  itemText: {
    color: "#555",
    fontSize: 14,
  },
  reviewBox: {
    marginTop: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  review: {
    color: "#555",
  },
});

export default UlasanScreen;
