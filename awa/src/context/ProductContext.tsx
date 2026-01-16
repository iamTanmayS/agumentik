import React, { createContext, useContext, useEffect, useState } from "react";

import { getProducts } from "../services/api";

const ProductContext = createContext<any>(null);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    
    fetchProducts().finally(() => setLoading(false));

    
    const interval = setInterval(() => {
      fetchProducts();
    }, 1000);

   
    return () => clearInterval(interval);
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
