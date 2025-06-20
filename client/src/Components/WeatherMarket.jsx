import React from 'react';

function WeatherMarket() {
  const weather = {
    location: 'ময়মনসিংহ',
    temperature: '৩১°C',
    condition: 'আংশিক মেঘলা',
  };

  const marketPrices = [
    { item: 'ধান', price: '৳৩০/কেজি' },
    { item: 'গম', price: '৳৩৮/কেজি' },
    { item: 'ইউরিয়া', price: '৳২০/কেজি' },
    { item: 'পটাশ', price: '৳২৮/কেজি' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 grid gap-6 lg:grid-cols-2">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-bold text-blue-800 mb-2">🌦️ বর্তমান আবহাওয়া</h3>
        <p>📍 এলাকা: {weather.location}</p>
        <p>🌡️ তাপমাত্রা: {weather.temperature}</p>
        <p>☁️ আবহাওয়া: {weather.condition}</p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="text-lg font-bold text-yellow-800 mb-2">🛒 কৃষি বাজার দর</h3>
        <ul className="text-sm text-gray-800">
          {marketPrices.map((item, i) => (
            <li key={i}>✔️ {item.item}: {item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WeatherMarket;
