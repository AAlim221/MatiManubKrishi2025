import React from 'react';
import AiDiagnose from '../Components/AiDiagnose';
import SoilAdvisor from '../Components/SoilAdvisor';
import FarmerDashboard from '../Components/FarmerDashboard';
import DoctorForm from '../Components/DoctorForm';
import VoiceInput from '../Components/VoiceInput';
import WeatherMarket from '../Components/WeatherMarket';

const aiServices = [
  {
    title: '🌾 ফসলের পূর্ণ বিবরণ',
    description: 'প্রতিটি ফসলের জাত, জমি প্রস্তুতি, সার প্রয়োগ, পানি, এবং ফলনের তথ্য দেয়া হয়।',
  },
  {
    title: '🧠 AI সুপারিশ ও তুলনা',
    description: 'একাধিক ফসল বা পদ্ধতির মধ্যে তুলনা করে কোনটি আপনার জমির জন্য উপযুক্ত তা AI জানায়।',
  },
  {
    title: '🦠 রোগ ও সমস্যার সমাধান',
    description: 'গাছের পাতা বা শেকড়ের ছবি আপলোড করে রোগ চিহ্নিত করে দ্রুত সমাধান দেয়।',
  },
  {
    title: '👨‍⚕️ কৃষি ডাক্তার পরামর্শ',
    description: 'কৃষি বিশেষজ্ঞদের কাছ থেকে সরাসরি পরামর্শ ও নির্দেশনা পাওয়া যায়।',
  },
  {
    title: '📷 ছবি বিশ্লেষণ করে পরামর্শ',
    description: 'আপনি জমির বা ফসলের ছবি দিলে AI তা বিশ্লেষণ করে রোগ বা সমস্যা জানায়।',
  },
  {
    title: '🧪 মাটি ও পানি বিশ্লেষণ (ভবিষ্যৎ)',
    description: 'AI ভিত্তিক টুলের মাধ্যমে মাটি ও পানির গুণমান বিশ্লেষণ করে উপযুক্ত ফসল নির্বাচন।',
  },
];

function Services() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">🌱 AI কৃষি সহায়তা পরিষেবা</h1>

      <p className="text-center text-gray-700 mb-6">
        আমাদের AI সিস্টেম বাংলাদেশের কৃষকদের জন্য তৈরি হয়েছে, যাতে আপনার প্রতিটি সমস্যা পান এক ক্লিকে সমাধান। ফসল নির্বাচন থেকে শুরু করে ডাক্তার পরামর্শ পর্যন্ত – সব এক জায়গায়।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiServices.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-bold text-green-800 mb-2">{service.title}</h2>
            <p className="text-sm text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-gray-600 italic">
        ⚙️ এ সেবা ধাপে ধাপে AI ও কৃষিবিদদের সহায়তায় উন্নত করা হচ্ছে। ফ্রি পরামর্শের জন্য যোগাযোগ করুন।
      </div>
     <div className="min-h-screen p-4 bg-gray-50">
  <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
    🌾 AI কৃষি সহায়ক ডেস্কবোর্ড
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left Column */}
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-4">
        <AiDiagnose />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <SoilAdvisor />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <VoiceInput />
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-4">
        <DoctorForm />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <FarmerDashboard />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <WeatherMarket />
      </div>
    </div>
  </div>
</div>

    
    </div>
    
  );
}

export default Services;
