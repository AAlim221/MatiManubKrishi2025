import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/crops")
      .then(res => {
        const selected = res.data.find(item => item._id === id);
        setCrop(selected);
      })
      .catch(err => console.error("Details fetch error:", err));
  }, [id]);

  if (!crop) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Crop Image */}
        <img
          src={`http://localhost:3000${crop.imageUrl}`}
          alt={crop.cropName}
          className="w-full h-64 object-cover"
        />

        {/* Crop Info */}
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-green-700">{crop.cropName}</h2>
          <p className="text-gray-600 italic">"{crop.cropVariety}" from {crop.location}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <Detail label="Soil Type" value={crop.soilType} />
            <Detail label="Climate" value={crop.climate} />
            <Detail label="Planting Date" value={crop.plantingDate} />
            <Detail label="Harvesting Date" value={crop.harvestingDate} />
            <Detail label="Quantity (kg)" value={crop.quantity} />
            <Detail label="Price (৳)" value={crop.price} />
            <Detail label="Water Requirement" value={crop.waterRequirement} />
            <Detail label="Fertilizer Requirement" value={crop.fertilizerRequirement} />
            <Detail label="Pest Resistance" value={crop.pestResistance} />
            <Detail label="Storage Conditions" value={crop.storageConditions} />
            <Detail label="Market Target" value={crop.marketTarget} />
            <Detail label="Dependencies" value={crop.dependencies} />
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable field component
const Detail = ({ label, value }) => (
  <div className="bg-gray-100 p-3 rounded-md">
    <p className="font-medium text-gray-800">{label}</p>
    <p className="text-gray-600">{value || "N/A"}</p>
  </div>
);

export default CropDetails;
