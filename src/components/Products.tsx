import  { useState} from 'react';
import { Link} from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';

const Products: React.FC = () => {
  const { products } = useInventory();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [department, setDepartment] = useState('all');
  const [lowStock, setLowStock] = useState(false);
  const [sortBy, setSortBy] = useState('name');





  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <Link to="/products/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Product
        </Link>
      </div>
      <div className="mb-4 flex space-x-4">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Departments</option>
          <option value="kitchen">Kitchen</option>
          <option value="clothing">Clothing</option>
          <option value="toys">Toys</option>
        </select>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={lowStock}
            onChange={(e) => setLowStock(e.target.checked)}
            className="mr-2"
          />
          Low Stock Only
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
          >
            <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{product.department}</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-extrabold text-blue-600">${product.price.toFixed(2)}</p>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.stock <= 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {product.stock <= 10 ? 'Low Stock' : 'In Stock'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;