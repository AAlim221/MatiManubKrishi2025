import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FarmersProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/contact');
        // Default all missing status to 'unsolved'
        const normalized = res.data.map(p => ({
          ...p,
          status: p.status || 'unsolved',
        }));
        setProblems(normalized);
      } catch (error) {
        console.error('❌ Failed to load user problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'solved' ? 'unsolved' : 'solved';
      await axios.patch(`http://localhost:3000/api/contact/${id}`, {
        status: updatedStatus,
      });

      setProblems((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: updatedStatus } : p
        )
      );
    } catch (err) {
      console.error('❌ Failed to update status:', err);
    }
  };

  const total = problems.length;
  const solved = problems.filter((p) => p.status === 'solved').length;
  const unsolved = total - solved;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        📨 প্রাপ্ত ব্যবহারকারীর বার্তা
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-white">
        <div className="bg-blue-600 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">মোট বার্তা</h2>
          <p className="text-2xl">{total}</p>
        </div>
        <div className="bg-green-600 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">✅ সমাধান হয়েছে</h2>
          <p className="text-2xl">{solved}</p>
        </div>
        <div className="bg-red-600 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">❌ সমাধান হয়নি</h2>
          <p className="text-2xl">{unsolved}</p>
        </div>
      </div>

      {loading ? (
        <p>⏳ লোড হচ্ছে...</p>
      ) : total === 0 ? (
        <p className="text-gray-600">🚫 কোনো বার্তা পাওয়া যায়নি।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((problem, idx) => (
            <div
              key={problem._id}
              className={`bg-white shadow-lg border-l-4 p-4 rounded-xl ${
                problem.status === 'solved'
                  ? 'border-green-500'
                  : 'border-red-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-green-700">
                    {idx + 1}. 👤 {problem.name}
                  </h2>
                  <p className="text-sm text-gray-600">📞 {problem.mobile}</p>
                  <p className="mt-2 text-gray-800 whitespace-pre-line">📝 {problem.message}</p>
                  <p className="text-xs text-gray-400 mt-2">ID: {problem._id}</p>
                </div>
                <div>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      problem.status === 'solved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {problem.status === 'solved' ? '✅ Solved' : '❌ Not Solved'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleStatus(problem._id, problem.status)}
                className="mt-4 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
              >
                {problem.status === 'solved' ? 'Mark as Unsolved' : 'Mark as Solved'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FarmersProblems;
