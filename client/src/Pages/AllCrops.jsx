import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/crops")
      .then((res) => setCrops(res.data))
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCrops = crops.filter((crop) =>
    crop?.cropName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 🔝 Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search by crop name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg shadow-md"
        />

        <h2 className="text-2xl font-bold text-green-800 text-center flex-1">
          🌾 All Crop Information
        </h2>

        <Link
          to="/admin/addcrop"
          className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
        >
          ➕ Add Crop
        </Link>
      </div>

      {/* 🕐 Loading State */}
      {loading ? (
        <p className="text-center text-gray-400">Loading crops...</p>
      ) : filteredCrops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => (
            <Link
              to={`/crop/${crop._id}`}
              key={crop._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition duration-300 hover:scale-[1.03] overflow-hidden"
            >
              <img
                src={
                  crop?.imageUrl?.startsWith("http")
                    ? crop.imageUrl
                    : `http://localhost:3000/${crop.imageUrl?.replace(/^\/?/, "")}`
                }
                alt={crop.cropName}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
                className="h-44 w-full object-cover rounded-t-xl"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-green-700 mb-1">
                  {crop.cropName}
                </h3>
                <p className="text-sm text-gray-500">Tap to learn more</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No crops found matching{" "}
          <span className="font-semibold">"{searchTerm}"</span>
        </div>
      )}
    </div>
  );
};

export default AllCrops;
