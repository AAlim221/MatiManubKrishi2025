import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation(); // hook from react-i18next

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/contact', formData);
      console.log('✅ Server response:', response.data);
      setSubmitted(true);
      setFormData({ name: '', mobile: '', message: '' });
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(t("contact.errorMessage"));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
        {t("contact.title")}
      </h1>

      <p className="mb-6 text-center text-sm text-gray-700">
        {t("contact.description")}
      </p>

      {submitted ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded">
          ✅ {t("contact.successMessage")}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("contact.name")}
            </label>
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("contact.mobile")}
            </label>
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("contact.message")}
            </label>
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
            {t("contact.submit")}
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
