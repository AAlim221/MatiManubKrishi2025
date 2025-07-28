import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false); // ✅ control visibility

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blogs");
        const data = await response.json();

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("Backend returned non-array response:", data);
          setBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const visibleBlogs = showAll ? blogs : blogs.slice(0, 6); // ✅ show 6 or all

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-800 to-lime-600 text-transparent bg-clip-text drop-shadow-lg mb-16 animate-fade-in-up">
          Our Latest Blogs
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blogs found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {visibleBlogs.map((blog) => (
                <Link
                  to={`/blog/${blog._id}`}
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={
                        blog.imageUrl?.startsWith("http")
                          ? blog.imageUrl
                          : `http://localhost:3000${blog.imageUrl}`
                      }
                      alt={blog.title || "Blog image"}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {blog.title || "Untitled Blog"}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {blog.excerpt || "Click to read more..."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {!showAll && blogs.length > 6 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                >
                  See More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blogs;
