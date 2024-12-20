import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Higher-Order Function filter harga
const filterByPrice = (minHarga, maxHarga) => (item) =>
  item.harga >= minHarga && item.harga <= maxHarga;

// Higher-Order Function filter nama
const filterByName = (query) => (item) =>
  item.nama.toLowerCase().includes(query.toLowerCase());

//immutability
export default function App({ navigation }) {
  const [barang, setBarang] = useState([]); 
  const [filteredBarang, setFilteredBarang] = useState([]); 
  const [maxHarga, setMaxHarga] = useState(1000000);
  const [minHarga, setMinHarga] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false); 
  const db = getFirestore(); 
  const auth = getAuth(); 

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'barang'));
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userId !== auth.currentUser?.uid) {
            items.push({ id: doc.id, ...data });
          }
        });
        setBarang(items);
        setFilteredBarang(items); 
      } catch (error) {
        console.error('Error fetching barang:', error);
      }
    };

    fetchBarang();
  }, [auth]);

  const applyFilters = () => {
    const filters = [filterByPrice(minHarga, maxHarga), filterByName(searchQuery)];
    const filtered = filters.reduce((acc, filter) => acc.filter(filter), barang);
    setFilteredBarang(filtered);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    applyFilters();
  };

  const handleFilter = () => {
    applyFilters();
    setFilterVisible(false);
  };

  const resetFilters = () => {
    setMinHarga(0);
    setMaxHarga(1000000);
    setSearchQuery('');
    setFilteredBarang(barang); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Cari..."
          value={searchQuery}
          onChangeText={handleSearchChange}
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.inputFilter}
            placeholder="Min Harga"
            keyboardType="numeric"
            value={minHarga.toString()}
            onChangeText={(value) => setMinHarga(Number(value) || 0)}
          />
          <TextInput
            style={styles.inputFilter}
            placeholder="Max Harga"
            keyboardType="numeric"
            value={maxHarga.toString()}
            onChangeText={(value) => setMaxHarga(Number(value) || 0)}
          />
          <TouchableOpacity style={styles.applyButton} onPress={handleFilter}>
            <Text style={styles.applyButtonText}>Terapkan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={resetFilters}>
            <Text style={styles.applyButtonText}>Hapus Filter</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredBarang}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('detailbrg', {
                nama: item.nama,
                harga: item.harga,
                deskripsi: item.deskripsi,
                informasiLain: item.informasiLain,
              })
            }
          >
            <Text style={styles.itemName}>{item.nama}</Text>
            <Text style={styles.itemPrice}>Rp {item.harga.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('keranjang')}
        >
          <Text style={styles.footerText}>Keranjang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('riwayat')}
        >
          <Text style={styles.footerText}>Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('profil pembeli')}
        >
          <Text style={styles.footerText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  filterButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#007AFF',
    padding: 6,
    borderRadius: 5,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  filterContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 4,
    zIndex: 10,
  },
  inputFilter: {
    height: 35,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  applyButton: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  applyButtonText: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  footerButton: {
    padding: 10,
  },
  footerText: {
    color: '#007AFF',
    fontSize: 14,
  },
});
