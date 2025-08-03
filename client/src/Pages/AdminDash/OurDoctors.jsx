import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../AdminDash/DoctorCard";

const OurDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">🌾 Our Expert Doctors</h1>

      <div className="space-y-6">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default OurDoctors;
