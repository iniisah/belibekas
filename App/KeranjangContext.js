import React, { createContext, useState } from 'react';
import { firestore } from '../firebaseConfig'; // Impor koneksi Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Impor fungsi Firebase Authentication

export const KeranjangContext = createContext();

export const KeranjangProvider = ({ children }) => {
  const [keranjang, setKeranjang] = useState([]); 
  const [riwayat, setRiwayat] = useState([]); 

  const tambahkanKeKeranjang = (item) => {
    setKeranjang((prevKeranjang) => [...prevKeranjang, item]);
  };

  const hapusDariKeranjang = (item) => {
    setKeranjang((prevKeranjang) => prevKeranjang.filter((barang) => barang.nama !== item.nama));
  };

  const checkout = async (selectedItems) => {
    if (selectedItems.length === 0) {
      console.log('No items selected for checkout');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.log('User not authenticated');
        return;
      }

      const transaksi = {
        uid: user.uid,  
        items: selectedItems,
        status: 'Menunggu Konfirmasi',
        timestamp: serverTimestamp(), 
      };

      const transaksiRef = await addDoc(collection(firestore, 'transaksi'), transaksi);

      console.log('Transaksi berhasil disimpan ke database:', transaksiRef.id);

      setKeranjang((prevKeranjang) =>
        prevKeranjang.filter((item) => !selectedItems.includes(item))
      );

      return transaksiRef; 
    } catch (error) {
      console.error('Gagal menyimpan transaksi ke Firestore:', error);
    }
  };

  return (
    <KeranjangContext.Provider
      value={{
        keranjang,
        tambahkanKeKeranjang,
        hapusDariKeranjang,
        checkout,
        riwayat,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
};
