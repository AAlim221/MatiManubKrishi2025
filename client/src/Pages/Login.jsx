// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider
} from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Go to home/dashboard
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const loginWithEmail = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <form onSubmit={loginWithEmail} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login with Email
          </button>
        </form>

        <div className="text-center text-gray-500">or</div>

        <button
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={loginWithGoogle}
        >
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600">
  Don't have an account?{" "}
  <a href="/register" className="text-blue-600 hover:underline">
    Register here
  </a>
</p>

<p className="text-sm text-center text-gray-600">
  Admin?{" "}
  <a href="/admin" className="text-green-600 hover:underline">
    Login here
  </a>
</p>

      </div>
    </div>
  );
}

export default Login;
