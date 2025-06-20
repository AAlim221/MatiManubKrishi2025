import React from 'react';

const mockHistory = [
  {
    date: '২০২৫-০৫-৩১',
    crop: 'ধান',
    diagnosis: 'পাতা পচা রোগ',
    suggestion: 'ছত্রাকনাশক প্রয়োগ করুন',
  },
  {
    date: '২০২৫-০৫-২৮',
    crop: 'টমেটো',
    diagnosis: 'পোকা আক্রমণ',
    suggestion: 'বায়ো কীটনাশক ব্যবহার করুন',
  },
];

function FarmerDashboard() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold text-green-700 text-center mb-4">🧾 কৃষকের ড্যাশবোর্ড</h2>

      <div className="grid gap-4">
        {mockHistory.map((entry, i) => (
          <div key={i} className="bg-white shadow p-4 rounded-lg">
            <p className="text-sm text-gray-600">📅 তারিখ: {entry.date}</p>
            <h3 className="text-md font-bold text-green-800 mt-1">🌾 ফসল: {entry.crop}</h3>
            <p className="text-sm mt-1">🦠 রোগ: {entry.diagnosis}</p>
            <p className="text-sm">💡 পরামর্শ: {entry.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerDashboard;
