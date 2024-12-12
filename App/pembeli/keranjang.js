import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { KeranjangContext } from '../KeranjangContext';
import { getAuth } from 'firebase/auth'; // Import Firebase authentication
import { getFirestore, collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const Keranjang = ({ navigation }) => {
  const { keranjang, hapusDariKeranjang, checkout } = useContext(KeranjangContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredKeranjang, setFilteredKeranjang] = useState([]);

  const auth = getAuth();
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;

  const db = getFirestore();

  useEffect(() => {
    if (currentUserUID) {
      const filteredItems = keranjang.filter(item => item.uid === currentUserUID);
      setFilteredKeranjang(filteredItems);
    }
  }, [keranjang, currentUserUID]);

  //pure function
  const toggleSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      Alert.alert('Peringatan', 'Silakan pilih item untuk checkout!');
      return;
    }

    try {
      const orderId = `ORDER-${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`;

      const transactionData = {
        userId: currentUserUID,
        items: selectedItems,
        totalAmount: selectedItems.reduce((total, item) => total + item.harga, 0),
        orderId: orderId,
        status: 'menunggu dikonfirmasi', 
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'transactions'), transactionData);

      setSelectedItems([]);
      Alert.alert('Checkout Berhasil', `Pesanan Anda telah berhasil dibuat.`);

      selectedItems.forEach(item => hapusDariKeranjang(item));

    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat proses checkout');
      console.error(error);
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      const itemRef = doc(db, 'keranjang', `${item.uid}_${item.barangId}`);
      await deleteDoc(itemRef);

      hapusDariKeranjang(item);

      Alert.alert('Berhasil', 'Barang berhasil dihapus dari keranjang');
    } catch (error) {
      console.error('Error hapus barang:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menghapus barang');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Keranjang Anda</Text>

      {filteredKeranjang.length === 0 ? (
        <Text style={styles.emptyText}>Keranjang masih kosong</Text>
      ) : (
        <FlatList
          data={filteredKeranjang}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => toggleSelection(item)}
              >
                <Text style={styles.itemText}>{item.nama}</Text>
                <Text style={styles.itemText}>Rp {item.harga.toLocaleString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(item)}  
              >
                <Text style={styles.deleteText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {selectedItems.length > 0 && (
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout ({selectedItems.length} item)</Text>
        </TouchableOpacity>
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
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
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
  itemContainer: {
    flex: 3,
    paddingLeft: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Keranjang;
