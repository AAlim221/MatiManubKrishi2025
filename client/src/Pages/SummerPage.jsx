import React, { useState } from 'react';

const summerCrops = [
  {
    name: 'Aus Rice',
    description: 'A variety of rice grown in the summer season.',
    image: 'https://source.unsplash.com/300x200/?rice-field',
  },
  {
    name: 'Jute',
    description: 'A fiber plant cultivated in the summer season.',
    image: 'https://source.unsplash.com/300x200/?jute',
  },
  {
    name: 'Mango',
    description: 'A tropical fruit, usually harvested in the summer season.',
    image: 'https://source.unsplash.com/300x200/?mango',
  },
  {
    name: 'Jackfruit',
    description: 'A large tropical fruit harvested in the summer.',
    image: 'https://source.unsplash.com/300x200/?jackfruit',
  },
  {
    name: 'Pumpkin',
    description: 'A vegetable grown during the summer season.',
    image: 'https://source.unsplash.com/300x200/?pumpkin',
  },
  {
    name: 'Gourd',
    description: 'A summer vegetable known for its long vines.',
    image: 'https://source.unsplash.com/300x200/?gourd',
  }
];

function SummerPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the crops based on the search term (case-insensitive)
  const filteredCrops = summerCrops.filter(crop =>
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

export default SummerPage;
