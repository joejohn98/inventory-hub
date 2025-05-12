
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInventory } from "../context/InventoryContext"
import { ArrowLeft, Save, X } from "lucide-react"

const AddProduct: React.FC = () => {
  const { addProduct } = useInventory()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    department: "",
    description: "",
    price: 0,
    stock: 0,
    sku: "",
    supplier: "",
    imageUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!product.name.trim()) newErrors.name = "Name is required"
    if (!product.department) newErrors.department = "Department is required"
    if (!product.description.trim()) newErrors.description = "Description is required"
    if (product.price <= 0) newErrors.price = "Price must be greater than 0"
    if (product.stock < 0) newErrors.stock = "Stock cannot be negative"
    if (!product.sku.trim()) newErrors.sku = "SKU is required"
    if (!product.supplier.trim()) newErrors.supplier = "Supplier is required"
    if (!product.imageUrl.trim()) newErrors.imageUrl = "Image URL is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API delay
    setTimeout(() => {
      addProduct({ ...product, delivered: 0 })
      setIsSubmitting(false)
      navigate("/products")
    }, 1000)
  }

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
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Add New Product</h2>
          <p className="text-slate-500 mt-1">Fill in the details to add a new product to inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.name ? "border-rose-300 bg-rose-50" : "border-slate-200"
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="mt-1 text-sm text-rose-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">
                  Department <span className="text-rose-500">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={product.department}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.department ? "border-rose-300 bg-rose-50" : "border-slate-200"
                  }`}
                >
                  <option value="">Select Department</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Toys">Toys</option>
                </select>
                {errors.department && <p className="mt-1 text-sm text-rose-500">{errors.department}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.description ? "border-rose-300 bg-rose-50" : "border-slate-200"
                  }`}
                  placeholder="Enter product description"
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700 mb-1">
                  Image URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.imageUrl ? "border-rose-300 bg-rose-50" : "border-slate-200"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && <p className="mt-1 text-sm text-rose-500">{errors.imageUrl}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">
                    Price <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                        errors.price ? "border-rose-300 bg-rose-50" : "border-slate-200"
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-rose-500">{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-1">
                    Stock <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    min="0"
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                      errors.stock ? "border-rose-300 bg-rose-50" : "border-slate-200"
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="mt-1 text-sm text-rose-500">{errors.stock}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1">
                  SKU <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.sku ? "border-rose-300 bg-rose-50" : "border-slate-200"
                  }`}
                  placeholder="Enter SKU"
                />
                {errors.sku && <p className="mt-1 text-sm text-rose-500">{errors.sku}</p>}
              </div>

              <div>
                <label htmlFor="supplier" className="block text-sm font-medium text-slate-700 mb-1">
                  Supplier <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={product.supplier}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.supplier ? "border-rose-300 bg-rose-50" : "border-slate-200"
                  }`}
                  placeholder="Enter supplier name"
                />
                {errors.supplier && <p className="mt-1 text-sm text-rose-500">{errors.supplier}</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X size={18} className="inline-block mr-1.5" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg shadow-sm transition-colors ${
                isSubmitting
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400 inline-block"
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} className="inline-block mr-1.5" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct;