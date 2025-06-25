import React, { useState } from 'react';

const autumnCrops = [
  {
    name: 'Aman Rice',
    description: 'A variety of rice grown in the autumn season.',
    image: 'https://source.unsplash.com/300x200/?autumn-rice',
  },
  {
    name: 'Spinach',
    description: 'A leafy green vegetable grown in autumn.',
    image: 'https://source.unsplash.com/300x200/?spinach',
  },
  {
    name: 'Radish',
    description: 'A root vegetable grown in the autumn season.',
    image: 'https://source.unsplash.com/300x200/?radish',
  }
];

function AutumnPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = autumnCrops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search crops..."
          className="p-2 border rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition"
          >
            <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-green-700">{crop.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{crop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutumnPage;
