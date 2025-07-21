import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Add Product", path: "/admin/addproduct" },
  { label: "Add Crops", path: "/admin/addcrops" },
  // Add more as needed
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden sm:block">
        <div className="p-4 text-2xl font-bold text-green-700 border-b">
          Admin Panel
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-green-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-green-700">Admin Dashboard</h1>
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-green-600 transition"
          >
            ⬅ Back to Site
          </Link>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
