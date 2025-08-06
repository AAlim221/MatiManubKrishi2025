import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorLayout() {
  const navigate = useNavigate();
  const doctorInfo = JSON.parse(localStorage.getItem('doctorInfo'));
  const [showSidebar, setShowSidebar] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('doctorInfo');
    toast.success("Logged out successfully");
    navigate('/admin-login-doctor');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (fixed left) */}
      {showSidebar && (
        <aside className="w-64 bg-green-800 text-white flex-shrink-0 flex flex-col p-4 space-y-4">
          <h2 className="text-2xl font-bold mb-6">👨‍⚕️ Doctor Panel</h2>

          <NavLink to="/admindoctor" className="hover:bg-blue-600 px-3 py-2 rounded">
            🏠 Home
          </NavLink>
          <NavLink to="/admindoctor/doctorwork" className="hover:bg-blue-600 px-3 py-2 rounded">
            🛠️ Work Panel
          </NavLink>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Header (fixed top inside main) */}
        <header className="flex justify-between items-center bg-emerald-400 px-6 py-4 shadow-md z-10">
          <div className="flex items-center gap-3">
            <button
              className="text-2xl text-blue-700 md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <FiMenu />
            </button>
            <h1 className="text-xl font-bold text-blue-700">
              Welcome, {doctorInfo?.name || 'Doctor'}
            </h1>
          </div>
          <button
            title="Logout"
            onClick={() => setShowConfirm(true)}
            className="text-red-600 hover:text-red-800 text-xl"
          >
            <FiLogOut />
          </button>
        </header>

        {/* Scrollable content below header */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg space-y-4 max-w-sm w-full">
            <h2 className="text-lg font-bold">Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorLayout;
