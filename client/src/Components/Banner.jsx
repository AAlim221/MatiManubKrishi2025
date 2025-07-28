import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import your banner images here, same as Home
import img1 from "../assets/BannerImg/20230410130024-photo-300X370.jpg";
import img2 from "../assets/BannerImg/bangladesh-farmer-plows-the-soil-with-a-motorised-plow-2Y87B2W - Copy.jpg";
import img3 from "../assets/BannerImg/Agriwb.png";
import img4 from "../assets/BannerImg/Farmer_of_Bangladesh.jpg";
import img5 from "../assets/BannerImg/food-security.jpg";
import img6 from "../assets/BannerImg/NP_Himachal_Pradesh_68_(6348260166).jpg";
import img7 from "../assets/BannerImg/Bangladesh-Agriculture.jpeg";

const bannerImages = [img1, img2, img3, img4, img5, img6, img7];

const Banner = ({ fullWidth = true }) => {
  const { t } = useTranslation();
  const bannerSliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerSliderRef.current) {
        bannerSliderRef.current.scrollBy({
          left: bannerSliderRef.current.offsetWidth,
          behavior: "smooth",
        });
        if (
          bannerSliderRef.current.scrollLeft + bannerSliderRef.current.offsetWidth >=
          bannerSliderRef.current.scrollWidth
        ) {
          bannerSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-screen overflow-hidden relative">

      <div className="relative">
        <div
          ref={bannerSliderRef}
          className="flex w-screen h-[75vh] overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
        >

          {bannerImages.map((image, i) => (
            <div
              key={i}
              className={`${fullWidth ? "min-w-screen" : "min-w-full"} h-full flex-shrink-0 snap-center relative`}
            >
              <img
                src={image}
                alt={`Banner ${i + 1}`}
                className="w-full h-full object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20 max-w-2xl p-6 text-left">
                <h2 className="text-white text-2xl md:text-3xl font-extrabold uppercase tracking-widest drop-shadow-xl animate-fadeIn">
                  Our Goal
                </h2>
                <p className="text-white/90 text-xl md:text-3xl font-light mt-4 tracking-wide drop-shadow-md leading-relaxed">
                  {t(
                    "home.bannerTagline",
                    "Empowering Farmers Through Innovation"
                  )}
                </p>
                <p className="text-white/80 text-md md:text-xl font-light mt-4 tracking-wide drop-shadow-sm leading-relaxed">
                  {t(
                    "home.bannerTagline",
                    "Uniting science, technology, and tradition to cultivate prosperity and food security across rural landscapes."
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
