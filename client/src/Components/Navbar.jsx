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

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // Handle Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Load dark mode preference
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md transition-colors">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo and Navigation Links */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">
            <Link to="/">{t("brandName")}</Link>
          </h1>
          <ul className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
            <li>
              <Link to="/" className="hover:text-green-600">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to="/market" className="hover:text-green-600">
                {t("nav.market")}
              </Link>
            </li>
            <li>
              <Link to="/seasonalcrops" className="hover:text-green-600">
                {t("nav.seasonalcrops")}
              </Link>
            </li>
            <li>
              <Link to="/plantdiseasedetect" className="hover:text-green-600">
                {t("nav.plantdiseaseDetect")}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-green-600">
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Language, Theme, Auth */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-2"
                aria-label="Toggle Language"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("bn")}>
                বাংলা
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            className="p-2"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>

          {/* Auth Buttons / User Avatar */}
          {!user ? (
            <>
              <Button variant="outline" className="hidden md:inline">
                <Link to="/login">{t("auth.login")}</Link>
              </Button>
              <Button className="hidden md:inline">
                <Link to="/register">{t("auth.register")}</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={user.photoURL || "https://via.placeholder.com/32"}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-green-500"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  {user.displayName || user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  {t("auth.logout") || "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden p-2"
                aria-label="Mobile Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-2 p-2">
              <DropdownMenuItem>
                <Link to="/">{t("nav.home")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/seasonalcrops">{t("nav.seasonalcrops")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/services">{t("nav.services")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/market">{t("nav.market")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/plantdiseasedetect">
                  {t("nav.plantdiseaseDetect")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/diseaseInfoAdd">{t("nav.diseaseInfoAdd")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/contact">{t("nav.contact")}</Link>
              </DropdownMenuItem>
              {!user ? (
                <>
                  <DropdownMenuItem>
                    <Link to="/login">{t("auth.login")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/register">{t("auth.register")}</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={handleLogout}>
                  {t("auth.logout") || "Logout"}
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
