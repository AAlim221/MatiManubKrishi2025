import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddCrops() {
  const [formData, setFormData] = useState({
    seasonName: "",
    cropName: "",
    cropVariety: "",
    location: "",
    soilType: "",
    dependencies: "",
    plantingDate: "",
    harvestingDate: "",
    quantity: "",
    price: "",
    climate: "",
    waterRequirement: "",
    fertilizerRequirement: "",
    pestResistance: "",
    storageConditions: "",
    marketTarget: "",
  });

  const [cropImage, setCropImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setCropImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const missingField = Object.values(formData).some((val) => !val);
    if (missingField || !cropImage) {
      setError("All fields including image are required.");
      return;
    }

    const cropData = new FormData();
    for (const key in formData) {
      cropData.append(key, formData[key]);
    }
    cropData.append("cropImage", cropImage);

    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/crops", cropData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Crop Added",
        text: "Your crop has been added successfully!",
        confirmButtonColor: "#22c55e",
      });

      // Reset form
      setFormData({
        seasonName: "",
        cropName: "",
        cropVariety: "",
        location: "",
        soilType: "",
        dependencies: "",
        plantingDate: "",
        harvestingDate: "",
        quantity: "",
        price: "",
        climate: "",
        waterRequirement: "",
        fertilizerRequirement: "",
        pestResistance: "",
        storageConditions: "",
        marketTarget: "",
      });
      setCropImage(null);
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow-lg max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-green-700">Add New Crop</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={key.toLowerCase().includes("date") ? "date" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Crop Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded"
      >
        {loading ? "Submitting..." : "Add Crop"}
      </button>
    </form>
  );
}

export default AddCrops;
