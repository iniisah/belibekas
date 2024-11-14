// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; // Menambahkan autentikasi
import { getFirestore } from "firebase/firestore"; // Menambahkan Firestore jika perlu
import { getStorage } from "firebase/storage"; // Jika perlu menggunakan storage
import AsyncStorage from '@react-native-async-storage/async-storage'; // Impor AsyncStorage

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLIjeS64ethOdD9PwlDCFQ5j1B2g5UG9k",
  authDomain: "beli-bekas.firebaseapp.com",
  projectId: "beli-bekas",
  storageBucket: "beli-bekas.firebasestorage.app",
  messagingSenderId: "908456781941",
  appId: "1:908456781941:web:4355f8b62d08c0fc68b03c",
  measurementId: "G-KNTR24PDTL"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Auth dengan persistensi menggunakan AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Menambahkan AsyncStorage untuk persistensi
});

// Ekspor layanan Firebase yang akan digunakan
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
