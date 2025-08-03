import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function WeatherMarket() {
  const [city, setCity] = useState('Dhaka');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const districts = [
    "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
    "Chattogram", "Cox's Bazar", "Bandarban", "Brahmanbaria", "Chandpur", "Cumilla", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati",
    "Barishal", "Barguna", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur",
    "Khulna", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira",
    "Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna", "Sirajganj",
    "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon",
    "Mymensingh", "Jamalpur", "Netrokona", "Sherpur",
    "Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"
  ];
  

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError(false);
        setWeather(null);
        const apiKey = '6357bb943564e8699b3417d366a07dd6'; // Replace with your real API key
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=bn`
        );
        const data = res.data;
        setWeather({
          location: data.name,
          temperature: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      } catch (err) {
        console.error('Failed to fetch weather:', err);
        setError(true);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white shadow-lg rounded-2xl p-6 border border-blue-200 relative">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          🌦️ বর্তমান আবহাওয়া
        </h3>

        {/* City Selector */}
        <div className="mb-6">
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
            🏙️ আপনার জেলা নির্বাচন করুন:
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Weather Info */}
        {error ? (
          <p className="text-red-600 font-semibold text-center">
            ⚠️ আবহাওয়ার তথ্য আনতে ব্যর্থ হয়েছে।
          </p>
        ) : weather ? (
          <div className="flex items-center justify-start gap-6">
            <img
              src={weather.icon}
              alt="আবহাওয়া চিত্র"
              className="w-16 h-16 animate-fade-in"
            />
            <div className="text-gray-800 space-y-1">
              <p><span className="font-medium">📍 এলাকা:</span> {weather.location}</p>
              <p><span className="font-medium">🌡️ তাপমাত্রা:</span> {weather.temperature}</p>
              <p><span className="font-medium">☁️ আবহাওয়া:</span> {weather.condition}</p>
            </div>
          </div>
        ) : (
          <p className="text-blue-500 font-medium text-center">
            🔄 তথ্য লোড হচ্ছে...
          </p>
        )}

        {/* Decorative Background Icon */}
        <div className="absolute bottom-2 right-4 opacity-10 text-8xl select-none pointer-events-none">
          ☁️
        </div>
      </div>
     {/* Extra Links Section with Buttons */}
<div className="mt-6 space-y-3">
   <Link
    to="/weatherdetails"
    className="inline-block w-full text-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg border border-blue-300 hover:bg-blue-200 transition"
  >
    📍 View District-Wise Weather Details
  </Link>
  <a
    href="https://bmd.bdservers.site/en"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block w-full text-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg border border-blue-300 hover:bg-blue-200 transition"
  >
    🌐 View Upazila-wise Weather (BMD)
  </a>

 
</div>




    </div>
   
  );
}

export default WeatherMarket;
