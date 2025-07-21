import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaUserMd, FaArrowLeft } from "react-icons/fa";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading doctor details...</p>
      </div>
    );

  if (!doctor)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold mb-4">No doctor found</p>
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold"
        >
          <FaArrowLeft className="mr-2" /> Back to Doctors
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-12 animate-fadeIn">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-green-600 hover:text-green-800 font-semibold"
      >
        <FaArrowLeft className="mr-2" /> Back to Doctors
      </Link>

      {/* Header */}
      <h2 className="text-5xl font-extrabold text-green-900 mb-8">{doctor.name}</h2>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image */}
        <img
          src={doctor.image.startsWith("http") ? doctor.image : `http://localhost:3000${doctor.image}`}
          alt={doctor.name}
          className="w-52 h-52 rounded-full object-cover shadow-xl border-8 border-green-300"
        />

        {/* Info Section */}
        <div className="flex-1 space-y-8">
          {/* Specialization */}
          <section>
            <h3 className="flex items-center text-2xl font-semibold text-green-800 mb-3">
              <FaUserMd className="mr-3 text-green-600" /> Specialization
            </h3>
            <p className="text-gray-700 text-lg">{doctor.specialization.join(", ")}</p>
          </section>

          {/* Contact Info */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center text-gray-700 text-lg">
              <FaPhone className="mr-3 text-green-600" />
              <span>{doctor.contact.phone}</span>
            </div>
            <div className="flex items-center text-gray-700 text-lg">
              <FaEnvelope className="mr-3 text-green-600" />
              <span>{doctor.contact.email}</span>
            </div>
          </section>

          {/* Bio */}
          <section>
            <h3 className="text-2xl font-semibold text-green-800 mb-3">About</h3>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{doctor.bio}</p>
          </section>

          {/* Profile Link Button */}
          {doctor.profileLink && (
            <a
              href={doctor.profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >
              View Full Profile
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
