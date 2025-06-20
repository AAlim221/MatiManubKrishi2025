import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd normally send data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', mobile: '', message: '' });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">📞 যোগাযোগ করুন</h1>

      <p className="mb-6 text-center text-sm text-gray-700">
        প্রিয় কৃষক ভাই ও বোনেরা, এই যোগাযোগ ব্যবস্থা সম্পূর্ণ <span className="font-bold text-green-600">ফ্রি</span> এবং শুধু আপনাদের সেবার জন্য তৈরি।
      </p>

      {submitted ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded">
          ✅ ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা খুব শীঘ্রই যোগাযোগ করবো।
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">আপনার নাম</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">মোবাইল নম্বর</label>
            <input
              type="text"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">বার্তা</label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            ✉️ বার্তা পাঠান
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
