
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { InventoryProvider } from "./context/InventoryContext"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Departments from "./components/Departments"
import Products from "./components/Products"
import AddProduct from "./components/AddProduct"
import ProductDetails from "./components/ProductDetails"
import { useState, useEffect } from "react"

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <InventoryProvider>
      <Router>
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
          {isMobile && (
            <div className="bg-slate-800 p-4 flex justify-between items-center shadow-md">
              <h1 className="text-xl font-bold text-white">Inventory App</h1>
              <button
                onClick={toggleMobileMenu}
                className="text-white p-2 rounded-md hover:bg-slate-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}

          <Sidebar isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} isMobile={isMobile} />

          <div className="flex-1 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/:id" element={<ProductDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="shadow-lg rounded-lg"
      />
    </InventoryProvider>
  )
}
