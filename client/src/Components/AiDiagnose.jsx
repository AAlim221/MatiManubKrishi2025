import React, { useState } from 'react';

function AiDiagnose() {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      // Simulate AI diagnosis
      setTimeout(() => {
        setDiagnosis({
          disease: 'পাতা পচা রোগ (Leaf Blight)',
          suggestion: 'রোগগ্রস্ত পাতা কেটে ফেলুন এবং অনুমোদিত ছত্রাকনাশক ব্যবহার করুন।',
        });
      }, 2000);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-green-700 text-center mb-4">
        🤖 ফসলের ছবি আপলোড করে রোগ চিহ্নিত করুন
      </h2>

      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0 file:text-sm file:font-semibold
          file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </div>

      {image && (
        <div className="mb-4 text-center">
          <img src={image} alt="Uploaded" className="w-full h-64 object-contain rounded-lg" />
        </div>
      )}

      {diagnosis ? (
        <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded text-green-800">
          <h3 className="font-bold text-lg mb-1">🔍 রোগ চিহ্নিত:</h3>
          <p>🦠 <strong>{diagnosis.disease}</strong></p>
          <p className="mt-2">💡 পরামর্শ: {diagnosis.suggestion}</p>
        </div>
      ) : (
        image && <p className="text-sm text-center text-gray-500">⏳ বিশ্লেষণ করা হচ্ছে...</p>
      )}
    </div>
  );
}

export default AiDiagnose;
