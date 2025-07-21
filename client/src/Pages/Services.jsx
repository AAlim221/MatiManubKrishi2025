import React from 'react';
import { Link } from 'react-router-dom';

const aiServices = [
   {
    title: '🦠 রোগ ও সমস্যার সমাধান',
    description: 'গাছের পাতা বা শেকড়ের ছবি আপলোড করে রোগ চিহ্নিত করে দ্রুত সমাধান দেয়।',
    path: '/plantdiseasedetect',
  },
  {
    title: '🌾 ফসলের পূর্ণ বিবরণ',
    description: 'প্রতিটি ফসলের জাত, জমি প্রস্তুতি, সার প্রয়োগ, পানি, এবং ফলনের তথ্য দেয়া হয়।',
    path: '/allcrops',
  },
 
  {
    title: '🧠 মাটির তথ্য দিন ও পরামর্শ নিন',
    description: 'একাধিক ফসল বা পদ্ধতির মধ্যে তুলনা করে।',
    path: '/soiladvisor',
  },
  
  {
    title: '🧪 মাটি ও পানি বিশ্লেষণ (ভবিষ্যৎ)',
    description: 'AI ভিত্তিক টুলের মাধ্যমে মাটি ও পানির গুণমান বিশ্লেষণ করে উপযুক্ত ফসল নির্বাচন।',
    path: '/soil',
  },
   {
    title: '👨‍⚕️ কৃষি ডাক্তার পরামর্শ',
    description: 'কৃষি বিশেষজ্ঞদের কাছ থেকে সরাসরি পরামর্শ ও নির্দেশনা পাওয়া যায়।',
    path: '/contact',
  },
 
];

function Services() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌱 AI কৃষি সহায়তা পরিষেবা
      </h1>

      <p className="text-center text-gray-600 mb-10 text-lg">
        আমাদের AI সিস্টেম বাংলাদেশের কৃষকদের জন্য তৈরি হয়েছে, যাতে আপনার প্রতিটি সমস্যা পান এক ক্লিকে সমাধান। ফসল নির্বাচন থেকে শুরু করে ডাক্তার পরামর্শ পর্যন্ত – সব এক জায়গায়।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aiServices.map((service, index) => (
          <Link
            key={index}
            to={service.path}
            className="bg-white border border-green-100 hover:border-green-300 shadow-md rounded-2xl p-6 hover:shadow-xl transition-all duration-200 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">{service.title}</h2>
            <p className="text-gray-700">{service.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 italic">
        ⚙️ এ সেবা ধাপে ধাপে AI ও কৃষিবিদদের সহায়তায় উন্নত করা হচ্ছে। ফ্রি পরামর্শের জন্য যোগাযোগ করুন।
      </div>
    </div>
  );
}

export default Services;
