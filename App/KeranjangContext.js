import React, { createContext, useState } from 'react';

export const KeranjangContext = createContext();

export const KeranjangProvider = ({ children }) => {
  const [keranjang, setKeranjang] = useState([]);

  const tambahkanKeKeranjang = (item) => {
    setKeranjang((prevKeranjang) => [...prevKeranjang, item]);
  };

  const hapusDariKeranjang = (item) => {
    setKeranjang((prevKeranjang) => prevKeranjang.filter((barang) => barang.nama !== item.nama));
  };

  return (
    <KeranjangContext.Provider
      value={{
        keranjang,
        tambahkanKeKeranjang,
        hapusDariKeranjang,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
};
