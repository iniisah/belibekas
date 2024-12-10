import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

const Riwayat = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const transaksiCollection = collection(firestore, 'transaksi');
        const q = query(transaksiCollection, where('uid', '==', user.uid));
        const transaksiSnapshot = await getDocs(q);

        if (transaksiSnapshot.empty) {
          Alert.alert('Info', 'Tidak ada transaksi ditemukan.');
        }

        const transaksiList = transaksiSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransaksi(transaksiList);
      } catch (error) {
        console.error('Error fetching transaksi:', error);
        Alert.alert('Gagal', 'Terjadi kesalahan saat mengambil data transaksi.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  const selesaikanPesanan = async (id) => {
    try {
      const transaksiRef = doc(firestore, 'transaksi', id);
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

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={transaksi}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.statusText}>Status: {item.status || 'Tidak Diketahui'}</Text>
              {item.items && Array.isArray(item.items) ? (
                item.items.map((itm, index) => (
                  <View key={index} style={styles.itemDetails}>
                    <Text>{itm.nama || 'Nama Tidak Diketahui'}</Text>
                    <Text>Harga: Rp {itm.harga ? itm.harga.toLocaleString() : '0'}</Text>
                  </View>
                ))
              ) : (
                <Text>Tidak ada item dalam transaksi ini.</Text>
              )}
              {item.status === 'Telah Dikonfirmasi' && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => selesaikanPesanan(item.id)}
                >
                  <Text style={styles.buttonText}>Selesaikan Pesanan</Text>
                </TouchableOpacity>
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Riwayat;
