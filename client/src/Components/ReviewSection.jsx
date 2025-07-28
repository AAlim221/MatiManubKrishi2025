// components/ReviewSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ReviewSection = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="bg-green-50 max-w-7xl mx-auto px-4 pb-20">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        {t("home.reviewTitle", "What Farmers Say")}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100 pb-2 px-1">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-[280px] sm:min-w-[300px] md:min-w-[350px] flex-shrink-0 bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="text-sm text-gray-700 italic">"{review.message}"</p>
              <div className="mt-4 text-sm font-semibold text-green-700">
                {review.author}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
