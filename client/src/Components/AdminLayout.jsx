import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex">
      <aside className="w-64 bg-green-700 text-white min-h-screen p-4 space-y-4">
        <h1 className="text-xl font-bold mb-6">🌿 Admin Panel</h1>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-yellow-300">Dashboard</Link>
          <Link to="/admin/orders" className="block hover:text-yellow-300">TotalOrders</Link>
          <Link to="/admin/addcrops" className="block hover:text-yellow-300">AddCrops</Link>
          <Link to="/admin/diseaseInfoAdd" className="block hover:text-yellow-300">DiseaseInfoAdd</Link>
          <Link to="/admin/userproblem" className="block hover:text-yellow-300">All UserProblems</Link>
          
          <Link to="/admin/doctors" className="block hover:text-yellow-300">Doctors</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
