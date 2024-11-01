import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login sebagai</Text>
      <Button
        title="Penjual"
        onPress={() => navigation.navigate('HomeScreen penjual')}
      />
      <Button
        title="Pembeli"
        onPress={() => navigation.navigate('HomeScreen pembeli')}
      />
      <StatusBar style="auto" />
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
});
