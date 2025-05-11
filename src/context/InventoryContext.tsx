import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export interface Product {
  id: number;
  department: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  supplier: string;
  delivered: number;
  imageUrl: string;
}

interface InventoryContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);



export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://run.mocky.io/v3/a7d24cab-cb3a-4b37-a0d8-8b6a75bf5aee');
            const data = await response.json();
            setProducts(data);
        } catch () {
            toast.error('Failed to fetch products');
        }
    };

    fetchProducts();
}, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
    toast.success('Product updated successfully');
  };

  return (
    <InventoryContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};