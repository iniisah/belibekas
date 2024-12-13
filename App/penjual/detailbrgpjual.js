import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const DetailBarangPjual = ({ route, navigation }) => {
  const { nama, harga, deskripsi } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{nama}</Text>      
      <Text style={styles.price}>Rp {harga.toLocaleString()}</Text>
      <Text style={styles.desc}>{deskripsi}</Text>
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
    marginTop: 40,
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
});

export default DetailBarangPjual;
