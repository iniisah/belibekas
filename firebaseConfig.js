import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyBLIjeS64ethOdD9PwlDCFQ5j1B2g5UG9k",
  authDomain: "beli-bekas.firebaseapp.com",
  projectId: "beli-bekas",
  storageBucket: "beli-bekas.firebasestorage.app",
  messagingSenderId: "908456781941",
  appId: "1:908456781941:web:4355f8b62d08c0fc68b03c",
  measurementId: "G-KNTR24PDTL"
};

const app = initializeApp(firebaseConfig);

let auth;
if (!getAuth()) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) 
  });
} else {
  auth = getAuth(); 
}

const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
