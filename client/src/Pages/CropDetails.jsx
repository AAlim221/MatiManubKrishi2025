import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/crops")
      .then((res) => {
        const selected = res.data.find((item) => item._id === id);
        setCrop(selected);
      })
      .catch((err) => console.error("Details fetch error:", err));
  }, [id]);

  if (!crop)
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl text-gray-500">
        Loading crop details...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={
              crop.imageUrl?.startsWith("http")
                ? crop.imageUrl
                : `http://localhost:3000/${crop.imageUrl?.replace(/^\/?/, "")}`
            }
            alt={crop.cropName}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
            className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-green-700">{crop.cropName}</h2>
            <p className="text-gray-500 italic mt-1">
              “{crop.cropVariety}” — cultivated in {crop.location}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Detail label="🌱 Soil Type" value={crop.soilType} />
            <Detail label="☁️ Climate" value={crop.climate} />
            <Detail label="📅 Planting Date" value={crop.plantingDate} />
            <Detail label="🌾 Harvesting Date" value={crop.harvestingDate} />
            <Detail label="⚖️ Quantity (kg)" value={crop.quantity} />
            <Detail label="💰 Price (৳)" value={crop.price} />
            <Detail label="💧 Water Requirement" value={crop.waterRequirement} />
            <Detail label="🌿 Fertilizer Requirement" value={crop.fertilizerRequirement} />
            <Detail label="🛡️ Pest Resistance" value={crop.pestResistance} />
            <Detail label="📦 Storage Conditions" value={crop.storageConditions} />
            <Detail label="🎯 Market Target" value={crop.marketTarget} />
            <Detail label="🔗 Dependencies" value={crop.dependencies} />
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable Detail Field
const Detail = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm">
    <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
    <p className="text-gray-600">{value || "N/A"}</p>
  </div>
);

export default CropDetails;
