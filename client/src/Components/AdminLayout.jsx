import React, { useState } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function AdminLayout() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const adminEmail = localStorage.getItem("adminEmail");
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    window.location.href = "/admin-login";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white min-h-screen p-4 space-y-4 relative">
        {/* Admin icon and dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <UserCircleIcon className="h-8 w-8 text-white" />
            <span className="text-sm font-medium">Admin</span>
          </button>

          {showDropdown && (
            <div className="absolute mt-2 left-0 bg-white text-black rounded shadow w-48 z-10">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-semibold">👤 {adminEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
              >
                🔓 Logout
              </button>
            </div>
          )}
        </div>

        <h1 className="text-xl font-bold mt-6">🌿 Admin Panel</h1>
        <nav className="space-y-2 mt-4">
          <Link to="/admin" className="block hover:text-yellow-300">Dashboard</Link>
          <Link to="/admin/orders" className="block hover:text-yellow-300">TotalOrders</Link>
          <Link to="/admin/addcrops" className="block hover:text-yellow-300">AddCrops</Link>
          <Link to="/admin/diseaseInfoAdd" className="block hover:text-yellow-300">DiseaseInfoAdd</Link>
          <Link to="/admin/userproblem" className="block hover:text-yellow-300">All UserProblems</Link>
          <Link to="/admin/doctors" className="block hover:text-yellow-300">Doctors</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
