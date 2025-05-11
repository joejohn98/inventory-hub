import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";

const AddProduct: React.FC = () => {
  const { addProduct } = useInventory();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    department: "",
    description: "",
    price: 0,
    stock: 0,
    sku: "",
    supplier: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({ ...product, delivered: 0 });
    navigate("/products");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block mb-2">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={product.department}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Department</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Clothing">Clothing</option>
            <option value="Toys">Toys</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block mb-2">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sku" className="block mb-2">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="supplier" className="block mb-2">
            Supplier
          </label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            value={product.supplier}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
