import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Local banner images
import img1 from "../assets/BannerImg/20230410130024-photo-300X370.jpg";
import img2 from "../assets/BannerImg/9f83b73c4b031c212537c28463eba8e9122d4fc61cf0e1f34103710a076b39b6.jpg";
import img3 from "../assets/BannerImg/Agriwb.png";
import img4 from "../assets/BannerImg/Farmer_of_Bangladesh.jpg";
import img5 from "../assets/BannerImg/food-security.jpg";
import img6 from "../assets/BannerImg/NP_Himachal_Pradesh_68_(6348260166).jpg";
import img7 from "../assets/BannerImg/ob_1730990551.jpg";

const bannerImages = [img1, img2, img3, img4, img5, img6, img7];

const Home = () => {
  const { t } = useTranslation();
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: "smooth"
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20">

      {/* Banner Slider */}
      <section className="w-full overflow-hidden relative">
        <div
          ref={sliderRef}
          className="flex w-full h-[400px] overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {bannerImages.map((image, i) => (
            <div
              key={i}
              className="min-w-full h-full flex-shrink-0 snap-center"
            >
              <img
                src={image}
                alt={`Banner ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          {t("home.servicesTitle")}
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[ 
            t("home.services.disease"),
            t("home.services.fertilizer"),
            t("home.services.seasonal"),
            t("home.services.weather"),
            t("home.services.soilWise")
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-6 hover:bg-green-50 transition"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-2">{service}</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-6">{t("home.blogTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-white shadow rounded-lg overflow-hidden">
                <img
                  src={`https://source.unsplash.com/400x250/?plant,farmer,${num}`}
                  alt="Blog"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">Healthy Soil, Healthy Plant</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Discover how healthy soil contributes to sustainable agriculture.
                  </p>
                  <Link to="/blog" className="text-green-600 text-sm font-semibold inline-flex items-center">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Doctors Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t("home.expertsTitle")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Dr. Alam", "Dr. Rumi", "Dr. Kazi"].map((name, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-lg shadow">
              <img
                src={`https://source.unsplash.com/150x150/?doctor,${idx}`}
                alt={name}
                className="rounded-full w-24 h-24 mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-green-700">{name}</h4>
              <p className="text-sm text-gray-500">Plant Disease Specialist</p>
            </div>
          ))}
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
                  Learn how to identify and treat {disease.toLowerCase()} in your crops.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t("home.reviewTitle")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-700 italic">
                "{t("home.reviewMessage")}"
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
