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

// Profile Modal (inline for simplicity)
const ProfileModal = ({ user, setUser }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <img
        src={user?.photoURL || "https://via.placeholder.com/32"}
        alt="profile"
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-full border-2 border-green-500 hover:ring-2 hover:ring-green-400 cursor-pointer transition-all duration-200"
      />

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 w-full max-w-sm p-6 rounded-xl shadow-xl relative">
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
                to="/allorders"
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

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Dark mode
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
    <header className="sticky top-0 z-50 w-full bg-green-100 dark:bg-green-900 shadow-md border-b border-green-300 dark:border-green-700 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
     
        <div className="flex items-center gap-6">
             {/* Left: Logo and Links
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-wide">
            <Link to="/">{t("brandName", "🌿 KrishiApp")}</Link>
          </h1> */}

          <ul className="hidden md:flex gap-6 text-green-800 dark:text-green-200 font-medium">
            <li><Link to="/" className="hover:text-green-500 transition-colors duration-200">{t("nav.home")}</Link></li>
            <li><Link to="/market" className="hover:text-green-500 transition-colors duration-200">{t("nav.market")}</Link></li>
            <li><Link to="/seasonalcrops" className="hover:text-green-500 transition-colors duration-200">{t("nav.seasonalcrops")}</Link></li>
            <li><Link to="/plantdiseasedetect" className="hover:text-green-500 transition-colors duration-200">{t("nav.diseaseDetect")}</Link></li>
            <li><Link to="/services" className="hover:text-green-500 transition-colors duration-200">{t("nav.services")}</Link></li>
            <li><Link to="/contact" className="hover:text-green-500 transition-colors duration-200">{t("nav.contact")}</Link></li>
            <li><Link to="/about" className="hover:text-green-500 transition-colors duration-200">{t("nav.about")}</Link></li>
          </ul>
        </div>

        {/* Right: Language, Theme, Auth */}
        <div className="flex items-center gap-4">
          {/* Language Switch */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-full transition-colors">
                <Globe className="h-5 w-5 text-green-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("bn")}>বাংলা</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button variant="ghost" className="p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-full transition-colors" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-green-700" />
            )}
          </Button>

          {/* Profile or Auth Buttons */}
          {!user ? (
            <>
              <Button variant="outline" className="hidden md:inline hover:border-green-500 hover:text-green-700 transition">
                <Link to="/login">{t("auth.login")}</Link>
              </Button>
              <Button className="hidden md:inline bg-green-600 hover:bg-green-700 text-white transition">
                <Link to="/register">{t("auth.register")}</Link>
              </Button>
            </>
          ) : (
            <ProfileModal user={user} setUser={setUser} />
          )}

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-full transition">
                <Menu className="h-6 w-6 text-green-700 dark:text-green-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-2 p-2">
              <DropdownMenuItem><Link to="/">{t("nav.home")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/seasonalcrops">{t("nav.seasonalcrops")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/services">{t("nav.services")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/market">{t("nav.market")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/plantdiseasedetect">{t("nav.plantdiseaseDetect")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/diseaseInfoAdd">{t("nav.diseaseInfoAdd")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/contact">{t("nav.contact")}</Link></DropdownMenuItem>
              {!user ? (
                <>
                  <DropdownMenuItem><Link to="/login">{t("auth.login")}</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="/register">{t("auth.register")}</Link></DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={async () => { await signOut(auth); setUser(null); }}>
                  {t("auth.logout", "Logout")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
