import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { KeranjangContext } from '../KeranjangContext';

const DetailBarang = ({ route, navigation }) => {
  const { nama, harga, deskripsi } = route.params;
  const { keranjang, tambahkanKeKeranjang } = useContext(KeranjangContext);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const sudahAda = keranjang.some((item) => item.nama === nama);
    setIsAdded(sudahAda);
  }, [keranjang]);

  const handleAddToCart = async () => {
    const berhasilDitambahkan = await tambahkanKeKeranjang({ nama, harga, deskripsi });
    if (berhasilDitambahkan) {
      setIsAdded(true);
      navigation.navigate('keranjang');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack('homeScreen penjual')}>
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{nama}</Text>      
      <Text style={styles.price}>Rp {harga.toLocaleString()}</Text>
      <Text style={styles.desc}>{deskripsi}</Text>
      
      <TouchableOpacity
        style={[styles.button, isAdded && styles.buttonDisabled]}
        onPress={handleAddToCart}
        disabled={isAdded} 
      >
        <Text style={styles.buttonText}>{isAdded ? 'Sudah di Keranjang' : 'Masukkan ke Keranjang'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
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
  header: {
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  price: { 
    fontSize: 16, 
    color: 'green',
  },
  desc: { 
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: { 
    color: '#fff',
  },
});

export default DetailBarang;
