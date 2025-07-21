import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/crops")
      .then(res => setCrops(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const filteredCrops = crops.filter(crop =>
    crop.cropName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔍 Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by crop name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-md shadow-sm"
        />
      </div>

      {/* 🪴 Crop cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCrops.map(crop => (
          <Link
            to={`/crop/${crop._id}`}
            key={crop._id}
            className="border rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <img
              src={`http://localhost:3000${crop.imageUrl}`}
              alt={crop.cropName}
              className="h-40 w-full object-cover rounded-t-xl"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{crop.cropName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCrops;
