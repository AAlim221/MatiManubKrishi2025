import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample data
const seasonData = [
  {
    name: '(Summer)',
    months: 'Boishakh - Joishtho (April - May)',
    weather: 'Hot, Dry',
    crops: ['Aus Rice', 'Jute', 'Fruits (Mango, Jackfruit)', 'Vegetables (Pumpkin, Gourd)'],
    image: 'https://source.unsplash.com/300x200/?mango-tree',
    route: '/summer'
  },
  {
    name: '(Rainy)',
    months: 'Ashar - Srabon (June - July)',
    weather: 'Heavy Rainfall',
    crops: ['Aman Rice (seedling stage)', 'Vegetables', 'Jute (harvest time)'],
    image: 'https://source.unsplash.com/300x200/?rainy-paddy',
    route: '/rainy'
  },
  {
    name: '(Autumn)',
    months: 'Bhadro - Ashwin (August - September)',
    weather: 'Clear sky after rain',
    crops: ['Aman Rice (growing)', 'Spinach', 'Radish'],
    image: 'https://source.unsplash.com/300x200/?autumn-field',
    route: '/autumn'
  },
  {
    name: '(Late Autumn)',
    months: 'Kartik - Ogrohayon (October - November)',
    weather: 'Cool, Dry',
    crops: ['Aman Rice (harvest)', 'Lentils', 'Mustard', 'Onion'],
    image: 'https://source.unsplash.com/300x200/?harvest',
    route: '/late-autumn'
  },
  {
    name: '(Winter)',
    months: 'Poush - Magh (December - January)',
    weather: 'Cold',
    crops: ['Vegetables (Cabbage, Cauliflower, Tomato)', 'Wheat', 'Potato', 'Mustard'],
    image: 'https://source.unsplash.com/300x200/?winter-vegetables',
    route: '/winter'
  },
  {
    name: '(Spring)',
    months: 'Falgun - Chaitro (February - March)',
    weather: 'Pleasant, Colorful',
    crops: ['Boro Rice (seedling/growth)', 'Flowers', 'Tomato', 'Cucumber'],
    image: 'https://source.unsplash.com/300x200/?spring-farm',
    route: '/spring'
  }
];

function SeasonalCrops() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = seasonData.filter(season => {
    return season.crops.some(crop =>
      crop.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search crops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-1/2"
        />
        <Link to="/addcrops">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg ml-4">
            Add Crops
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((season, index) => (
          <Link key={index} to={season.route}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition">
              <img src={season.image} alt={season.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-green-700">{season.name}</h2>
                <p className="text-sm text-gray-500 italic">{season.months}</p>
                <p className="text-sm text-gray-600 mb-2">{season.weather}</p>
                <ul className="list-disc list-inside text-sm text-gray-800">
                  {season.crops.map((crop, i) => (
                    <li key={i}>{crop}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SeasonalCrops;
