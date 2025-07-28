// src/Components/ExpertDoctors.jsx

import React, { useEffect, useRef, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ExpertDoctors = () => {
  const doctorSliderRef = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-16 rounded-xl shadow-inner relative">
      <div className="flex justify-between items-center mb-8 relative">
        <h2 className="text-4xl font-bold text-green-700">{t("home.expertsTitle")}</h2>
        <button
          onClick={() => {
            if (doctorSliderRef.current) {
              doctorSliderRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
              });
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md transition absolute right-0 top-40"
          aria-label="Scroll expert doctors right"
        >
          <HiChevronRight size={24} />
        </button>
      </div>

      <div
        ref={doctorSliderRef}
        className="flex overflow-x-auto scroll-smooth space-x-6 pb-4 scrollbar-hide"
      >
        {doctors.map((doc, idx) => (
          <Link to={`/doctor/${doc._id}`} key={idx}>
            <div className="flex-shrink-0 w-[250px] text-center p-6 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100">
              <img
                src={
                  doc.image?.startsWith("http")
                    ? doc.image
                    : `http://localhost:3000${doc.image}`
                }
                alt={`Doctor ${doc.name}`}
                className="rounded-full w-24 h-24 mx-auto mb-4 object-cover border-4 border-green-300"
              />
              <h4 className="text-lg font-semibold text-green-700 mb-1">{doc.name}</h4>
              <p className="text-sm text-gray-600 italic">{doc.designation}</p>
              <p className="text-sm text-gray-500">{doc.university}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExpertDoctors;
