import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function AllCropsDetails() {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchCrops = async () => {
    try {
      const res = await axios.get("http://localhost:3000/crops");
      setCrops(res.data);
    } catch (error) {
      console.error("❌ Error fetching crops:", error);
      toast.error("Failed to fetch crops!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/crops/${id}`);
      toast.success("Crop deleted successfully!");
      setCrops((prev) => prev.filter((crop) => crop._id !== id));
    } catch (error) {
      console.error("❌ Error deleting crop:", error);
      toast.error("Failed to delete crop!");
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCrops = crops.filter((crop) =>
    crop.cropName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cropsToShow = filteredCrops.slice(0, visibleCount);

  return (
    <div className="p-4">
      {/* 🔍 Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <Link
          to="/admin/addcrops"
          className="bg-gradient-to-r from-green-500 to-lime-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          ➕ Add Crop
        </Link>

        <h2 className="text-3xl font-bold text-center flex-1 text-green-800">
          🌾 All Crop Information
        </h2>

        <input
          type="text"
          placeholder="🔍 Search crop..."
          className="border px-4 py-2 rounded w-full md:w-72 shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 📦 Crop Cards */}
      {loading ? (
        <p>Loading...</p>
      ) : cropsToShow.length === 0 ? (
        <p className="text-center text-gray-500">No crops found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cropsToShow.map((crop) => (
            <div
              key={crop._id}
              className="border rounded-lg shadow-lg bg-white relative hover:shadow-xl transition duration-300"
            >
              {crop.imageUrl && (
                <img
                  src={
                    crop.imageUrl.startsWith("http")
                      ? crop.imageUrl
                      : `http://localhost:3000${crop.imageUrl}`
                  }
                  alt={crop.cropName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-green-700">{crop.cropName}</h3>
                <p><strong>🌱 Variety:</strong> {crop.cropVariety}</p>
                <p><strong>📍 Location:</strong> {crop.location}</p>
                <p><strong>🧱 Soil Type:</strong> {crop.soilType}</p>

                {expanded[crop._id] && (
                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p><strong>📅 Season:</strong> {crop.seasonName}</p>
                    <p><strong>🌿 Planting:</strong> {crop.plantingDate}</p>
                    <p><strong>🧺 Harvesting:</strong> {crop.harvestingDate}</p>
                    <p><strong>☀️ Climate:</strong> {crop.climate}</p>
                    <p><strong>💧 Water:</strong> {crop.waterRequirement}</p>
                    <p><strong>🌾 Fertilizer:</strong> {crop.fertilizerRequirement}</p>
                    <p><strong>🛡️ Pest:</strong> {crop.pestResistance}</p>
                    <p><strong>📦 Storage:</strong> {crop.storageConditions}</p>
                    <p><strong>🛒 Target:</strong> {crop.marketTarget}</p>
                    <p><strong>💵 Price:</strong> {crop.price}</p>
                    <p><strong>📊 Quantity:</strong> {crop.quantity}</p>
                  </div>
                )}

                <button
                  onClick={() => toggleExpand(crop._id)}
                  className="text-blue-600 text-sm mt-2 underline hover:text-blue-800"
                >
                  {expanded[crop._id] ? "👈 Collapse" : "👉 Expand"}
                </button>
              </div>

              {/* ✏️ Delete + Edit buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleDelete(crop._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 shadow"
                >
                  🗑️
                </button>
                <Link
                  to={`/admin/edit-crop/${crop._id}`}
                  className="bg-yellow-400 px-2 py-1 rounded text-sm hover:bg-yellow-500 shadow"
                >
                  ✏️
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔽 Load More Button */}
      {filteredCrops.length > visibleCount && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            📜 Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default AllCropsDetails;