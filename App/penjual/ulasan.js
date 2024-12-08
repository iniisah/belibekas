import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';  

const UlasanScreen = () => {
  const ulasanData = [
    { id: "1", username: "Username Pembeli", review: "Ulasan 1" },
    { id: "2", username: "Username Pembeli", review: "Ulasan 2" },
    { id: "3", username: "Username Pembeli", review: "Ulasan 3" },
    { id: "4", username: "Username Pembeli", review: "Ulasan 4" },
  ];

  const renderUlasanItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      <View style={styles.reviewBox}>
        <Text style={styles.review}>{item.review}</Text>
      </View>
    </View>
  );
  const navigation = useNavigation(); 


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ulasan</Text>
      <FlatList
        data={ulasanData}
        renderItem={renderUlasanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ulasanList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  ulasanList: {
    padding: 10,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewBox: {
    marginTop: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  review: {
    color: "#555",
  },
});

export default UlasanScreen;
