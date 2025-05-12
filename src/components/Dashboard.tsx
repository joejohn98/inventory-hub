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
    </div>
  );
};

export default Dashboard;
