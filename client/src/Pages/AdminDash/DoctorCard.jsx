import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorCard = ({ doctor, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/doctors/${doctor._id}`);
      onDelete?.(doctor._id);
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete doctor.");
    }
  };

  const handleEdit = () => {
    navigate(`/admin/edit-doctor/${doctor._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition relative">
      {/* Action Buttons - Top Right */}
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded"
        >
          🗑️ Delete
        </button>
      </div>

      {/* Profile Image */}
      <img
        src={
          doctor.imageUrl
            ? `http://localhost:3000${doctor.imageUrl}`
            : doctor.image
              ? doctor.image
              : "/default-avatar.png"
        }
        alt={doctor.name}
        className="w-36 h-36 object-cover rounded-full border-4 border-green-300 shadow-md"
      />

      {/* Details */}
      <div className="flex-1 space-y-2">
        <h2 className="text-xl font-bold text-green-800">{doctor.name}</h2>
        <p className="text-sm text-green-600 font-medium">{doctor.designation}</p>
        <p className="text-sm text-gray-600">{doctor.university}</p>

        {/* Specializations */}
        <div className="mt-2">
          <p className="text-sm font-semibold text-gray-700">Specializations:</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {(Array.isArray(doctor.specialization)
              ? doctor.specialization
              : String(doctor.specialization || "").split(",")
            ).map((spec, index) => (
              <li key={index}>{spec.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Contact & Links */}
        <div className="mt-2 text-sm text-gray-600">
          {doctor.contact?.email && (
            <p>📧 Email: <span className="text-green-700">{doctor.contact.email}</span></p>
          )}
          {doctor.contact?.phone && (
            <p>📞 Phone: <span className="text-green-700">{doctor.contact.phone}</span></p>
          )}
          {doctor.profileLink && (
            <p>
              🔗 <a href={doctor.profileLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Research Profile
              </a>
            </p>
          )}
        </div>

        {/* Bio */}
        {doctor.bio && (
          <p className="mt-2 text-sm text-gray-700 italic">🧬 {doctor.bio}</p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
