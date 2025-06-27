import React, { useState } from "react";
import axios from "axios";

function AddCrops() {
  const [seasonName, setSeasonName] = useState("");
  const [cropName, setCropName] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState("");
  const [dependencies, setDependencies] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [harvestingDate, setHarvestingDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [climate, setClimate] = useState("");
  const [waterRequirement, setWaterRequirement] = useState("");
  const [fertilizerRequirement, setFertilizerRequirement] = useState("");
  const [pestResistance, setPestResistance] = useState("");
  const [storageConditions, setStorageConditions] = useState("");
  const [marketTarget, setMarketTarget] = useState("");
  const [cropImage, setCropImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setCropImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cropData = new FormData();
    cropData.append("seasonName", seasonName);
    cropData.append("cropName", cropName);
    cropData.append("cropVariety", cropVariety);
    cropData.append("location", location);
    cropData.append("soilType", soilType);
    cropData.append("dependencies", dependencies);
    cropData.append("plantingDate", plantingDate);
    cropData.append("harvestingDate", harvestingDate);
    cropData.append("quantity", quantity);
    cropData.append("price", price);
    cropData.append("climate", climate);
    cropData.append("waterRequirement", waterRequirement);
    cropData.append("fertilizerRequirement", fertilizerRequirement);
    cropData.append("pestResistance", pestResistance);
    cropData.append("storageConditions", storageConditions);
    cropData.append("marketTarget", marketTarget);
    if (cropImage) cropData.append("cropImage", cropImage);

    // Validate required fields (specifically seasonName and cropName)
    if (!seasonName || !cropName) {
      setError("Both seasonName and cropName are required.");
      setSuccessMessage("");
      return;
    }

    // Check for all other required fields
    if (
      !cropVariety ||
      !location ||
      !soilType ||
      !dependencies ||
      !plantingDate ||
      !harvestingDate ||
      !quantity ||
      !price ||
      !climate ||
      !waterRequirement ||
      !fertilizerRequirement ||
      !pestResistance ||
      !storageConditions ||
      !marketTarget
    ) {
      setError("All fields are required!");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:3000/crops", cropData);
      setSuccessMessage("Crop added successfully!");
      setSeasonName("");
      setCropName("");
      setCropVariety("");
      setLocation("");
      setSoilType("");
      setDependencies("");
      setPlantingDate("");
      setHarvestingDate("");
      setQuantity("");
      setPrice("");
      setClimate("");
      setWaterRequirement("");
      setFertilizerRequirement("");
      setPestResistance("");
      setStorageConditions("");
      setMarketTarget("");
      setCropImage(null);
    } catch (err) {
      console.error("Error adding crop:", err);
      setError(`Error: ${err.response?.data.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Add New Crop Details</h2>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Crop Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Crop Name</label>
            <input
              type="text"
              placeholder="Enter crop name"
              className="w-full p-3 border rounded-lg"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
            />
          </div>

          {/* Crop Variety */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Crop Variety</label>
            <input
              type="text"
              placeholder="Enter crop variety"
              className="w-full p-3 border rounded-lg"
              value={cropVariety}
              onChange={(e) => setCropVariety(e.target.value)}
            />
          </div>

          {/* Season Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Season Name</label>
            <input
              type="text"
              placeholder="Enter season name"
              className="w-full p-3 border rounded-lg"
              value={seasonName}
              onChange={(e) => setSeasonName(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full p-3 border rounded-lg"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Soil Type */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Soil Type</label>
            <input
              type="text"
              placeholder="Enter soil type"
              className="w-full p-3 border rounded-lg"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
            />
          </div>

          {/* Dependencies */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Dependencies</label>
            <input
              type="text"
              placeholder="Enter dependencies (e.g., water, temperature)"
              className="w-full p-3 border rounded-lg"
              value={dependencies}
              onChange={(e) => setDependencies(e.target.value)}
            />
          </div>

          {/* Planting Date */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Planting Date</label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
            />
          </div>

          {/* Harvesting Date */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Harvesting Date</label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              value={harvestingDate}
              onChange={(e) => setHarvestingDate(e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Quantity (kg/hectare)</label>
            <input
              type="text"
              placeholder="Enter quantity"
              className="w-full p-3 border rounded-lg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Price per unit */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Price per unit</label>
            <input
              type="text"
              placeholder="Enter price per unit"
              className="w-full p-3 border rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Climate */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Climate</label>
            <input
              type="text"
              placeholder="Enter climate (e.g., Tropical)"
              className="w-full p-3 border rounded-lg"
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
            />
          </div>

          {/* Water Requirement */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Water Requirement</label>
            <input
              type="text"
              placeholder="Enter water requirement (e.g., High)"
              className="w-full p-3 border rounded-lg"
              value={waterRequirement}
              onChange={(e) => setWaterRequirement(e.target.value)}
            />
          </div>

          {/* Fertilizer Requirement */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Fertilizer Requirement</label>
            <input
              type="text"
              placeholder="Enter fertilizer requirement"
              className="w-full p-3 border rounded-lg"
              value={fertilizerRequirement}
              onChange={(e) => setFertilizerRequirement(e.target.value)}
            />
          </div>

          {/* Pest Resistance */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Pest Resistance</label>
            <input
              type="text"
              placeholder="Enter pest resistance details"
              className="w-full p-3 border rounded-lg"
              value={pestResistance}
              onChange={(e) => setPestResistance(e.target.value)}
            />
          </div>

          {/* Storage Conditions */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Storage Conditions</label>
            <input
              type="text"
              placeholder="Enter storage conditions"
              className="w-full p-3 border rounded-lg"
              value={storageConditions}
              onChange={(e) => setStorageConditions(e.target.value)}
            />
          </div>

          {/* Market Target */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Market Target</label>
            <input
              type="text"
              placeholder="Enter market target"
              className="w-full p-3 border rounded-lg"
              value={marketTarget}
              onChange={(e) => setMarketTarget(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Crop Image</label>
            <input
              type="file"
              className="w-full p-3 border rounded-lg"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Adding Crop..." : "Add Crop"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCrops;
