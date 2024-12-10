import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

const Transaksi = () => {
  const navigation = useNavigation();
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const transaksiCollection = collection(firestore, 'transaksi');
        const transaksiSnapshot = await getDocs(transaksiCollection);

        const transaksiList = transaksiSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransaksi(transaksiList);
      } catch (error) {
        console.error('Error saat memuat transaksi:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat memuat transaksi.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  const konfirmasiTransaksi = async (id) => {
    try {
      const transaksiRef = doc(firestore, 'transaksi', id);
      await updateDoc(transaksiRef, { status: 'Telah Dikonfirmasi' });
      Alert.alert('Berhasil', 'Transaksi berhasil dikonfirmasi.');

      setTransaksi((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'Telah Dikonfirmasi' } : item
        )
      );
    } catch (error) {
      console.error('Error saat mengonfirmasi transaksi:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengonfirmasi transaksi.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Daftar Transaksi</Text>

      {loading ? (
        <Text style={styles.loadingText}>Memuat data...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {transaksi.length > 0 ? (
            transaksi.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/80' }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.itemName}>{item.items?.[0]?.nama || 'Nama Barang'}</Text>
                  <Text style={styles.price}>
                    Harga: Rp {item.items?.[0]?.harga?.toLocaleString() || '0'}
                  </Text>
                  <Text style={styles.status}>
                    Status: {item.status || 'Belum Konfirmasi'}
                  </Text>
                  <View style={styles.buttonContainer}>
                    {item.status !== 'Telah Dikonfirmasi' && (
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => konfirmasiTransaksi(item.id)}
                      >
                        <Text style={styles.buttonText}>Konfirmasi</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Belum ada transaksi yang ditemukan.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  status: {
    fontSize: 14,
    marginTop: 5,
    color: '#28a745',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 30,
  },
});

export default Transaksi;
