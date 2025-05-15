# Inventory Hub 🏢

A modern, responsive inventory management application for tracking products, departments, and stock levels with ease. Built with React, TypeScript, Vite, and Tailwind CSS.

---

## 🚀 Introduction

**Inventory Hub** is designed to help businesses and teams efficiently manage their inventory, monitor stock levels, and organize products by departments. The app provides a clean dashboard, powerful filtering, and easy product management—all in a beautiful, mobile-friendly interface.

---

## 🛠️ Technologies Used

- **React** ⚛️
- **TypeScript** 🟦
- **Vite** ⚡
- **Tailwind CSS** 🎨
- **React Router DOM** 🛣️
- **React Toastify** 🔔
- **Lucide React Icons** 🎯
- **ESLint** 🧹

---

## 🏗️ Project Structure

```
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and icons
│   ├── components/        # UI components (Sidebar, Dashboard, Products, etc.)
│   ├── context/           # React Context for inventory state
│   ├── App.tsx            # Main app component and routing
│   ├── main.tsx           # React entry point
│   └── index.css          # Tailwind CSS import
├── index.html             # HTML entry point
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig*.json         # TypeScript configuration
└── README.md              # Project documentation
```

---

## 📝 Key Features

- **Dashboard Overview** 📊: View total products, stock, delivered items, and low stock alerts at a glance.
- **Department Management** 🗂️: Organize products by departments (Kitchen, Clothing, Toys) and see department stats.
- **Product Management** 📦: Add, view, filter, sort, and search products. See detailed product info and manage deliveries.
- **Responsive Sidebar** 📱: Easy navigation on both desktop and mobile.
- **Low Stock Alerts** 🚨: Instantly spot products that need restocking.
- **Toast Notifications** 🔔: Get instant feedback on actions (add/update products, errors).
- **404 Handling** ❓: Friendly not-found page for invalid routes.

---

## 🖥️ Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/joejohn98/inventory-hub.git
cd inventory-hub

# Install dependencies
npm install
```

### 3. Environment Variables

No custom environment variables are required. The app fetches initial product data from a public mock API.

### 4. Running the Application

#### Development Mode 🛠️

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

#### Production Build 🏗️

```bash
npm run build
npm run preview
```

#### Linting Code 🧹

```bash
npm run lint
```

---

## 💡 Architectural Decisions

- **React Context API** is used for global inventory state management.
- **Vite** provides fast development and optimized builds.
- **Tailwind CSS** ensures rapid, utility-first styling.
- **TypeScript** enforces type safety across the codebase.
- **Component-based structure** for maintainability and scalability.
- **Mock API** is used for demo data; can be replaced with a real backend.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---


