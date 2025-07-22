import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllUserProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/contact');
        setProblems(res.data);
        setLoading(false);
      } catch (error) {
        console.error('❌ Failed to load user problems:', error);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-700">📨 প্রাপ্ত ব্যবহারকারীর বার্তা</h1>

      {loading ? (
        <p>⏳ লোড হচ্ছে...</p>
      ) : problems.length === 0 ? (
        <p className="text-gray-600">🚫 কোনো বার্তা পাওয়া যায়নি।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((problem, idx) => (
  <div
    key={problem._id}
    className="bg-white shadow-md border-l-4 border-green-500 rounded-lg p-4"
  >
    <h2 className="text-lg font-bold text-green-700">
      {idx + 1}. 👤 {problem.name}
    </h2>
    <p className="text-sm text-gray-600">📞 {problem.mobile}</p>
    <p className="mt-2 text-gray-800 whitespace-pre-line">📝 {problem.message}</p>
    <p className="text-xs text-gray-400 mt-2">ID: {problem._id}</p>
  </div>
))}
        </div>
      )}
    </div>
  );
}

export default AllUserProblems;
