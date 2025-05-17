import type React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import {
  ArrowLeft,
  Truck,
  Package,
  Tag,
  DollarSign,
  Store,
  AlertTriangle,
} from "lucide-react";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct } = useInventory();
  const product = products.find((p) => p.id === Number(id));
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveryAmount, setDeliveryAmount] = useState(1);

  if (!product) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center justify-center h-[70vh]">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-md">
          <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-slate-500 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleDelivery = () => {
    setIsDelivering(true);
    setTimeout(() => {
      updateProduct(product.id, {
        delivered: product.delivered + deliveryAmount,
        stock: product.stock + deliveryAmount,
      });
      setIsDelivering(false);
      setDeliveryAmount(1);
    }, 1000);
  };

  return (
    <div className="p-4 md:p-8">
      <button
        onClick={() => navigate("/products")}
        className="mb-6 inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={18} className="mr-1.5" />
        Back to Products
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 lg:p-8">
            <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden mb-6">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x600?text=No+Image";
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-md">
                  {product.department}
                </span>
                <span
                  className={`px-2.5 py-1 text-sm font-medium rounded-md ${
                    product.stock <= 5
                      ? "bg-rose-100 text-rose-700"
                      : product.stock <= 10
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {product.stock <= 5
                    ? "Critical Stock"
                    : product.stock <= 10
                    ? "Low Stock"
                    : "In Stock"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                {product.name}
              </h1>

              <p className="text-slate-600">{product.description}</p>
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Product Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Tag size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">SKU</p>
                      <p className="font-medium text-slate-800">
                        {product.sku}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <DollarSign size={20} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Price</p>
                      <p className="font-medium text-slate-800">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Package size={20} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Stock</p>
                      <p
                        className={`font-medium ${
                          product.stock <= 5
                            ? "text-rose-600"
                            : product.stock <= 10
                            ? "text-amber-600"
                            : "text-slate-800"
                        }`}
                      >
                        {product.stock} units
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Truck size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Delivered</p>
                      <p className="font-medium text-slate-800">
                        {product.delivered} units
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Store size={20} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Supplier</p>
                    <p className="font-medium text-slate-800">
                      {product.supplier}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Record Delivery
                </h3>

                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() =>
                      setDeliveryAmount((prev) => Math.max(1, prev - 1))
                    }
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={deliveryAmount}
                    onChange={(e) =>
                      setDeliveryAmount(
                        Math.max(1, Number.parseInt(e.target.value) || 1)
                      )
                    }
                    className="w-16 text-center p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />

                  <button
                    onClick={() => setDeliveryAmount((prev) => prev + 1)}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleDelivery}
                  disabled={isDelivering}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg shadow-sm transition-colors ${
                    isDelivering
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-teal-500 text-white hover:bg-teal-600"
                  }`}
                >
                  {isDelivering ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Truck size={18} className="mr-1.5" />
                      Record Delivery
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
