import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ReviewSection = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ author: "", message: "" });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:3000/reviews");
      setReviews(res.data);
    } catch (err) {
      toast.error("❌ Could not load reviews");
      console.error("Failed to load reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/reviews", formData);
      toast.success("✅ Feedback submitted!");
      setFormData({ author: "", message: "" });
      setShowModal(false);
      fetchReviews(); // Refresh reviews
    } catch (err) {
      toast.error("❌ Failed to submit review. Try again.");
      console.error("Submit error:", err);
    }
  };

  return (
    <section className="bg-green-50 max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700">
          {t("home.reviewTitle", "What Farmers Say")}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Send Feedback
        </button>
      </div>

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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
            <h3 className="text-xl font-bold mb-4 text-green-700">Send Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={4}
                className="w-full px-4 py-2 border rounded resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default ReviewSection;
