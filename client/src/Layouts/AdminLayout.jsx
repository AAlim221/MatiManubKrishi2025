import React, { useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function AdminLayout() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  // ✅ Navigate to admin profile page
  const navigateToProfile = () => {
    setShowProfileDropdown(false);
    navigate("/admin/profile");
  };

  // ✅ Redirect non-admins
  if (!isAdmin) return <Navigate to="/admin-login" replace />;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold">🌿 Admin Panel</h1>
        <nav className="space-y-2 mt-4">
          <NavLink to="/admin" className={({ isActive }) => isActive ? "block text-yellow-300 font-bold" : "block hover:text-yellow-300"}>Dashboard</NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "block text-yellow-300 font-bold" : "block hover:text-yellow-300"}>All Orders</NavLink>
          <NavLink to="/admin/doctors" className={({ isActive }) => isActive ? "block text-yellow-300 font-bold" : "block hover:text-yellow-300"}>Our Doctors</NavLink>
          <NavLink to="/admin/all-crops-details" className={({ isActive }) => isActive ? "block text-yellow-300 font-bold" : "block hover:text-yellow-300"}>All Crops</NavLink>
          <NavLink to="/admin/diseaseinfoai" className={({ isActive }) => isActive ? "block text-yellow-300 font-bold" : "block hover:text-yellow-300"}>Disease Info</NavLink>
          <NavLink to="/admin/userproblem" className={({ isActive }) => isActive ? "block text-yellow-300 font-bold" : "block hover:text-yellow-300"}>Farmers’ Problems</NavLink>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between border-b">
          <p className="text-2xl font-bold text-green-700">👩‍🌾 Admin Dashboard</p>

          {/* Profile Dropdown */}
          <div className="relative admin-dropdown text-left">
            <button
              onClick={() => setShowProfileDropdown(prev => !prev)}
              className="flex flex-col items-center focus:outline-none"
            >
              <UserCircleIcon className="w-10 h-10 text-green-700" />
              <span className="text-xs font-semibold text-green-700 mt-1">
                Admin
              </span>
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                <button
                  onClick={navigateToProfile}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  👤 Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
                >
                  🔓 Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-6 min-h-[calc(100vh-72px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
