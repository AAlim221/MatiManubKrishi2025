import React from 'react';

const soilData = [
  {
    name: 'Alluvial Soil',
    region: 'Floodplains, Padma, Jamuna, Meghna basins',
    crops: ['Rice', 'Jute', 'Wheat', 'Sugarcane'],
    image: 'https://source.unsplash.com/300x200/?rice-field',
  },
  {
    name: 'Clayey Soil',
    region: 'Haor areas (Sylhet, Kishoreganj)',
    crops: ['Boro Rice', 'Lentils', 'Mustard'],
    image: 'https://source.unsplash.com/300x200/?clay,mud',
  },
  {
    name: 'Loamy Soil',
    region: 'Central and Southwestern Bangladesh',
    crops: ['Vegetables', 'Potato', 'Maize', 'Sugarcane'],
    image: 'https://source.unsplash.com/300x200/?vegetable-farm',
  },
  {
    name: 'Sandy Soil',
    region: 'Coastal areas (Cox’s Bazar, Satkhira)',
    crops: ['Watermelon', 'Carrot', 'Groundnut'],
    image: 'https://source.unsplash.com/300x200/?sand,coastal-farm',
  },
  {
    name: 'Silt Soil',
    region: 'Deltaic areas (Chittagong, Barisal)',
    crops: ['Rice', 'Sugarcane', 'Turmeric'],
    image: 'https://source.unsplash.com/300x200/?silt,rice',
  },
  {
    name: 'Peat Soil',
    region: 'Wetlands (Gopalganj, Khulna, Sylhet)',
    crops: ['Jute', 'Rice', 'Coconut'],
    image: 'https://source.unsplash.com/300x200/?peat,wetland',
  },
  {
    name: 'Saline Soil',
    region: 'Coastal saline belt (Khulna, Bagerhat)',
    crops: ['Salt-tolerant Rice', 'Sunflower', 'Mustard'],
    image: 'https://source.unsplash.com/300x200/?saline-farm',
  },
  {
    name: 'Red Lateritic Soil',
    region: 'Hill Tracts, Madhupur',
    crops: ['Pineapple', 'Banana', 'Tea'],
    image: 'https://source.unsplash.com/300x200/?red-soil,fruit-farm',
  },
  {
    name: 'Calcareous Soil',
    region: 'Rajshahi, Natore, Nawabganj',
    crops: ['Wheat', 'Lentils', 'Maize'],
    image: 'https://source.unsplash.com/300x200/?wheat-field',
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
