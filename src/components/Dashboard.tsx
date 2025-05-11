import React from 'react';
import { useInventory } from '../context/InventoryContext';

const Dashboard: React.FC = () => {
  const { products } = useInventory();

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalDelivered = products.reduce((sum, product) => sum + product.delivered, 0);
  const lowStockItems = products.filter(product => product.stock <= 10).length;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Total Stock</h3>
          <p className="text-4xl font-bold text-green-600">{totalStock}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Total Delivered</h3>
          <p className="text-4xl font-bold text-yellow-600">{totalDelivered}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Low Stock Items</h3>
          <p className="text-4xl font-bold text-red-600">{lowStockItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;