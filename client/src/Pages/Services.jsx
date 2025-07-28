import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function Services() {
  const { t, i18n } = useTranslation();

  const aiServices = [
    {
      title: t('servicesPage.aiServices.0.title'),
      description: t('servicesPage.aiServices.0.description'),
      path: '/plantdiseasedetect',
    },
    {
      title: t('servicesPage.aiServices.1.title'),
      description: t('servicesPage.aiServices.1.description'),
      path: '/allcrops',
    },
    {
      title: t('servicesPage.aiServices.2.title'),
      description: t('servicesPage.aiServices.2.description'),
      path: '/soiladvisor',
    },
    {
      title: t('servicesPage.aiServices.3.title'),
      description: t('servicesPage.aiServices.3.description'),
      path: '/soil',
    },
    {
      title: t('servicesPage.aiServices.4.title'),
      description: t('servicesPage.aiServices.4.description'),
      path: '/contact',
    },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto bg-gradient-to-br from-green-50 to-white">
      <h1 className="text-4xl font-extrabold text-center text-green-700 mb-6 animate-fade-in">
        {t("servicesPage.title")}
      </h1>

      <p className="text-center text-gray-600 mb-10 text-lg max-w-2xl mx-auto animate-slide-up">
        {t("servicesPage.description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiServices.map((service, index) => (
          <Link
            key={index}
            to={service.path}
            className="bg-white border border-green-100 hover:border-green-400 shadow-md rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <h2 className="text-xl font-bold text-green-800 mb-2 group-hover:text-green-900">
              {service.title}
            </h2>
            <p className="text-gray-700 group-hover:text-gray-900 text-sm leading-relaxed">
              {service.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center text-sm text-gray-500 italic animate-pulse">
        {t("servicesPage.disclaimer")}
      </div>
    </div>
  );
}

export default Services;
