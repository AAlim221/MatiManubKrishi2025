import React, { useState } from 'react';
import axios from 'axios';

function AddCrops() {
  const [seasonName, setSeasonName] = useState('');
  const [cropNames, setCropNames] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the crop data
    const cropData = {
      seasonName: seasonName,
      cropNames: cropNames
    };

    // Check if the fields are empty
    if (!seasonName || !cropNames) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:3000/crops', cropData);
      console.log('Crop added:', response.data);
      setSuccessMessage("Crop added successfully!");
      setSeasonName('');
      setCropNames('');
    } catch (error) {
      console.error('Error adding crop:', error);
      setError('Error adding crop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Add New Crops</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Success Message */}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Season Name</label>
          <input
            type="text"
            placeholder="Enter season name"
            className="w-full p-2 border rounded-lg"
            value={seasonName}
            onChange={(e) => setSeasonName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Crops</label>
          <input
            type="text"
            placeholder="Enter crop names"
            className="w-full p-2 border rounded-lg"
            value={cropNames}
            onChange={(e) => setCropNames(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg" disabled={loading}>
            {loading ? 'Adding Crop...' : 'Add Crop'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCrops;
