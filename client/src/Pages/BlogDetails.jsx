import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const BlogDetails = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link to="/blogdetails" className="text-green-700 flex items-center mb-6 hover:underline">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Blog
      </Link>

      <h1 className="text-4xl font-bold text-green-800 mb-4">Healthy Soil, Healthy Plant</h1>
      <p className="text-gray-600 text-sm mb-6">Published on: June 28, 2025</p>
      <img
        src="https://source.unsplash.com/800x400/?soil,plant"
        alt="Soil and Plant"
        className="rounded-lg shadow mb-6"
      />
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Healthy soil is fundamental to sustainable agriculture and food security. It provides essential
        nutrients to plants, stores water effectively, and supports a thriving ecosystem of beneficial microbes.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Practices like crop rotation, composting, and avoiding chemical overuse help maintain soil health.
        Farmers are increasingly adopting sustainable methods to boost productivity while preserving the land for future generations.
      </p>
    </div>
  );
};

export default BlogDetails;
