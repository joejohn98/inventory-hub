import type React from "react";
import { useInventory } from "../context/InventoryContext";
import { BarChart3, Package, TrendingDown, Truck } from "lucide-react";

const Dashboard: React.FC = () => {
  const { products } = useInventory();

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalDelivered = products.reduce(
    (sum, product) => sum + product.delivered,
    0
  );
   

  const lowStockItems = products.filter(
    (product) => product.stock <= 10
  ).length;
  const totalProducts = products.length;

  const statCards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Package className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: <BarChart3 className="h-8 w-8 text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-200",
      textColor: "text-emerald-700",
    },
    {
      title: "Total Delivered",
      value: totalDelivered,
      icon: <Truck className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems,
      icon: <TrendingDown className="h-8 w-8 text-rose-500" />,
      color: "bg-rose-50 border-rose-200",
      textColor: "text-rose-700",
    },
  ];

  // Get top 5 products with lowest stock
  const lowStockProducts = [...products]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="text-slate-500 text-sm mt-1 md:mt-0">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} border rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  {card.title}
                </p>
                <h3 className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </h3>
              </div>
              <div className="p-2 rounded-lg bg-white shadow-sm">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Low Stock Alert
          </h3>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-md overflow-hidden bg-slate-100">
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {product.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock <= 5
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No low stock items found.</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Department Overview
          </h3>
          <div className="space-y-4">
            {["Kitchen", "Clothing", "Toys"].map((dept) => {
              const deptProducts = products.filter(
                (p) => p.department === dept
              );
              const deptStock = deptProducts.reduce(
                (sum, p) => sum + p.stock,
                0
              );
              const deptPercentage =
                products.length > 0
                  ? Math.round((deptProducts.length / products.length) * 100)
                  : 0;

              return (
                <div key={dept} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-slate-700">{dept}</p>
                    <p className="text-sm text-slate-500">
                      {deptProducts.length} products
                    </p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="bg-teal-500 h-2.5 rounded-full"
                      style={{ width: `${deptPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500">
                    Total stock: {deptStock} items
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
