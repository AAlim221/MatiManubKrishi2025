import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CommonDiseaseDetails = () => {
  const { id } = useParams();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/common-diseases/${id}`)
      .then((res) => setDisease(res.data))
      .catch((err) => {
        console.error("❌ Error fetching disease detail:", err);
        setError("Failed to load disease information.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !disease) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">{error || "Disease not found."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
    
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={disease.image}
          alt={disease.name}
          className="w-full h-96 object"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/600x400?text=No+Image")
          }
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-800 mb-4">{disease.name}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{disease.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CommonDiseaseDetails;
