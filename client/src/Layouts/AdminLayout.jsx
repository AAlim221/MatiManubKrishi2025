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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold">🌿 Admin Panel</h1>
        <nav className="space-y-2 mt-4">
          <Link to="/admin" className="block hover:text-yellow-300">Dashboard</Link>
          <Link to="/admin/orders" className="block hover:text-yellow-300">All Orders</Link>
          <Link to="/admin/addcrops" className="block hover:text-yellow-300">AddCrops</Link>
          <Link to="/admin/diseaseInfoAdd" className="block hover:text-yellow-300">Disease Information Add</Link>
          <Link to="/admin/userproblem" className="block hover:text-yellow-300">All Farmers Problems</Link>
          <Link to="/admin/doctors" className="block hover:text-yellow-300"> Our Doctors</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between border-b">
          <p className="text-2xl font-bold text-green-700">👩‍🌾 Admin Dashboard</p>

          {/* Admin Profile Icon with Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <UserCircleIcon className="h-8 w-8 text-green-700" />
              <span className="text-sm font-medium text-green-800">Admin</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-52 z-10">
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
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
