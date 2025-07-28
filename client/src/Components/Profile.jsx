// components/Profile.jsx
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Profile = ({ user, setUser }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <img
        src={user?.photoURL || "https://via.placeholder.com/32"}
        alt="profile"
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-full border-2 border-green-500 cursor-pointer"
      />

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          {/* Modal box */}
          <div className="bg-white dark:bg-gray-800 w-full max-w-sm p-6 rounded-xl shadow-xl relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl"
            >
              ×
            </button>

            <div className="text-center space-y-3">
              <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">
                {user?.displayName || user?.email}
              </h2>

              <Link
                to="/profile/edit"
                onClick={() => setOpen(false)}
                className="block text-sm text-blue-600 hover:underline"
              >
                ✏️ {t("profile.editProfile", "Edit Profile")}
              </Link>

              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="block text-sm text-blue-600 hover:underline"
              >
                📦 {t("profile.allOrders", "View All Orders")}
              </Link>

              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                🚪 {t("auth.logout", "Logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
