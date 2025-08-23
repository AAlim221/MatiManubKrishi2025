import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image-more';

const translations = {
  bn: {
    title: "🧪 মাটির তথ্য দিন পরামর্শ নিন",
    typeLabel: "মাটির ধরন",
    phLabel: "মাটির pH (উদাহরণ: 6.5)",
    moistureLabel: "আর্দ্রতা (শতকরা %)",
    selectPlaceholder: "-- নির্বাচন করুন --",
    button: "🌾 পরামর্শ দেখুন",
    resultTitle: "✅ প্রস্তাবিত ফসল:",
    fallbackAdvice: "মাটির ধরন ও পরিবেশের ভিত্তিতে কিছু সাধারণ ফসল প্রস্তাবিত হয়েছে।",
    exportBtn: "📄 PDF হিসেবে সংরক্ষণ করুন",
    inputsTitle: "📝 আপনার ইনপুট:"
  },
  en: {
    title: "🧪 Enter Soil Info & Get Advice",
    typeLabel: "Soil Type",
    phLabel: "Soil pH (e.g. 6.5)",
    moistureLabel: "Moisture (%)",
    selectPlaceholder: "-- Select --",
    button: "🌾 Get Suggestion",
    resultTitle: "✅ Suggested Crops:",
    fallbackAdvice: "Based on soil type and condition, these general crops are suggested.",
    exportBtn: "📄 Save as PDF",
    inputsTitle: "📝 Your Input:"
  }
};

const SoilAdvisor = () => {
  const [lang, setLang] = useState("bn");
  const t = translations[lang];

  const [soil, setSoil] = useState({
    type: '',
    ph: '',
    moisture: '',
  });

  const [suggestion, setSuggestion] = useState(null);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const resultRef = useRef();

  useEffect(() => {
    fetch('/soilSuggestions_200.json')
      .then(res => res.json())
      .then(data => {
        console.log("✅ Suggestions loaded:", data);
        setAllSuggestions(data);
      })
      .catch(err => console.error('❌ JSON Load Error:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoil(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, ph, moisture } = soil;

    const matched = allSuggestions.find(item =>
      item.type === type &&
      ph >= item.phRange[0] &&
      ph <= item.phRange[1] &&
      moisture >= item.moistureRange[0] &&
      moisture <= item.moistureRange[1]
    );

    if (matched) {
      setSuggestion({
        crops: matched.crops,
        advice: matched.advice,
      });
    } else {
      setSuggestion({
        crops: lang === "bn" ? ['শাকসবজি', 'মসুর', 'সরিষা'] : ['Vegetables', 'Lentil', 'Mustard'],
        advice: t.fallbackAdvice,
      });
    }
  };

  const handleExportPDF = async () => {
    if (!resultRef.current) {
      alert("❌ Error: Nothing to export. Please generate a suggestion first.");
      return;
    }

    try {
      const dataUrl = await domtoimage.toPng(resultRef.current, {
        bgcolor: "#ffffff",
        quality: 1,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left"
        }
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (resultRef.current.offsetHeight * pdfWidth) / resultRef.current.offsetWidth;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("SoilAdvisor_Suggestion.pdf");
    } catch (err) {
      console.error("❌ PDF generation failed:", err);
      alert("❌ PDF creation failed. See console for details.");
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-700">{t.title}</h2>
        <button
          className="text-sm text-green-600 underline"
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
        >
          {lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">{t.typeLabel}</label>
          <select
            name="type"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">{t.selectPlaceholder}</option>
            <option value="এলুভিয়াল">এলুভিয়াল</option>
            <option value="লেটারাইট">লেটারাইট</option>
            <option value="কালো মাটি">কালো মাটি</option>
            <option value="বেলে মাটি">বেলে মাটি</option>
            <option value="দোঁআশ মাটি">দোঁআশ মাটি</option>
            <option value="চর মাটি">চর মাটি</option>
            <option value="পলি মাটি">পলি মাটি</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">{t.phLabel}</label>
          <input
            type="number"
            step="0.1"
            name="ph"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">{t.moistureLabel}</label>
          <input
            type="number"
            name="moisture"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {t.button}
        </button>
      </form>

      {suggestion && (
        <>
          <div ref={resultRef} className="mt-6 bg-green-50 border-l-4 border-green-600 p-4 rounded text-green-800">
            <h3 className="font-bold mb-2">{t.inputsTitle}</h3>
            <ul className="text-sm list-disc list-inside mb-4">
              <li>{t.typeLabel}: {soil.type}</li>
              <li>{t.phLabel}: {soil.ph}</li>
              <li>{t.moistureLabel}: {soil.moisture}%</li>
            </ul>

            <h3 className="font-bold text-lg mb-1">{t.resultTitle}</h3>
            <ul className="list-disc list-inside text-sm mb-2">
              {suggestion.crops.map((crop, idx) => (
                <li key={idx}>{crop}</li>
              ))}
            </ul>
            <p className="text-sm">{suggestion.advice}</p>
          </div>

          <button
            onClick={handleExportPDF}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            {t.exportBtn}
          </button>
        </>
      )}
    </div>
  );
};

export default SoilAdvisor;
