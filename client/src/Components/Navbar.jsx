import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../Components/ui/Dropdown-menu";
import { Menu, Globe, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

// 🔒 Logout Modal
const LogoutConfirmModal = ({ show, onClose, setUser }) => {
  const handleConfirm = async () => {
    await signOut(auth);
    setUser(null);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Logout</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// 👤 Profile Modal Component
const ProfileModal = ({ user, setUser, setShowLogout }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [extra, setExtra] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`http://localhost:3000/admin/${user.email}`);
          setExtra(res.data || {});
        } catch (err) {
          console.error("❌ Failed to load profile details:", err);
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  return (
    <>
      <img
        src={user?.photoURL || extra.profileImage || "https://via.placeholder.com/32"}
        alt="profile"
        onClick={() => {
          setOpen(true);
          setShowFull(false);
        }}
        className="w-8 h-8 rounded-full border-2 border-green-500 hover:ring-2 hover:ring-green-400 cursor-pointer transition-all duration-200"
      />

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1e293b] text-white w-full max-w-sm p-6 rounded-xl shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-red-400 text-2xl"
            >
              ×
            </button>

            <div className="text-center space-y-3">
              <img
                src={user?.photoURL || extra.profileImage || "https://via.placeholder.com/100"}
                alt="User"
                className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-green-500"
              />
              <h2 className="text-xl font-semibold text-green-400">
                {user?.displayName || extra.name || user?.email}
              </h2>
              <p className="text-sm text-gray-300">{user?.email}</p>

              {/* Always shown */}
              <div className="text-left text-sm mt-4 space-y-1 text-white">
                <p><strong>🔥 Name:</strong> {extra.name || "Not set"}</p>
                <p><strong>📧 Email:</strong> {user?.email}</p>
                <p><strong>🔐 Role:</strong> {extra.role || "farmer"}</p>

                {/* Show only if showFull is true */}
                {showFull && (
                  <>
                    <p><strong>🧍 Gender:</strong> {extra.gender || "unspecified"}</p>
                    <p><strong>📞 Phone:</strong> {extra.phone || "N/A"}</p>
                    <p><strong>🕒 Joined:</strong> {extra.createdAt ? new Date(extra.createdAt).toLocaleDateString() : "Unknown"}</p>
                  </>
                )}

                {!showFull && (
                  <button
                    onClick={() => setShowFull(true)}
                    className="text-green-300 hover:underline mt-2"
                  >
                    🔍 Show Profile Details
                  </button>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <Link
                  to="/editprofile/:uid"
                  onClick={() => setOpen(false)}
                  className="block text-blue-400 hover:underline"
                >
                  ✏️ Edit Profile
                </Link>
                <Link
                  to="/allorders"
                  onClick={() => setOpen(false)}
                  className="block text-blue-400 hover:underline"
                >
                  📦 View All Orders
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowLogout(true);
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-2"
                >
                  📕 লগআউট
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// 🌐 Navbar Component
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#c7ddc9] dark:bg-green-900 shadow-md border-b border-green-300 dark:border-green-700 transition-colors">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <ul className="hidden md:flex gap-6 text-green-900 dark:text-green-100 font-medium">
            <li><Link to="/" className="hover:text-green-500">{t("nav.home")}</Link></li>
            <li><Link to="/market" className="hover:text-green-500">{t("nav.market")}</Link></li>
            <li><Link to="/seasonalcrops" className="hover:text-green-500">{t("nav.seasonalcrops")}</Link></li>
            <li><Link to="/plantdiseasedetect" className="hover:text-green-500">{t("nav.diseaseDetect")}</Link></li>
            <li><Link to="/services" className="hover:text-green-500">{t("nav.services")}</Link></li>
            <li><Link to="/contact" className="hover:text-green-500">{t("nav.contact")}</Link></li>
            <li><Link to="/about" className="hover:text-green-500">{t("nav.about")}</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-full">
                  <Globe className="h-5 w-5 text-green-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("bn")}>বাংলা</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-full" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-green-700" />}
            </Button>

            {!user ? (
              <>
                <Button variant="outline" className="hidden md:inline">
                  <Link to="/login">{t("auth.login")}</Link>
                </Button>
                <Button className="hidden md:inline bg-green-600 hover:bg-green-700 text-white">
                  <Link to="/register">{t("auth.register")}</Link>
                </Button>
              </>
            ) : (
              <ProfileModal user={user} setUser={setUser} setShowLogout={setShowLogout} />
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="md:hidden p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-full">
                  <Menu className="h-6 w-6 text-green-700 dark:text-green-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Link to="/">{t("nav.home")}</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/market">{t("nav.market")}</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/seasonalcrops">{t("nav.seasonalcrops")}</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/plantdiseasedetect">{t("nav.diseaseDetect")}</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/services">{t("nav.services")}</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/contact">{t("nav.contact")}</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/about">{t("nav.about")}</Link></DropdownMenuItem>
                {!user ? (
                  <>
                    <DropdownMenuItem><Link to="/login">{t("auth.login")}</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to="/register">{t("auth.register")}</Link></DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => setShowLogout(true)}>
                    {t("auth.logout", "Logout")}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>

      <LogoutConfirmModal show={showLogout} onClose={() => setShowLogout(false)} setUser={setUser} />
    </>
  );
};

export default Navbar;
