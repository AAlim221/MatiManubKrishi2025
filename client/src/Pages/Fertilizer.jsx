import React, { useState, useEffect } from 'react';

function Fertilizer() {
  const [soilProblem, setSoilProblem] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [fertilizerDetails, setFertilizerDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [soilProblems, setSoilProblems] = useState([]);
  const [error, setError] = useState('');

  // Fetch soilProblems.json from the public folder when the component mounts
  useEffect(() => {
    setLoading(true);
    fetch('/soilProblems.json') // Path to the JSON file in the public folder
      .then((response) => response.json())
      .then((data) => {
        setSoilProblems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading soil problems:', error);
        setLoading(false);
        setError('There was an error loading the soil problems.');
      });
  }, []);

  // Handle soil problem change
  const handleProblemChange = (e) => {
    const problem = e.target.value;
    setSoilProblem(problem);

    // Find matching soil problem
    const selectedProblem = soilProblems.find(
      (item) => item.problem.toLowerCase() === problem.toLowerCase()
    );

    if (selectedProblem) {
      setSuggestions(selectedProblem.fertilizers);
      setFertilizerDetails(selectedProblem.suggestion);
      setError('');
    } else {
      setSuggestions([]);
      setFertilizerDetails('');
      setError('No suggestions available for this soil problem.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Fertilizer Suggestions Based on Soil Problem</h1>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center mb-6">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
            ></path>
          </svg>
          <span>Loading soil problems...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Dropdown (Select) input for soil problem */}
      <div className="mb-6">
        <label htmlFor="soilProblem" className="block text-lg font-semibold text-gray-700 mb-2">
          Select Your Soil Problem:
        </label>
        <select
          id="soilProblem"
          className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={soilProblem}
          onChange={handleProblemChange}
        >
          <option value="">Select a problem</option>
          {soilProblems.map((problem, index) => (
            <option key={index} value={problem.problem}>
              {problem.problem}
            </option>
          ))}
        </select>
      </div>

      {/* Fertilizer Suggestion */}
      {fertilizerDetails && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Fertilizer Suggestion:</h2>
          <p>{fertilizerDetails}</p>
        </div>
      )}

      {/* Display fertilizers and ratios */}
      {suggestions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-2">Recommended Fertilizers:</h2>
          <ul className="list-disc pl-6 text-gray-800">
            {suggestions.map((fertilizer, index) => (
              <li key={index}>
                <span className="font-medium">{fertilizer.name}</span> - Ratio: {fertilizer.ratio}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No suggestions found */}
      {error && !loading && !fertilizerDetails && soilProblem && (
        <p className="text-red-500 mt-4 text-center">{error}</p>
      )}
    </div>
  );
}

export default Fertilizer;
