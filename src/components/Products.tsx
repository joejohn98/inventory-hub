import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useInventory, type Product } from "../context/InventoryContext";
import { Filter, Package, Plus, Search } from "lucide-react";

const Products: React.FC = () => {
  const { products } = useInventory();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [department, setDepartment] = useState("all");
  const [lowStock, setLowStock] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const deptParams = searchParams.get("department");
    if (deptParams) {
      setDepartment(deptParams);
    }
  }, [searchParams]);

  const searchFilter = (product: Product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.sku.toLowerCase().includes(lowerCaseSearchTerm)
    );
  };

  const departmentFilter = (product: Product) => {
    return (
      department === "all" || product.department.toLowerCase() === department
    );
  };

  const stockFilter = (product: Product) => {
    return !lowStock || product.stock <= 10;
  };

  const sortProducts = (a: Product, b: Product) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      comparison = a.price - b.price;
    } else if (sortBy === "stock") {
      comparison = a.stock - b.stock;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  };

  const filterAndSortProducts = (products: Product[]) => {
    return products
      .filter(searchFilter)
      .filter(departmentFilter)
      .filter(stockFilter)
      .sort((a: Product, b: Product) => sortProducts(a, b));
  };

  useEffect(() => {
    setFilteredProducts(filterAndSortProducts(products));
  }, [products, department, lowStock, sortBy, sortOrder, searchTerm]);

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setDepartment("all");
    setLowStock(false);
    setSearchTerm("");
    setSortBy("name");
    setSortOrder("asc");
    navigate("/products");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Products
        </h2>
        <Link
          to="/products/add"
          className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-1.5" />
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-auto md:flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center px-3 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Filter size={18} className="mr-1.5" />
              Filters
            </button>

            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Departments</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="clothing">Clothing</option>
                  <option value="toys">Toys</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleSort("name")}
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      sortBy === "name"
                        ? "bg-teal-50 border-teal-200 text-teal-700"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Name{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                  <button
                    onClick={() => toggleSort("price")}
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      sortBy === "price"
                        ? "bg-teal-50 border-teal-200 text-teal-700"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Price{" "}
                    {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                  <button
                    onClick={() => toggleSort("stock")}
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      sortBy === "stock"
                        ? "bg-teal-50 border-teal-200 text-teal-700"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Stock{" "}
                    {sortBy === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Stock Status
                </label>
                <label className="flex items-center p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={lowStock}
                    onChange={(e) => setLowStock(e.target.checked)}
                    className="mr-2 h-4 w-4 text-teal-500 focus:ring-teal-500 border-slate-300 rounded"
                  />
                  <span className="text-slate-700">Low Stock Only (≤ 10)</span>
                </label>
              </div>
            </div>
          </div>
        )}
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
            onClick={clearFilters}
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
                      ${Number(product.price).toFixed(2)}
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
