import React from 'react';

// Import images
import alluvialSoil from '../assets/Soil/Alluvial soil.jpg';
import claySoil from '../assets/Soil/Clay soil.jpg';
import loamySoil from '../assets/Soil/loamy soil.jpg';
import sandySoil from '../assets/Soil/Sandy soil.jpg';
import siltSoil from '../assets/Soil/Silt soil.jpg';
import peatSoil from '../assets/Soil/Peat Soil.jpg';
import salineSoil from '../assets/Soil/Saline Soil.jpg';
import redLaterecticSoil from '../assets/Soil/Red Laterectic Soil.jpg';
import calcareousSoil from '../assets/Soil/Calcareous soil.jpg';

const soilData = [
  {
    name: 'Alluvial Soil',
    region: 'Floodplains, Padma, Jamuna, Meghna basins',
    crops: ['Rice', 'Jute', 'Wheat', 'Sugarcane'],
    image: alluvialSoil,
  },
  {
    name: 'Clayey Soil',
    region: 'Haor areas (Sylhet, Kishoreganj)',
    crops: ['Boro Rice', 'Lentils', 'Mustard'],
    image: claySoil,
  },
  {
    name: 'Loamy Soil',
    region: 'Central and Southwestern Bangladesh',
    crops: ['Vegetables', 'Potato', 'Maize', 'Sugarcane'],
    image: loamySoil,
  },
  {
    name: 'Sandy Soil',
    region: 'Coastal areas (Cox’s Bazar, Satkhira)',
    crops: ['Watermelon', 'Carrot', 'Groundnut'],
    image: sandySoil,
  },
  {
    name: 'Silt Soil',
    region: 'Deltaic areas (Chittagong, Barisal)',
    crops: ['Rice', 'Sugarcane', 'Turmeric'],
    image: siltSoil,
  },
  {
    name: 'Peat Soil',
    region: 'Wetlands (Gopalganj, Khulna, Sylhet)',
    crops: ['Jute', 'Rice', 'Coconut'],
    image: peatSoil,
  },
  {
    name: 'Saline Soil',
    region: 'Coastal saline belt (Khulna, Bagerhat)',
    crops: ['Salt-tolerant Rice', 'Sunflower', 'Mustard'],
    image: salineSoil,
  },
  {
    name: 'Red Lateritic Soil',
    region: 'Hill Tracts, Madhupur',
    crops: ['Pineapple', 'Banana', 'Tea'],
    image: redLaterecticSoil,
  },
  {
    name: 'Calcareous Soil',
    region: 'Rajshahi, Natore, Nawabganj',
    crops: ['Wheat', 'Lentils', 'Maize'],
    image: calcareousSoil,
  }
];

function BangladeshSoil() {
  const handleClick = (soilName) => {
    alert(`You clicked on ${soilName}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {soilData.map((soil, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition overflow-hidden"
          onClick={() => handleClick(soil.name)}
        >
          <img
            src={soil.image}
            alt={soil.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold text-green-700">{soil.name}</h2>
            <p className="text-sm text-gray-600 italic mb-2">{soil.region}</p>
            <ul className="list-disc list-inside text-gray-800 text-sm">
              {soil.crops.map((crop, i) => (
                <li key={i}>{crop}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BangladeshSoil;
