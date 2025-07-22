import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">
          Our Latest Blogs
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="min-w-[250px] bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
              >
                <img
                  src={
                    blog.imageUrl
                      ? `http://localhost:3000${blog.imageUrl}`
                      : `https://source.unsplash.com/400x250/?plant,farmer,${blog._id}`
                  }
                  alt={blog.title || "Blog image"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-800 text-center">
                    {blog.title || "Untitled Blog"}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
