import React from "react";
import { Phone, Mail, User, Sparkles, Info } from "lucide-react";

const admins = [
  {
    name: "A.Alim",
    position: "Founder & CEO",
    img: "https://via.placeholder.com/150",
    phone: "+880 1711-123456",
    email: "aalim@example.com",
  },
  {
    name: "Farea Mahdea",
    position: "Co-Founder & CTO",
    img: "https://via.placeholder.com/150",
    phone: "+880 1811-654321",
    email: "fareamahdea@example.com",
  },
];

const About = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-800 flex items-center justify-center gap-2 mb-4">
            <User className="w-8 h-8 text-green-700" />
            Meet Our Admins
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Leading the way in smart agricultural innovation.
          </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {admins.map((admin, index) => (
            <div
              key={index}
              className={`relative group bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:scale-[1.02] transition duration-300 ease-in-out overflow-hidden
                ${index === 1 ? "animated-diagonal" : ""}`}
            >
              {/* Diagonal overlay animation */}
              {index === 1 && (
                <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-0 rotate-[-10deg] scale-125"></div>
              )}

              <div className="flex flex-col items-center text-center relative z-10">
                <img
                  src={admin.img}
                  alt={admin.name}
                  className="w-28 h-28 rounded-full border-4 border-green-300 object-cover mb-4 transition-transform group-hover:rotate-2"
                />
                <h3 className="text-xl font-bold text-green-800">{admin.name}</h3>
                <p className="text-green-600 mb-3">{admin.position}</p>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" /> {admin.phone}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-green-500" /> {admin.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Smart Generation Section */}
        <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
          <h3 className="text-3xl font-bold text-green-800 flex justify-center items-center gap-2 mb-4">
            <Sparkles className="text-green-600" /> Empowering the Smart Generation
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            We believe in harnessing the power of technology to uplift the next generation of
            farmers, students, and entrepreneurs. Our platform offers smart tools, real-time data,
            and decision-making support for a better future.
          </p>
        </div>

        {/* App Details Section */}
        <div className="bg-green-100 rounded-3xl p-10 shadow-md">
          <h3 className="text-3xl font-bold text-green-900 flex items-center gap-2 mb-6">
            <Info className="text-green-700" /> About Our Application
          </h3>
          <ul className="text-gray-800 text-lg space-y-4 list-disc pl-6">
            <li><strong>Smart Crop Advisor:</strong> Get AI-powered suggestions for the best crops based on soil, climate, and location.</li>
            <li><strong>Disease Detection:</strong> Upload plant images to detect diseases and get instant treatments.</li>
            <li><strong>Digital Marketplace:</strong> Buy and sell seeds, fertilizers, tools, and more with just a few clicks.</li>
            <li><strong>Multilingual Support:</strong> Use the app in English and Bengali for ease of understanding.</li>
            <li><strong>Offline Mode:</strong> Save important data and use core features without internet access.</li>
            <li><strong>PDF Reports:</strong> Export crop or order reports easily for tracking and printing.</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default About;
