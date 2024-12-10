import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { KeranjangContext } from '../KeranjangContext';

const Keranjang = ({ navigation }) => {
  const { keranjang, hapusDariKeranjang, checkout } = useContext(KeranjangContext);
  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle pemilihan untuk setiap item
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
      await checkout(selectedItems);
      Alert.alert('Checkout Berhasil');
      setSelectedItems([]); // Reset item yang dipilih
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat proses checkout');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack('homeScreen penjual')}
      >
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Keranjang Anda</Text>

      {keranjang.length === 0 ? (
        <Text style={styles.emptyText}>Keranjang masih kosong</Text>
      ) : (
        <FlatList
          data={keranjang}
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
                onPress={() => hapusDariKeranjang(item)}
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
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
    backgroundColor: 'blue',
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
