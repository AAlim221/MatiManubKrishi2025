import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/blogs/${id}`);
        const data = await res.json();

        if (res.ok) {
          setBlog(data);
        } else {
          throw new Error(data.message || "Blog not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500 text-lg mt-10">Loading blog...</p>;

  if (error)
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  if (!blog) return null;

  return (
    <section className="bg-gradient-to-b from-white via-green-50 to-green-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Blog Image */}
        <div className="relative">
          <img
            src={
              blog.imageUrl?.startsWith("http")
                ? blog.imageUrl
                : `http://localhost:3000${blog.imageUrl}`
            }
            alt={blog.title}
            className="w-full h-80 object-cover sm:h-[500px]"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end rounded-t-3xl p-6 sm:p-10">
            <h1 className="text-white text-3xl sm:text-5xl font-bold drop-shadow-lg">{blog.title}</h1>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-6 sm:p-10 space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap text-sm text-gray-500 gap-4">
            <span className="font-medium text-gray-700">
              🖋️ Author: {blog.author || "Unknown"}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">📅 {blog.date || "Unknown date"}</span>
            <span className="text-gray-400">•</span>
            <span className="italic text-gray-600">🔗 Slug: <span className="text-green-700">{blog.slug || "N/A"}</span></span>
          </div>

          {/* Description */}
          {blog.description && (
            <p className="text-xl text-gray-700 font-medium italic border-l-4 border-green-500 pl-4">
              {blog.description}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-green prose-lg max-w-none text-gray-800">
            {blog.content?.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            )) || <p>No content available.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
