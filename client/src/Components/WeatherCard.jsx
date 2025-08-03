// WeatherCard.jsx
import React from 'react';

const WeatherCard = ({ day, date, temp, rain, wind, humidity, icon }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow text-center w-[150px]">
      <h3 className="font-semibold">{day}</h3>
      <p className="text-sm text-gray-600">{date}</p>
      <img src={icon} alt="weather" className="w-12 mx-auto" />
      <p className="text-lg font-bold">{temp}</p>
      <p className="text-sm">🌧️ {rain}</p>
      <p className="text-sm">💨 {wind}</p>
      <p className="text-sm">💧 {humidity}</p>
    </div>
  );
};

export default WeatherCard;
