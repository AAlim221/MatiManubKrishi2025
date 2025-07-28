// src/Components/Services.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: "🦠",
      label: t("home.services.disease"),
      link: "/plantdiseasedetect",
    },
    {
      icon: "💊",
      label: t("home.services.fertilizer"),
      link: "/fertilizer",
    },
    {
      icon: "🌾",
      label: t("home.services.seasonal"),
      link: "/seasonalcrops",
    },
    {
      icon: "⛅",
      label: t("home.services.weather"),
      link: "/weather-alerts",
    },
    {
      icon: "🧪",
      label: t("home.services.soilWise"),
      link: "/soil",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-16 rounded-xl shadow-inner">
      <h2 className="text-4xl font-bold text-green-700 mb-12 text-center tracking-wide">
        {t("home.servicesTitle")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <Link to={service.link} key={idx}>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 hover:bg-green-100 transition-all duration-300 text-center border-t-4 border-green-500 cursor-pointer">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {service.label}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(
                  `home.services.description${idx + 1}`,
                  "Explore our agricultural tools and insights."
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
