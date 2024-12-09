import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Transaksi = () => {
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      name: 'Barang 1',
      hargaAsli: 'Rp. 1.000.000',
      hargaNego: 'Rp. 900.000',
    },
    {
      id: 2,
      name: 'Barang 2',
      hargaAsli: 'Rp. 500.000',
      hargaNego: 'Rp. 450.000',
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>〱</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Request List</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80' }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>Harga Asli: {item.hargaAsli}</Text>
              <Text style={styles.price}>Harga Nego: {item.hargaNego}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton}>
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    marginRight: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#F44336',
    paddingVertical: 8,
    marginLeft: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Transaksi;
