import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct } = useInventory();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div className="p-8">Product not found</div>;
  }

  const handleDelivery = () => {
    updateProduct(product.id, { delivered: product.delivered + 1, stock: product.stock + 1 });
  };

  return (
    <div className="p-8">
      <button onClick={() => navigate('/products')} className="mb-4 text-blue-500 hover:underline">
        &larr; Back to Products
      </button>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/3 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Department:</p>
                <p>{product.department}</p>
              </div>
              <div>
                <p className="font-semibold">Price:</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-semibold">Stock:</p>
                <p className={product.stock <= 10 ? 'text-red-600' : 'text-green-600'}>{product.stock}</p>
              </div>
              <div>
                <p className="font-semibold">SKU:</p>
                <p>{product.sku}</p>
              </div>
              <div>
                <p className="font-semibold">Supplier:</p>
                <p>{product.supplier}</p>
              </div>
              <div>
                <p className="font-semibold">Delivered:</p>
                <p>{product.delivered}</p>
              </div>
            </div>
            <button
              onClick={handleDelivery}
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Record Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;