import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ Needed for navigation to CropDetails

function RainyPage() {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/crops/season/Rainy')
      .then((res) => setCrops(res.data))
      .catch((err) => {
        console.error('Failed to fetch rainy crops:', err);
        setError('Failed to load rainy crops. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCrops = crops.filter((crop) =>
    crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 min-h-screen">
      <div className="mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search rainy season crops..."
          className="w-full p-3 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center text-green-600 text-lg">Loading crops...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : filteredCrops.length === 0 ? (
        <div className="text-center text-gray-600">No crops found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map((crop, index) => (
            <Link
              to={`/crop/${crop._id}`}
              key={index}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-green-300 transition-transform transform hover:-translate-y-1 overflow-hidden">
                <img
                  src={crop.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={crop.cropName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-green-700">{crop.cropName}</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {crop.description || 'No description available.'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 italic">
                    Soil: {crop.soilType || 'N/A'} | Location: {crop.location || 'N/A'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RainyPage;
