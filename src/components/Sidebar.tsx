import React from "react";

import { Link } from "react-router-dom";

import { LayoutDashboard, BoxesIcon, ShoppingBag } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Inventory App</h1>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <LayoutDashboard size={20} />

              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/departments"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <BoxesIcon size={20} />

              <span>Departments</span>
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <ShoppingBag size={20} />

              <span>Products</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
