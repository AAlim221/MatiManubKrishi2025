import React, { useState } from 'react';

function SoilAdvisor() {
  const [soil, setSoil] = useState({
    type: '',
    ph: '',
    moisture: '',
  });

  const [suggestion, setSuggestion] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoil(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic mock logic – replace with real AI later
    if (soil.type === 'এলুভিয়াল' && soil.ph >= 6 && soil.ph <= 7.5) {
      setSuggestion({
        crops: ['ধান', 'পাট', 'গম'],
        advice: 'আপনার মাটি ফসল চাষের জন্য অত্যন্ত উপযোগী। নিয়মিত পানি ও সার প্রয়োগ নিশ্চিত করুন।',
      });
    } else if (soil.type === 'লেটারাইট' || soil.ph < 5.5) {
      setSuggestion({
        crops: ['আনারস', 'কলা', 'আদা'],
        advice: 'মাটি কিছুটা অম্লীয়। ফলজাতীয় ফসল ভালো ফল দিবে। চুন প্রয়োগে পিএইচ উন্নয়ন সম্ভব।',
      });
    } else {
      setSuggestion({
        crops: ['শাকসবজি', 'মসুর', 'সরিষা'],
        advice: 'মাটির ধরন ও আর্দ্রতা অনুযায়ী এই ফসলগুলো উপযুক্ত হতে পারে।',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold text-green-700 text-center mb-4">
        🧪 মাটির তথ্য দিন ও AI পরামর্শ নিন
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">মাটির ধরন</label>
          <select
            name="type"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="এলুভিয়াল">এলুভিয়াল</option>
            <option value="লেটারাইট">লেটারাইট</option>
            <option value="কালো মাটি">কালো মাটি</option>
            <option value="বেলে মাটি">বেলে মাটি</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">মাটির pH (উদাহরণ: 6.5)</label>
          <input
            type="number"
            step="0.1"
            name="ph"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">আর্দ্রতা (শতকরা %)</label>
          <input
            type="number"
            name="moisture"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          🌾 পরামর্শ দেখুন
        </button>
      </form>

      {suggestion && (
        <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-4 rounded text-green-800">
          <h3 className="font-bold text-lg mb-1">✅ প্রস্তাবিত ফসল:</h3>
          <ul className="list-disc list-inside text-sm mb-2">
            {suggestion.crops.map((crop, idx) => (
              <li key={idx}>{crop}</li>
            ))}
          </ul>
          <p className="text-sm">{suggestion.advice}</p>
        </div>
      )}
    </div>
  );
}

export default SoilAdvisor;
