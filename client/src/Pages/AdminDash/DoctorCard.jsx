import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition">
      {/* Profile Image */}
      <img
        src={doctor.image}
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
            {doctor.specialization.map((spec, index) => (
              <li key={index}>{spec}</li>
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
