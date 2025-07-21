import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddDiseaseInfo() {
  const [formData, setFormData] = useState({
    diseaseName: "",
    suggestedPesticide: "",
    treatment: "",
    plantCareAdvice: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const missingField = Object.values(formData).some((val) => !val);
    if (missingField ) {
      setError("All fields are required.");
      return;
    }


    setError("");
    setLoading(true);

   try {
    // First: Check if disease already exists
    const { data: existingDisease } = await axios.get(`http://localhost:3000/diseases/${formData.diseaseName}`);

    if (existingDisease) {
      // If exists: show confirmation dialog
      const result = await Swal.fire({
        icon: "warning",
        title: "Disease already exists",
        text: "Do you want to update the existing disease information?",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        // Send PUT request to update disease
        await axios.put("http://localhost:3000/diseases/update", formData);

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Disease information has been updated.",
          confirmButtonColor: "#22c55e",
        });
      }

    } else {
      // If doesn't exist: send POST to create
      await axios.post("http://localhost:3000/diseases", formData, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        icon: "success",
        title: "Disease Info Added",
        text: "Disease information added successfully!",
        confirmButtonColor: "#22c55e",
      });
    }

      // Reset form
    setFormData({
      diseaseName: "",
      suggestedPesticide: "",
      treatment: "",
      plantCareAdvice: "",
    });

  } catch (err) {
    if (err.response?.status === 404) {
      // Disease not found on GET — create new
      try {
        await axios.post("http://localhost:3000/diseases", formData);
        Swal.fire({
          icon: "success",
          title: "Disease Info Added",
          text: "Disease information added successfully!",
          confirmButtonColor: "#22c55e",
        });
      } catch (postErr) {
        setError(`Error: ${postErr.response?.data?.message || postErr.message}`);
      }
    } else {
      setError(`Error: ${err.response?.data?.message || err.message}`);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow-lg max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-green-700">Add Plant Disease Info</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
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

        
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded"
      >
        {loading ? "Submitting..." : "Add Disease Info"}
      </button>
    </form>
  );
}

export default AddDiseaseInfo;
