// src/pages/Register.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {!user ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
            onClick={register}
          >
            Register
          </button>
          <div className="text-center text-gray-500">or</div>
          <button
            className="bg-red-500 text-white px-4 py-2 w-full rounded hover:bg-red-600"
            onClick={loginWithGoogle}
          >
            Continue with Google
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold">{user.displayName || user.email}</h3>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-black"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Register;
