import React, { useState } from 'react';

const winterCrops = [
  {
    name: 'Vegetables (Cabbage, Cauliflower, Tomato)',
    description: 'These vegetables are grown and harvested in the winter season.',
    image: 'https://source.unsplash.com/300x200/?cabbage',
  },
  {
    name: 'Wheat',
    description: 'A major crop grown in winter for food and other uses.',
    image: 'https://source.unsplash.com/300x200/?wheat-field',
  },
  {
    name: 'Potato',
    description: 'Potatoes are harvested in winter, especially in colder climates.',
    image: 'https://source.unsplash.com/300x200/?potato',
  },
  {
    name: 'Mustard',
    description: 'Mustard seeds are cultivated in the winter season.',
    image: 'https://source.unsplash.com/300x200/?mustard-plant',
  },
];

function WinterPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the crops based on the search term (case-insensitive)
  const filteredCrops = winterCrops.filter(crop =>
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
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
      </div>

      {/* Display filtered crops in a grid layout */}
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

export default WinterPage;
