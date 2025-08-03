// WeatherUpzila.jsx (Main Component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../Components/WeatherCard';
import ForecastChart from '../Components/ForecastChart';

const upazilas = {
  "Barisal": ["Barisal Sadar", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla"],
  "Chittagong": ["Chittagong Sadar", "Sitakunda", "Patiya", "Boalkhali", "Anwara"],
  "Dhaka": ["Dhanmondi", "Uttara", "Gulshan", "Mirpur", "Motijheel", "Mohammadpur", "Ramna", "Tejgaon", "Badda", "Khilgaon", "Shahbagh", "Lalbagh", "New Market", "Sabujbagh", "Hazaribagh", "Pallabi", "Turag", "Jatrabari", "Demra", "Kamrangirchar", "Cantonment", "Kafrul", "Shyampur", "Dakshinkhan", "Uttarkhan", "Khilkhet", "Vatara", "Hatirjheel", "Wari"],
  "Khulna": ["Khulna Sadar", "Batiaghata", "Dumuria", "Terokhada", "Phultala"],
  "Mymensingh": ["Mymensingh Sadar", "Trishal", "Gouripur", "Ishwarganj", "Muktagacha"],
  "Rajshahi": ["Rajshahi Sadar", "Paba", "Godagari", "Charghat", "Bagha"],
  "Rangpur": ["Rangpur Sadar", "Badarganj", "Taraganj", "Gangachara", "Mithapukur"],
  "Sylhet": ["Sylhet Sadar", "Beanibazar", "Zakiganj", "Fenchuganj", "Gowainghat"],
  "Sunamganj": ["Bishwambarpur", "Tahirpur", "Dowarabazar", "Sunamganj Sadar", "Jamalganj"],
  "Comilla": ["Comilla Sadar", "Laksham", "Debidwar", "Barura", "Chandina"],
  "Bagerhat": ["Bagerhat Sadar", "Fakirhat", "Mollahat", "Kachua", "Rampal"],
  "Bandarban": ["Bandarban Sadar", "Thanchi", "Lama", "Rowangchhari", "Ruma"],
  "Barguna": ["Barguna Sadar", "Amtali", "Betagi", "Patharghata", "Bamna"],
  "Bhola": ["Bhola Sadar", "Char Fasson", "Lalmohan", "Borhanuddin", "Tazumuddin"],
  "Bogura": ["Bogura Sadar", "Sherpur", "Sariakandi", "Gabtali", "Shajahanpur"],
  "Brahmanbaria": ["Brahmanbaria Sadar", "Nabinagar", "Bancharampur", "Sarail", "Ashuganj"],
  "Chandpur": ["Chandpur Sadar", "Haimchar", "Kachua", "Shahrasti", "Matlab"],
  "Chuadanga": ["Chuadanga Sadar", "Alamdanga", "Jibannagar", "Damurhuda"],
  "Cox's Bazar": ["Cox's Bazar Sadar", "Teknaf", "Ukhiya", "Chakaria", "Ramu"],
  "Dinajpur": ["Dinajpur Sadar", "Phulbari", "Birampur", "Birol", "Parbatipur"],
  "Faridpur": ["Faridpur Sadar", "Boalmari", "Madhukhali", "Bhanga", "Nagarkanda"],
  "Feni": ["Feni Sadar", "Chhagalnaiya", "Parshuram", "Sonagazi", "Daganbhuiyan"],
  "Gaibandha": ["Gaibandha Sadar", "Gobindaganj", "Sundarganj", "Palashbari", "Sadullapur"],
  "Gazipur": ["Gazipur Sadar", "Kaliakair", "Tongi", "Sreepur", "Kapasia"],
  "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Tungipara", "Kotalipara", "Muksudpur"],
  "Habiganj": ["Habiganj Sadar", "Madhabpur", "Chunarughat", "Ajmiriganj", "Bahubal"],
  "Jamalpur": ["Jamalpur Sadar", "Islampur", "Sarishabari", "Melandaha", "Dewanganj"],
  "Jashore": ["Jashore Sadar", "Manirampur", "Bagherpara", "Abhaynagar", "Keshabpur"],
  "Jhalokathi": ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"],
  "Jhenaidah": ["Jhenaidah Sadar", "Shailkupa", "Harinakunda", "Kaliganj", "Moheshpur"],
  "Joypurhat": ["Joypurhat Sadar", "Akkelpur", "Panchbibi", "Kalai", "Khetlal"],
  "Kurigram": ["Kurigram Sadar", "Bhurungamari", "Nageshwari", "Ulipur", "Chilmari"],
  "Kushtia": ["Kushtia Sadar", "Kumarkhali", "Khoksa", "Mirpur", "Daulatpur"],
  "Lakshmipur": ["Lakshmipur Sadar", "Ramganj", "Raipur", "Kamalnagar", "Ramgati"],
  "Lalmonirhat": ["Lalmonirhat Sadar", "Patgram", "Aditmari", "Hatibandha", "Kaliganj"],
  "Madaripur": ["Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar"],
  "Magura": ["Magura Sadar", "Sreepur", "Mohammadpur", "Shalikha"],
  "Manikganj": ["Manikganj Sadar", "Singair", "Saturia", "Shibalaya", "Daulatpur"],
  "Meherpur": ["Meherpur Sadar", "Mujibnagar", "Gangni"],
  "Munshiganj": ["Munshiganj Sadar", "Sirajdikhan", "Lohajang", "Gajaria", "Tongibari"],
  "Naogaon": ["Naogaon Sadar", "Patnitala", "Mohadevpur", "Sapahar", "Dhamoirhat"],
  "Narail": ["Narail Sadar", "Kalia", "Lohagara"],
  "Narayanganj": ["Narayanganj Sadar", "Rupganj", "Sonargaon", "Bandar"],
  "Narsingdi": ["Narsingdi Sadar", "Belabo", "Raipura", "Monohardi", "Shibpur"],
  "Natore": ["Natore Sadar", "Bagatipara", "Lalpur", "Baraigram", "Gurudaspur"],
  "Netrokona": ["Netrokona Sadar", "Kendua", "Atpara", "Mohanganj", "Madan"],
  "Nilphamari": ["Nilphamari Sadar", "Saidpur", "Jaldhaka", "Kishoreganj", "Domar"],
  "Noakhali": ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companyganj", "Subarnachar"],
  "Pabna": ["Pabna Sadar", "Ishwardi", "Sujanagar", "Santhia", "Bhangura"],
  "Panchagarh": ["Panchagarh Sadar", "Tetulia", "Debiganj", "Boda", "Atwari"],
  "Patuakhali": ["Patuakhali Sadar", "Kalapara", "Galachipa", "Dashmina", "Mirzaganj"],
  "Pirojpur": ["Pirojpur Sadar", "Nazirpur", "Bhandaria", "Kawkhali", "Mathbaria"],
  "Rajbari": ["Rajbari Sadar", "Goalanda", "Pangsha", "Kalukhali", "Baliakandi"],
  "Satkhira": ["Satkhira Sadar", "Tala", "Kaliganj", "Assasuni", "Shyamnagar"],
  "Shariatpur": ["Shariatpur Sadar", "Naria", "Bhedarganj", "Gosairhat", "Damudya"],
  "Sherpur": ["Sherpur Sadar", "Nalitabari", "Jhenaigati", "Sreebardi", "Nakla"],
  "Sirajganj": ["Sirajganj Sadar", "Ullapara", "Belkuchi", "Tarash", "Kazipur"],
  "Tangail": ["Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur"],
  "Thakurgaon": ["Thakurgaon Sadar", "Pirganj", "Ranisankail", "Baliadangi", "Haripur"]
};
function WeatherUpzila() {
  const [district, setDistrict] = useState('Sunamganj');
  const [upazila, setUpazila] = useState('Bishwambarpur');
  const [forecast, setForecast] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const apiKey = '6357bb943564e8699b3417d366a07dd6';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${upazila}&appid=${apiKey}&units=metric`);
        const daily = res.data.list.filter((_, idx) => idx % 8 === 0).map(item => ({
          date: item.dt_txt.split(' ')[0],
          temp: `${Math.round(item.main.temp_max)}°/${Math.round(item.main.temp_min)}°C`,
          rain: item.rain ? `${item.rain['3h']} mm` : '0 mm',
          wind: `${item.wind.speed} km/h`,
          humidity: `${item.main.humidity}%`,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }));
        const hourly = res.data.list.slice(0, 12).map(item => ({
          time: item.dt_txt.split(' ')[1].slice(0, 5),
          temp: item.main.temp
        }));
        setForecast(daily);
        setHourlyData(hourly);
      } catch (err) {
        console.error('API error:', err);
      }
    };
    fetchWeather();
  }, [upazila]);

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Upazila-wise Weather Forecast</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          className="px-4 py-2 rounded shadow"
          onChange={(e) => {
            setDistrict(e.target.value);
            setUpazila(upazilas[e.target.value][0]);
          }}
          value={district}
        >
          {Object.keys(upazilas).map(d => <option key={d}>{d}</option>)}
        </select>

        <select
          className="px-4 py-2 rounded shadow"
          onChange={(e) => setUpazila(e.target.value)}
          value={upazila}
        >
          {upazilas[district].map(u => <option key={u}>{u}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {forecast.map((f, idx) => <WeatherCard key={idx} {...f} />)}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-center">Hourly Temperature Forecast</h2>
        <ForecastChart data={hourlyData} />
      </div>
    </div>
  );
}

export default WeatherUpzila;