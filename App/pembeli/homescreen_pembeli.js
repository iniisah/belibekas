import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 65, fontWeight: 'bold', textAlign: 'center', marginBottom: 0, color: '#f0f0f0' }}>
        BELI
      </Text>
      <Text style={{ fontSize: 65, fontWeight: 'bold', textAlign: 'center', marginBottom: 0, color: '#f0f0f0' }}>
        BEKAS
      </Text>
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Cari..." />
      </View>
      <StatusBar style="auto" />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('keranjang')}>
          <Text style={styles.footerText}>Keranjang</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('transaksi')}>
          <Text style={styles.footerText}>Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('profil pembeli')}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 40, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 12,
  },
  searchBar: {
    height: 40,
    width: 340,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
