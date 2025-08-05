import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EditCrop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const fetchCrop = async () => {
    try {
      const res = await axios.get("http://localhost:3000/crops");
      const crop = res.data.find((item) => item._id === id);
      if (crop) setCropData(crop);
      else toast.error("Crop not found!");
    } catch (err) {
      console.error("❌ Error loading crop:", err);
      toast.error("Failed to load crop!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrop();
  }, [id]);

  const handleChange = (e) => {
    setCropData({ ...cropData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in cropData) {
        formData.append(key, cropData[key]);
      }
      if (newImage) {
        formData.append("cropImage", newImage);
      }

      await axios.put(`http://localhost:3000/crops/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Crop updated successfully!");
      navigate("/admin/all-crops-details");
    } catch (err) {
      console.error("❌ Update error:", err);
      toast.error("Update failed!");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!cropData) return <p className="text-center text-red-500">Crop not found!</p>;

  const fields = [
    "cropName", "cropVariety", "location", "soilType", "seasonName",
    "plantingDate", "harvestingDate", "climate", "waterRequirement",
    "fertilizerRequirement", "pestResistance", "storageConditions",
    "marketTarget", "price", "quantity"
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">✏️ Edit Crop</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={cropData[field] || ""}
            onChange={handleChange}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            className="w-full px-4 py-2 border rounded"
          />
        ))}

        {/* 📤 Upload New Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border px-4 py-2 rounded"
        />
         {/* 📸 Image Preview */}
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="New Crop Preview"
          className="w-full h-40 object-cover rounded mb-4"
        />
      ) : cropData.imageUrl ? (
        <img
          src={
            cropData.imageUrl.startsWith("http")
              ? cropData.imageUrl
              : `http://localhost:3000${cropData.imageUrl}`
          }
          alt="Current Crop"
          className="w-full h-40 object-cover rounded mb-4"
        />
      ) : null}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ✅ Update Crop
        </button>
      </form>
    </div>
  );
}

export default EditCrop;
