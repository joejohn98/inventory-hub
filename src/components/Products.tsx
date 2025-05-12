import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { Package } from "lucide-react";

const Products: React.FC = () => {
  const { products } = useInventory();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [department, setDepartment] = useState("all");
  const [lowStock, setLowStock] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const deptParams = searchParams.get("department");
    if (deptParams) {
      setDepartment(deptParams);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products]; // Create a copy to avoid mutating original array

    // Apply department filter if not 'all'
    if (department !== "all") {
      filtered = filtered.filter(
        (p) => p.department.toLowerCase() === department.toLowerCase()
      );
    }

    // Apply low stock filter if checked
    if (lowStock) {
      filtered = filtered.filter((p) => p.stock <= 10);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "stock") return a.stock - b.stock;
      return 0;
    });

    setFilteredProducts(sorted);
  }, [products, department, lowStock, sortBy]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <Link
          to="/products/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
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
       {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Package size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            No products found
          </h3>
          <p className="text-slate-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button

            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              <div className="relative aspect-square bg-slate-50">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x400?text=No+Image";
                  }}
                />
                {product.stock <= 10 && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded-md">
                    Low Stock
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                    {product.department}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-auto space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Price:</span>
                    <span className="font-semibold text-slate-800">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Stock:</span>
                    <span
                      className={`font-semibold ${
                        product.stock <= 10
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
