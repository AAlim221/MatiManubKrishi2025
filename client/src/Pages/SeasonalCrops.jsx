import React from 'react';
import { Link } from 'react-router-dom';

const seasonData = [
  {
    name: '(Summer)',
    months: 'Boishakh - Joishtho (April - May)',
    weather: 'Hot, Dry',
    crops: ['Aus Rice', 'Jute', 'Fruits (Mango, Jackfruit)', 'Vegetables (Pumpkin, Gourd)'],
    image: '/assets/Season/Summer.jpg',
    route: '/summer'
  },
  {
    name: '(Rainy)',
    months: 'Ashar - Srabon (June - July)',
    weather: 'Heavy Rainfall',
    crops: ['Aman Rice (seedling stage)', 'Vegetables', 'Jute (harvest time)'],
    image: '/assets/Season/Rainy.jpg',
    route: '/rainy'
  },
  {
    name: '(Autumn)',
    months: 'Bhadro - Ashwin (August - September)',
    weather: 'Clear sky after rain',
    crops: ['Aman Rice (growing)', 'Spinach', 'Radish'],
    image: '/assets/Season/Autumn.jpg',
    route: '/autumn'
  },
  {
    name: '(Late Autumn)',
    months: 'Kartik - Ogrohayon (October - November)',
    weather: 'Cool, Dry',
    crops: ['Aman Rice (harvest)', 'Lentils', 'Mustard', 'Onion'],
    image: '/assets/Season/LateAutumn.jpg',
    route: '/late-autumn'
  },
  {
    name: '(Winter)',
    months: 'Poush - Magh (December - January)',
    weather: 'Cold',
    crops: ['Vegetables (Cabbage, Cauliflower, Tomato)', 'Wheat', 'Potato', 'Mustard'],
    image: '/assets/Season/Winter.jpg',
    route: '/winter'
  },
  {
    name: '(Spring)',
    months: 'Falgun - Chaitro (February - March)',
    weather: 'Pleasant, Colorful',
    crops: ['Boro Rice (seedling/growth)', 'Flowers', 'Tomato', 'Cucumber'],
    image: '/assets/Season/Spring.jpg',
    route: '/spring'
  }
];

function SeasonalCrops() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seasonData.map((season, index) => (
          <Link key={index} to={season.route}>
            <div className="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden transition-transform transform hover:-translate-y-1">
              <img
                src={season.image}
                alt={season.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-green-700 mb-1">{season.name}</h2>
                <p className="text-sm text-gray-500 italic mb-1">{season.months}</p>
                <p className="text-sm text-gray-600 mb-2">{season.weather}</p>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
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
