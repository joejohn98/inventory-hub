
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, BoxesIcon, ShoppingBag, X } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  toggleMenu: () => void
  isMobile: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleMenu, isMobile }) => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const sidebarClasses = isMobile
    ? `fixed inset-0 z-50 w-72 bg-slate-900 text-white p-4 shadow-xl transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`
    : "w-[20%] h-screen bg-slate-800 text-white p-4 sticky top-0"

  const navItems = [
    { path: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/departments", icon: <BoxesIcon size={20} />, label: "Departments" },
    { path: "/products", icon: <ShoppingBag size={20} />, label: "Products" },
  ]


  return (
    <div className={sidebarClasses}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Inventory Hub<h1>
        {isMobile && (
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-slate-700 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        )}
      </div>

      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path} >
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-slate-700 text-white font-medium"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
                onClick={isMobile ? toggleMenu : undefined}
              >
                <span className={`${isActive(item.path) ? "text-teal-400" : "text-slate-400"}`}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-sm text-slate-300 mb-2">Need help?</p>
          <a href="#" className="text-teal-400 text-sm hover:underline">
            View Documentation
          </a>
        </div>
      </div>

    </div>
  )
}

export default Sidebar;