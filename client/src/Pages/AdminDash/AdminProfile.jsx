import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProfile() {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");

  // 👇 Replace this with your actual admin email (or pass it via props or context)
  const adminEmail = "mahdea@gmail.com";

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/${adminEmail}`);
        const photo = res.data.photoUrl || "https://i.ibb.co/tKyc3DR/admin-avatar.png";
        setAdminData({ ...res.data, photoUrl: photo });
      } catch (err) {
        setError("Failed to fetch admin data.");
        console.error("❌ Axios error:", err.message);
      }
    };

    fetchAdmin();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading admin profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-xl overflow-hidden p-8">
      <div className="flex flex-col items-center">
        <img
          src={adminData.photoUrl}
          alt="Admin Avatar"
          className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md"
        />
        <h1 className="mt-4 text-2xl font-bold text-green-700">{adminData.name}</h1>
        <p className="text-sm text-gray-500">{adminData.email}</p>
      </div>

      <div className="mt-6 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">🆔 ID:</span>
          <span>{adminData._id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">🧩 Role:</span>
          <span>{adminData.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">✅ Admin:</span>
          <span>{adminData.isAdmin ? "Yes" : "No"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">📅 Joined:</span>
          <span>{new Date(adminData.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
