import React from 'react';

const seasonData = [
  {
    name: 'Grishsho (Summer)',
    months: 'Boishakh - Joishtho (April - May)',
    weather: 'Hot, Dry',
    crops: ['Aus Rice', 'Jute', 'Fruits (Mango, Jackfruit)', 'Vegetables (Pumpkin, Gourd)'],
    image: 'https://source.unsplash.com/300x200/?mango-tree',
  },
  {
    name: 'Borsha (Rainy)',
    months: 'Ashar - Srabon (June - July)',
    weather: 'Heavy Rainfall',
    crops: ['Aman Rice (seedling stage)', 'Vegetables', 'Jute (harvest time)'],
    image: 'https://source.unsplash.com/300x200/?rainy-paddy',
  },
  {
    name: 'Shorot (Autumn)',
    months: 'Bhadro - Ashwin (August - September)',
    weather: 'Clear sky after rain',
    crops: ['Aman Rice (growing)', 'Spinach', 'Radish'],
    image: 'https://source.unsplash.com/300x200/?autumn-field',
  },
  {
    name: 'Hemonto (Late Autumn)',
    months: 'Kartik - Ogrohayon (October - November)',
    weather: 'Cool, Dry',
    crops: ['Aman Rice (harvest)', 'Lentils', 'Mustard', 'Onion'],
    image: 'https://source.unsplash.com/300x200/?harvest',
  },
  {
    name: 'Sheet (Winter)',
    months: 'Poush - Magh (December - January)',
    weather: 'Cold',
    crops: ['Vegetables (Cabbage, Cauliflower, Tomato)', 'Wheat', 'Potato', 'Mustard'],
    image: 'https://source.unsplash.com/300x200/?winter-vegetables',
  },
  {
    name: 'Boshonto (Spring)',
    months: 'Falgun - Chaitro (February - March)',
    weather: 'Pleasant, Colorful',
    crops: ['Boro Rice (seedling/growth)', 'Flowers', 'Tomato', 'Cucumber'],
    image: 'https://source.unsplash.com/300x200/?spring-farm',
  }
];

function Crops() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {seasonData.map((season, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition"
        >
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
      ))}
    </div>
  );
}

export default Crops;
