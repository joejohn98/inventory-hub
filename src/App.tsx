import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";

import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Departments from "./components/Departments";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import { ToastContainer } from "react-toastify";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <>
      <InventoryProvider>
        <Router>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 min-h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products/add" element={<AddProduct />} />
              </Routes>
            </div>
          </div>
        </Router>
          <ToastContainer position="top-right" />
      </InventoryProvider>
    </>
  );
}

export default App;
