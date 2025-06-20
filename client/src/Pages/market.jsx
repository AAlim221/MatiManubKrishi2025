import React, { useState } from 'react';

const agriItems = [
  {
    name: 'ট্রাক্টর (Tractor)',
    category: 'যন্ত্র',
    price: '৳6,50,000+',
    image: 'https://source.unsplash.com/300x200/?tractor,agriculture',
  },
  {
    name: 'বীজ (Seeds)',
    category: 'বীজ',
    price: '৳150 - ৳2000 প্রতি কেজি',
    image: 'https://source.unsplash.com/300x200/?seeds,agriculture',
  },
  {
    name: 'সার (Fertilizer)',
    category: 'সার',
    price: '৳20 - ৳35 প্রতি কেজি',
    image: 'https://source.unsplash.com/300x200/?fertilizer,bangladesh',
  },
  {
    name: 'কীটনাশক (Pesticides)',
    category: 'কীটনাশক',
    price: '৳300 - ৳800 প্রতি লিটার',
    image: 'https://source.unsplash.com/300x200/?pesticide,agriculture',
  },
  {
    name: 'সেচ যন্ত্র (Irrigation)',
    category: 'যন্ত্র',
    price: '৳8,000 - ৳40,000',
    image: 'https://source.unsplash.com/300x200/?irrigation,agriculture',
  },
  {
    name: 'হ্যান্ড টুলস (Hand Tools)',
    category: 'টুলস',
    price: '৳150 - ৳1500',
    image: 'https://source.unsplash.com/300x200/?farming-tools',
  },
];

const categories = ['সব', 'যন্ত্র', 'সার', 'বীজ', 'কীটনাশক', 'টুলস'];

function Market() {
  const [selectedCategory, setSelectedCategory] = useState('সব');

  const handleOrder = (itemName) => {
    alert(`"${itemName}" অর্ডার লিস্টে যোগ করা হয়েছে ✅`);
  };

  const filteredItems =
    selectedCategory === 'সব'
      ? agriItems
      : agriItems.filter(item => item.category === selectedCategory);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">কৃষি বাজার (Agri Market)</h1>

      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl hover:shadow-xl overflow-hidden transition flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-bold text-green-700">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm font-semibold text-gray-800 mt-2">
                মূল্যঃ <span className="text-red-500">{item.price}</span>
              </p>
            </div>
            <button
              onClick={() => handleOrder(item.name)}
              className="bg-green-600 text-white font-semibold py-2 px-4 m-4 rounded-lg hover:bg-green-700 transition"
            >
              🛒 অর্ডার করুন
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;
