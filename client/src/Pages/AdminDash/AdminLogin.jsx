import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/admin-login", {
        email,
        password,
      });

      if (res.data.success) {
        const check = await axios.get(`http://localhost:3000/api/check-admin/${email}`);
        if (check.data.isAdmin) {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin");
        } else {
          setError("Access denied: You are not an admin.");
        }
      } else {
        setError("Access denied: Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700">🔐 Admin Login</h2>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login as Admin
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Not an admin?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Go back to user login
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
