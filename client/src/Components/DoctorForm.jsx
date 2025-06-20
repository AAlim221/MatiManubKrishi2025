import React, { useState } from 'react';

function DoctorForm() {
  const [formData, setFormData] = useState({
    name: '',
    problem: '',
    mobile: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor request sent:', formData);
    setSubmitted(true);
    setFormData({ name: '', problem: '', mobile: '' });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold text-green-700 text-center mb-4">👨‍⚕️ কৃষি ডাক্তার সহায়তা</h2>
      <p className="text-center mb-4 text-sm text-gray-600">আপনার সমস্যাটি লিখুন, আমরা একজন বিশেষজ্ঞ ডাক্তার আপনাকে সহায়তা করবেন।</p>

      {submitted ? (
        <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded text-green-800">
          ✅ আপনার অনুরোধ পাঠানো হয়েছে। শীঘ্রই যোগাযোগ করা হবে।
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-4">
          <input
            type="text"
            name="name"
            placeholder="আপনার নাম"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="problem"
            placeholder="আপনার সমস্যা লিখুন"
            required
            value={formData.problem}
            onChange={handleChange}
            rows="4"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="mobile"
            placeholder="মোবাইল নম্বর"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            📩 ডাক্তারকে পাঠান
          </button>
        </form>
      )}
    </div>
  );
}

export default DoctorForm;
