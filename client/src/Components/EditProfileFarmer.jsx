import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfileFarmer = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  // fetched by UID
  const [extra, setExtra] = useState({});  // fetched by email
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user by UID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${uid}`);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
        alert("User not found");
        setLoading(false);
      }
    };

    if (uid && uid !== ":uid") fetchUser();
  }, [uid]);

  // ✅ Fetch full profile info by email
  useEffect(() => {
    const fetchExtra = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`http://localhost:3000/admin/${user.email}`);
          setExtra(res.data || {});
        } catch (err) {
          console.error("❌ Failed to fetch full profile:", err);
        }
      }
    };

    fetchExtra();
  }, [user]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Submit changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/users/${uid}`, user);
      alert("✅ Profile updated successfully!");
      navigate("/profile"); // change if needed
    } catch (err) {
      console.error("❌ Failed to update profile", err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center p-6">⏳ Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">✏️ Edit Profile</h2>

      {/* ✅ Profile image */}
      {user.profileImage && (
        <div className="flex justify-center mb-4">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover ring-2 ring-green-500"
          />
        </div>
      )}

      {/* ✅ Role & Extra Info */}
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 mb-5">
        <p><strong>Role:</strong> {extra?.role || user.role || "N/A"}</p>
        {extra?.specialization?.length > 0 && (
          <p><strong>Specialization:</strong> {extra.specialization.join(", ")}</p>
        )}
        {extra?.contact?.phone && (
          <p><strong>Phone:</strong> {extra.contact.phone}</p>
        )}
      </div>

      {/* ✅ Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            readOnly
            className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        {/* Gender */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileFarmer;
