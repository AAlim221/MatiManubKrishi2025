import React, { useState } from "react";
import { Button } from "../Components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../Components/ui/Dropdown-menu";
import { Menu, Globe, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md transition-colors">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand & Main Nav */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">
            <Link to="/">{t("brandName")}</Link>
          </h1>
          <ul className="hidden md:flex gap-4 text-gray-700 dark:text-gray-200 font-medium">
            <li className="hover:text-green-600 cursor-pointer">
              <Link to="/">{t("nav.home")}</Link>
            </li>
            <li className="hover:text-green-600 cursor-pointer">
              <Link to="/market">{t("nav.market")}</Link>
            </li>
            <li className="hover:text-green-600 cursor-pointer">
              <Link to="/seasonalcrops">{t("nav.seasonalcrops")}</Link>
            </li>
            <li className="hover:text-green-600 cursor-pointer">
              <Link to="/services">{t("nav.services")}</Link>
            </li>
            <li className="hover:text-green-600 cursor-pointer">
              <Link to="/plantdiseasedetect">{t("nav.diseaseDetect")}</Link>
            </li>
            <li className="hover:text-green-600 cursor-pointer">
              <Link to="/contact">{t("nav.contact")}</Link>
            </li>
          </ul>
        </div>

        {/* Right: Language, Theme, Auth */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
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

          <Button variant="ghost" className="p-2" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>

          <Button variant="outline" className="hidden md:inline">
            <Link to="/login">{t("auth.login")}</Link>
          </Button>
          <Button className="hidden md:inline">
            <Link to="/register">{t("auth.register")}</Link>
          </Button>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2">
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
                <Link to="/contact">{t("nav.contact")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/login">{t("auth.login")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/register">{t("auth.register")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
