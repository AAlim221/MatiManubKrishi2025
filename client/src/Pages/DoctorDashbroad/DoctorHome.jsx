import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorHome() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 🔄 Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔄 Fetch problems
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/contact');
        const normalized = res.data.map(p => ({
          ...p,
          status: p.status || 'unsolved',
        }));
        setProblems(normalized);
      } catch (err) {
        console.error("❌ Failed to fetch problems:", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔢 Count
  const total = problems.length;
  const pending = problems.filter(p => p.status === 'pending' || p.status === 'unsolved').length;
  const solved = problems.filter(p => p.status === 'solved').length;

  // 🗓️ Format
  const timeString = currentTime.toLocaleTimeString('en-BD', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = currentTime.toLocaleDateString('en-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">👨‍⚕️ Doctor Dashboard</h2>

      {/* ⏰ Clock + Calendar Card */}
      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-lg rounded-xl px-8 py-6 border-l-8 border-indigo-600 text-center w-full max-w-md">
          <p className="text-4xl font-mono text-gray-800 mb-2">🕒 {timeString}</p>
          <p className="text-gray-500 text-lg font-semibold">📅 {dateString}</p>
        </div>
      </div>

      {/* 📊 Status Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load data.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-500 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-lg font-semibold">Total Problems</h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-4xl font-bold text-blue-700">{total}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-yellow-500 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-lg font-semibold">Pending</h3>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-4xl font-bold text-yellow-600">{pending}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-green-500 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-lg font-semibold">Solved</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-4xl font-bold text-green-600">{solved}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorHome;
