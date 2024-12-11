import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Riwayat = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Peringatan', 'Pengguna tidak terautentikasi. Silakan login terlebih dahulu.');
          setLoading(false);
          return;
        }

        const transaksiCollection = collection(firestore, 'transactions');
        const q = query(transaksiCollection, where('userId', '==', user.uid));
        const transaksiSnapshot = await getDocs(q);

        if (transaksiSnapshot.empty) {
          setTransaksi([]);
        } else {
          const transaksiList = transaksiSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTransaksi(transaksiList);
        }
      } catch (error) {
        console.error('Error fetching transaksi:', error);
        Alert.alert('Gagal', 'Terjadi kesalahan saat mengambil data transaksi.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  //immutability
  const selesaikanPesanan = async (id) => {
    try {
      const transaksiRef = doc(firestore, 'transactions', id);
      await updateDoc(transaksiRef, { status: 'Selesai' });
      Alert.alert('Berhasil', 'Pesanan telah diselesaikan.');

      setTransaksi((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'Selesai' } : item
        )
      );
    } catch (error) {
      console.error('Error menyelesaikan pesanan:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyelesaikan pesanan.');
    }
  };

  const handleReview = (id) => {
    navigation.navigate('beri ulasan', { transaksiId: id });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : transaksi.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tidak ada transaksi ditemukan.</Text>
        </View>
      ) : (
        <FlatList
          data={transaksi}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.statusText}>{item.status || 'Tidak Diketahui'}</Text>
              <Text>Order ID: {item.orderId || 'Tidak Diketahui'}</Text>
              <Text>Total Amount: Rp {item.totalAmount ? item.totalAmount.toLocaleString() : '0'}</Text>
              {item.items && Array.isArray(item.items) ? (
                item.items.map((itm, index) => (
                  <View key={index} style={styles.itemDetails}>
                    <Text>Nama: {itm.nama || 'Tidak Diketahui'}</Text>
                    <Text>Harga: Rp {itm.harga ? itm.harga.toLocaleString() : '0'}</Text>
                  </View>
                ))
              ) : (
                <Text>Tidak ada item dalam transaksi ini.</Text>
              )}
              {item.status === 'menunggu dikonfirmasi' && (
                <Text style={styles.pendingText}>Pesanan sedang menunggu konfirmasi.</Text>
              )}
              {item.status === 'telah dikonfirmasi' && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => selesaikanPesanan(item.id)}
                >
                  <Text style={styles.buttonText}>Selesaikan Pesanan</Text>
                </TouchableOpacity>
              )}
              {/* Check if the review already exists */}
              {item.status === 'Selesai' && !item.review && (
                <TouchableOpacity
                  style={styles.reviewButton}
                  onPress={() => handleReview(item.id)}
                >
                  <Text style={styles.buttonText}>Berikan Ulasan</Text>
                </TouchableOpacity>
              )}
              {item.review && (
                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewText}>Ulasan: {item.review}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  itemDetails: {
    marginLeft: 10,
    marginTop: 5,
  },
  statusText: {
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  pendingText: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
  reviewButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  reviewContainer: {
    marginTop: 10,
  },
  reviewText: {
    fontStyle: 'italic',
    color: '#555',
  },
});

export default Riwayat;
