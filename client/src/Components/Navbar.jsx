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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md transition-colors">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo & Nav Links */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">
            <Link to="/">{t("brandName")}</Link>
          </h1>
          <ul className="hidden md:flex gap-4 text-gray-700 dark:text-gray-200 font-medium">
            <li><Link to="/" className="hover:text-green-600">{t("nav.home")}</Link></li>
            <li><Link to="/market" className="hover:text-green-600">{t("nav.market")}</Link></li>
            <li><Link to="/seasonalcrops" className="hover:text-green-600">{t("nav.seasonalcrops")}</Link></li>
            <li><Link to="/services" className="hover:text-green-600">{t("nav.services")}</Link></li>
            <li><Link to="/plantdiseasedetect" className="hover:text-green-600">{t("nav.diseaseDetect")}</Link></li>
            <li><Link to="/contact" className="hover:text-green-600">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Right: Language, Theme, Auth */}
        <div className="flex items-center gap-4">
          {/* Language Switch */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("bn")}>বাংলা</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" className="p-2" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
          </Button>

          {/* Auth Section */}
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
                <DropdownMenuItem disabled>{user.displayName || user.email}</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  {t("auth.logout") || "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-2 p-2">
              <DropdownMenuItem><Link to="/">{t("nav.home")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/seasonalcrops">{t("nav.seasonalcrops")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/services">{t("nav.services")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/market">{t("nav.market")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/contact">{t("nav.contact")}</Link></DropdownMenuItem>
              {!user && (
                <>
                  <DropdownMenuItem><Link to="/login">{t("auth.login")}</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="/register">{t("auth.register")}</Link></DropdownMenuItem>
                </>
              )}
              {user && (
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
