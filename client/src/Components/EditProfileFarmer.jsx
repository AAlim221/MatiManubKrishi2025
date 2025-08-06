import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfileFarmer = () => {
  const { uid } = useParams(); 
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${uid}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        alert("User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/users/${uid}`, user);
      alert("✅ Profile updated!");
      navigate("/profile"); // 🔁 or redirect to home/profile
    } catch (err) {
      console.error("❌ Failed to update user", err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center p-6">⏳ Loading...</p>;
  if (!user) return <p className="text-red-500 text-center">User not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6">✏️ Edit Farmer Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={user.name || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email (read-only)</label>
          <input
            name="email"
            value={user.email || ""}
            readOnly
            className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={user.gender || "unspecified"}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="unspecified">Unspecified</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileFarmer;
