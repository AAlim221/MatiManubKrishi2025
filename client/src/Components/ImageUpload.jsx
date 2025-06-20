import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:3000/predict', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Prediction failed.');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Detect</button>
      {result && (
        <div>
          <h3>Disease: {result.disease}</h3>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
