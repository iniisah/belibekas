import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';

//
const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc')); 
        const querySnapshot = await getDocs(q);
        const transaksiList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transaksiList);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        Alert.alert('Gagal', 'Terjadi kesalahan saat memuat transaksi.');
      }
    };

    fetchTransactions();
  }, [db]);

  //pure func
  const handleConfirmOrder = async (orderId) => {
    try {
      const orderRef = doc(db, 'transactions', orderId);
      await updateDoc(orderRef, {
        status: 'telah dikonfirmasi',
      });
      
      //immutability
      setTransactions(transactions.map(transaction =>
        transaction.id === orderId ? { ...transaction, status: 'telah dikonfirmasi' } : transaction
      ));

      Alert.alert('Berhasil', 'Pesanan telah dikonfirmasi!');
    } catch (error) {
      console.error('Error confirming order:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengkonfirmasi pesanan.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Transaksi</Text>

      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada transaksi.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>ID Transaksi: {item.orderId}</Text>
              <Text style={styles.transactionText}>Status: {item.status}</Text>
              <Text style={styles.transactionText}>Total: Rp {item.totalAmount.toLocaleString()}</Text>
              <Text style={styles.transactionText}>Tanggal: {item.createdAt.toDate().toLocaleString()}</Text>

              {item.status === 'menunggu dikonfirmasi' && (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => handleConfirmOrder(item.id)}
                >
                  <Text style={styles.confirmButtonText}>Konfirmasi Pesanan</Text>
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
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  transactionItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  transactionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Transaksi;
