import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../AdminDash/DoctorCard";
import { Link } from "react-router-dom";

const OurDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter doctors by name
  const filteredDoctors = doctors.filter((doc) =>
    doc.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete locally
  const handleDelete = (deletedId) => {
    setDoctors((prev) => prev.filter((doc) => doc._id !== deletedId));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        {/* Add Doctor Button - Left */}
        <div className="flex-1 flex justify-start">
          <Link
            to="/admin/add-doctor"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            ➕ Add Doctor
          </Link>
        </div>

        {/* Title - Center */}
        <div className="flex-1 flex justify-center text-center">
          <h1 className="text-3xl font-bold text-green-800">🌾 Our Expert Doctors</h1>
        </div>

        {/* Search Input - Right */}
        <div className="flex-1 flex justify-end">
          <input
            type="text"
            placeholder="Search doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default OurDoctors;
