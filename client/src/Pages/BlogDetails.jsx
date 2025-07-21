import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error("Failed to load blog:", err));
  }, [id]);

  if (!blog) return <div className="text-center py-20 text-xl">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link to="/blogs" className="text-green-700 flex items-center mb-6 hover:underline">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Blogs
      </Link>

      <h1 className="text-4xl font-bold text-green-800 mb-4">{blog.title}</h1>
      <p className="text-gray-600 text-sm mb-6">Published on: {blog.date}</p>

      <img
        src={`http://localhost:3000${blog.imageUrl}`}
        alt={blog.title}
        className="rounded-lg shadow mb-6 w-full h-auto object-cover"
      />

      <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetails;
