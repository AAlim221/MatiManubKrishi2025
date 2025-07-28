import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CommonDisease = ({ t }) => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:3000/common-diseases")
      .then((res) => setDiseases(res.data))
      .catch((err) => {
        console.error("❌ Failed to fetch diseases", err);
        setError("Failed to load diseases. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 400;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-800 to-lime-600 text-transparent bg-clip-text drop-shadow-lg mb-12">
          {t ? t("home.diseaseTitle") : "Common Plant Diseases"}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : diseases.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No diseases found.</p>
        ) : (
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-green-100"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-green-100"
            >
              <FaChevronRight size={20} />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 pb-4"
            >
              {diseases.map((disease, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-80 relative rounded-3xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 group"
                >
                  <img
                    src={disease.image}
                    alt={disease.name}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-4">
                    <h3 className="text-white text-xl sm:text-2xl font-semibold text-center drop-shadow-lg">
                      {disease.name}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-10 transition-all duration-500 mix-blend-screen pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommonDisease;
