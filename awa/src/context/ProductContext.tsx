import React, { createContext, useContext, useEffect, useState } from "react";

import { getProducts } from "../services/api";
import { io } from "socket.io-client";

const ProductContext = createContext<any>(null);
const socket = io("https://agumentik-0t7m.onrender.com", {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));

    socket.on('stockUpdate', (updatedProducts) => {
      setProducts(updatedProducts);
    });

    return () => {
      socket.off('stockUpdate');
    };
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
