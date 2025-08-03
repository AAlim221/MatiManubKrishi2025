import React from 'react';

function AdminHome() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-700">📥 New Messages</h2>
          <p className="text-gray-600">Review and respond to farmer queries.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-700">🛒 Orders</h2>
          <p className="text-gray-600">Track recent and pending orders.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-gray-700">🌾 Crops</h2>
          <p className="text-gray-600">Add or manage crop information.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold text-gray-700">🧪 Diseases</h2>
          <p className="text-gray-600">Manage disease info and treatments.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-pink-500">
          <h2 className="text-xl font-semibold text-gray-700">🧑‍⚕️ Doctors</h2>
          <p className="text-gray-600">Manage expert profiles and availability.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold text-gray-700">📝 Blogs</h2>
          <p className="text-gray-600">Write, update, or remove blog posts.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
