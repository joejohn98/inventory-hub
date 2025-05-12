
import type React from "react"
import { useNavigate } from "react-router-dom"
import { useInventory } from "../context/InventoryContext"
import { ChefHat, Shirt, Gamepad2 } from "lucide-react"

const Departments: React.FC = () => {
  const navigate = useNavigate()
  const { products } = useInventory()

  const departments = [
    {
      name: "Kitchen",
      icon: <ChefHat size={32} className="text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
      hoverColor: "hover:bg-amber-100",
      textColor: "text-amber-800",
    },
    {
      name: "Clothing",
      icon: <Shirt size={32} className="text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-200",
      hoverColor: "hover:bg-indigo-100",
      textColor: "text-indigo-800",
    },
    {
      name: "Toys",
      icon: <Gamepad2 size={32} className="text-rose-500" />,
      color: "bg-rose-50 border-rose-200",
      hoverColor: "hover:bg-rose-100",
      textColor: "text-rose-800",
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Departments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const deptProducts = products.filter((p) => p.department === dept.name)
          const totalStock = deptProducts.reduce((sum, p) => sum + p.stock, 0)

          return (
            <div
              key={dept.name}
              className={`${dept.color} border rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${dept.hoverColor} hover:shadow-md cursor-pointer group`}
              onClick={() => navigate(`/products?department=${dept.name.toLowerCase()}`)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-lg bg-white shadow-sm">{dept.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${dept.textColor} bg-white`}>
                    {deptProducts.length} products
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">{dept.name}</h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Stock:</span>
                    <span className="font-medium text-slate-800">{totalStock} items</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Low Stock Items:</span>
                    <span className="font-medium text-slate-800">
                      {deptProducts.filter((p) => p.stock <= 10).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">View Products</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      
    </div>
  )
}

export default Departments;