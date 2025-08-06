import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns'; // ✅ Added for formatting

function DoctorWorkpanel() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [solveMethod, setSolveMethod] = useState({});

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/contact');
        const normalized = res.data.map(p => ({
          ...p,
          status: p.status || 'unsolved',
          createdAt: p.createdAt || new Date().toISOString(), // fallback if missing
        }));
        setProblems(normalized);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('❌ Failed to load user problems:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleSolve = async (id) => {
    const method = solveMethod[id] || 'Admin Action';

    try {
      await axios.patch(`http://localhost:3000/api/contact/${id}`, {
        status: 'solved',
        solvedBy: method,
      });

      setProblems(prev =>
        prev.map(p =>
          p._id === id ? { ...p, status: 'solved', solvedBy: method } : p
        )
      );
    } catch (error) {
      console.error("❌ Failed to update problem:", error);
      alert("Failed to mark as solved.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">🛠️ Doctor Work Panel</h2>

      {loading && <p className="text-gray-600">Loading problems...</p>}
      {error && <p className="text-red-500">Error fetching problems. Please try again.</p>}
      {!loading && problems.length === 0 && <p>No problems found.</p>}

      {!loading && problems.length > 0 && (
        <div className="grid gap-5">
          {problems.map((problem) => {
            const date = format(new Date(problem.createdAt), 'MMM dd, yyyy');
            const time = format(new Date(problem.createdAt), 'hh:mm a');

            return (
              <div key={problem._id} className="bg-white rounded-xl p-5 shadow border border-gray-300 relative">
                {/* 📅 Date + Time top right */}
                <div className="absolute top-3 right-4 text-xs text-gray-500 text-right">
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mb-1 inline-block">
                    📅 {date}
                  </div>
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded inline-block">
                    🕒 {time}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-blue-700">{problem.name}</h3>
                <p><span className="font-semibold">📱 Mobile:</span> {problem.mobile}</p>
                {problem.email && <p><span className="font-semibold">📧 Email:</span> {problem.email}</p>}
                <p><span className="font-semibold">💬 Message:</span> {problem.message}</p>
                <p>
                  <span className="font-semibold">📌 Status:</span>{' '}
                  <span className={problem.status === 'solved' ? 'text-green-600' : 'text-yellow-600'}>
                    {problem.status}
                  </span>
                </p>
                {problem.solvedBy && (
                  <p><span className="font-semibold">✔️ Solved By:</span> {problem.solvedBy}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <a href={`tel:${problem.mobile}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">📞 Call</a>
                  <a href={`sms:${problem.mobile}`} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">💬 SMS</a>
                  {problem.email && (
                    <a href={`mailto:${problem.email}`} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">📧 Email</a>
                  )}
                  <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">🏥 Self Visit</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">🚨 Emergency</button>

                  {problem.status !== 'solved' && (
                    <>
                      <select
                        value={solveMethod[problem._id] || ''}
                        onChange={(e) => setSolveMethod(prev => ({ ...prev, [problem._id]: e.target.value }))}
                        className="border px-2 py-1 rounded text-sm"
                      >
                        <option value="">-- Select Solve Method --</option>
                        <option value="Phone Call">Phone Call</option>
                        <option value="SMS">SMS</option>
                        <option value="Email">Email</option>
                        <option value="Self Visit">Self Visit</option>
                        <option value="Emergency Response">Emergency Response</option>
                        <option value="Manual">Other</option>
                      </select>

                      <button
                        onClick={() => handleSolve(problem._id)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        ✅ Mark as Solved
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DoctorWorkpanel;
