import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import axios from "axios";

// Local banner images
import img1 from "../assets/BannerImg/20230410130024-photo-300X370.jpg";
import img2 from "../assets/BannerImg/9f83b73c4b031c212537c28463eba8e9122d4fc61cf0e1f34103710a076b39b6.jpg";
import img3 from "../assets/BannerImg/Agriwb.png";
import img4 from "../assets/BannerImg/Farmer_of_Bangladesh.jpg";
import img5 from "../assets/BannerImg/food-security.jpg";
import img6 from "../assets/BannerImg/NP_Himachal_Pradesh_68_(6348260166).jpg";
import img7 from "../assets/BannerImg/ob_1730990551.jpg";
import Blogs from "../Components/Blogs";

const bannerImages = [img1, img2, img3, img4, img5, img6, img7];

const Home = () => {
  const { t } = useTranslation();
  const bannerSliderRef = useRef(null);
  const doctorSliderRef = useRef(null);
  const [doctors, setDoctors] = useState([]);

  // Auto-scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerSliderRef.current) {
        bannerSliderRef.current.scrollBy({
          left: bannerSliderRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch doctors
  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <div className="space-y-24">
      {/* Banner Section */}
      <section className="w-full overflow-hidden relative">
        <div
          ref={bannerSliderRef}
          className="flex w-full h-[400px] overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {bannerImages.map((image, i) => (
            <div key={i} className="min-w-full h-full flex-shrink-0 snap-center px-2">
              <div className="h-full bg-white rounded-t-2xl overflow-hidden">
                <img src={image} alt={`Banner ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-green-50 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">{t("home.servicesTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { icon: "🦠", label: t("home.services.disease") },
            { icon: "💊", label: t("home.services.fertilizer") },
            { icon: "🌾", label: t("home.services.seasonal") },
            { icon: "⛅", label: t("home.services.weather") },
            { icon: "🧪", label: t("home.services.soilWise") },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">{service.label}</h3>
              <p className="text-gray-600 text-sm">
                {t(`home.services.description${idx + 1}`, "Explore our agricultural tools and insights.")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Doctors Section */}
      <section className=" bg-green-50 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t("home.expertsTitle")}</h2>
        <div className="relative">
          <div
            ref={doctorSliderRef}
            className="flex overflow-x-auto scroll-smooth space-x-4 pb-4"
          >
            {doctors.map((doc, idx) => (
              <Link to={`/doctor/${doc._id}`} key={idx}>
                <div className="flex-shrink-0 w-[250px] text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                  <img
                    src={
                      doc.image?.startsWith("http")
                        ? doc.image
                        : `http://localhost:3000${doc.image}`
                    }
                    alt={`Doctor ${doc.name}`}
                    className="rounded-full w-24 h-24 mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-lg font-semibold text-green-700">{doc.name}</h4>
                  <p className="text-sm text-gray-500">{doc.designation}</p>
                  <p className="text-sm text-gray-500">{doc.university}</p>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={() =>
              doctorSliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-green-100 transition"
          >
            <HiChevronRight className="text-green-700" size={28} />
          </button>
        </div>
      </section>

      {/* Disease Posts Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-6">{t("home.diseaseTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Leaf Spot", "Root Rot", "Powdery Mildew"].map((disease, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">{disease}</h3>
                <p className="text-sm text-gray-600">
                  {t("home.diseaseDescription", `Learn how to identify and treat ${disease.toLowerCase()} in your crops.`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <Blogs />

      {/* Review Section */}
      <section className="bg-green-50 max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t("home.reviewTitle")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-700 italic">
                "{t("home.reviewMessage", "This platform helped me improve crop health and yield!")}"
              </p>
              <div className="mt-4 text-sm font-semibold text-green-700">Farmer #{i}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
