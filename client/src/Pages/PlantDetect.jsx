import React, { useState } from 'react';

function ImageUpload() {
  const [, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleDetect = () => {
    alert('🧪 Analyzing image for plant disease...');
  };

  return (
    <div className="w-full">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Upload a plant leaf image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-6
                   file:rounded-full file:border-0
                   file:bg-green-100 file:text-green-700
                   hover:file:bg-green-200 transition mb-6"
      />

      {preview && (
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-sm rounded-xl shadow-lg mb-4 ring-1 ring-gray-300"
          />
          <button
            onClick={handleDetect}
            className="bg-green-600 text-white text-base font-medium px-6 py-2 rounded-full hover:bg-green-700 shadow-md transition"
          >
            🔍 Detect Disease
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
