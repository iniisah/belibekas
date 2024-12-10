import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { KeranjangContext } from '../KeranjangContext';

const Keranjang = ({ navigation }) => {
  const { keranjang, hapusDariKeranjang } = useContext(KeranjangContext);

  const handleItemPress = (item) => {
    navigation.navigate('detailbrg', { nama: item.nama, harga: item.harga, deskripsi: item.deskripsi });
  };

  const handleDelete = (item) => {
    hapusDariKeranjang(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack('homeScreen penjual')}>
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>KeranjangAnda</Text>
      {keranjang.length === 0 ? (
        <Text style={styles.emptyText}>Keranjang masih kosong</Text>
      ) : (
        <FlatList
          data={keranjang}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
                <Text style={styles.itemText}>{item.nama}</Text>
                <Text style={styles.itemText}>Rp {item.harga.toLocaleString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item)}
              >
                <Text style={styles.deleteText}>Hapus</Text>
              </TouchableOpacity>
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
  },
  itemText: {
    fontSize: 16,
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
});

export default Keranjang;
