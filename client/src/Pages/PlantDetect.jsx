import React, { useState } from 'react';

const translations = {
  en: {
    uploadLabel: "Upload a plant leaf image",
    detectButton: "🔍 Detect Disease",
    detectingButton: "🔄 Detecting...",
    prediction: "Prediction",
    confidence: "Confidence",
    generatePrescription: "💊 Generate Prescription",
    suggestedTreatment: "🧪 Suggested Treatment",
    suggestedPesticide: "Suggested Pesticide",
    treatment: "Treatment",
    plantCareAdvice: "Plant care advice",
    errorFetching: "Error fetching prescription"
  },
  bn: {
    uploadLabel: "গাছের পাতার ছবি আপলোড করুন",
    detectButton: "🔍 রোগ সনাক্ত করুন",
    detectingButton: "🔄 সনাক্তকরণ চলছে...",
    prediction: "ডাটা ভিত্তিক অনুমান",
    confidence: "সম্ভাব্যতা",
    generatePrescription: "💊 প্রেসক্রিপশন তৈরি করুন",
    suggestedTreatment: "🧪 প্রস্তাবিত চিকিৎসা",
    suggestedPesticide: "প্রস্তাবিত কীটনাশক",
    treatment: "চিকিৎসা",
    plantCareAdvice: "গাছের যত্নের পরামর্শ",
    errorFetching: "প্রেসক্রিপশন আনতে সমস্যা হয়েছে",

     diseaseDict: {
        "Apple___Apple_scab": "আপেল – পাতায় দাগ রোগ",
        "Apple___Black_rot": "আপেল – কালো পঁচা রোগ",
        "Apple___Cedar_apple_rust": "আপেল – জং রোগ (সিডার রস্ট)",
        "Apple___healthy": "আপেল – সুস্থ",
        "Blueberry___healthy": "ব্লুবেরি – সুস্থ",
        "Cherry_(including_sour)___Powdery_mildew": "চেরি – পাতায় সাদা গুঁড়ার ছত্রাক",
        "Cherry_(including_sour)___healthy": "চেরি – সুস্থ",
        "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "ভুট্টা – পাতার সাদা/ধূসর দাগ",
        "Corn_(maize)___Common_rust_": "ভুট্টা – সাধারণ জং রোগ",
        "Corn_(maize)___Northern_Leaf_Blight": "ভুট্টা – পাতার পোড়া দাগ রোগ",
        "Corn_(maize)___healthy": "ভুট্টা – সুস্থ",
        "Grape___Black_rot": "আঙ্গুর – কালো পঁচা রোগ",
        "Grape___Esca_(Black_Measles)": "আঙ্গুর – কালো দাগ রোগ (এস্কা)",
        "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "আঙ্গুর – পাতার দাগ রোগ",
        "Grape___healthy": "আঙ্গুর – সুস্থ",
        "Orange___Haunglongbing_(Citrus_greening)": "কমলা – পাতায় হলদে দাগ রোগ (সাইট্রাস গ্রিনিং)",
        "Peach___Bacterial_spot": "পীচ – ব্যাকটেরিয়া দাগ",
        "Peach___healthy": "পীচ – সুস্থ",
        "Pepper,_bell___Bacterial_spot": "বেল মরিচ – ব্যাকটেরিয়া দাগ",
        "Pepper,_bell___healthy": "বেল মরিচ – সুস্থ",
        "Potato___Early_blight": "আলু – আগাম পচা রোগ",
        "Potato___Late_blight": "আলু – দেরিতে পচা রোগ (পটকা)",
        "Potato___healthy": "আলু – সুস্থ",
        "Raspberry___healthy": "রাস্পবেরি – সুস্থ",
        "Soybean___healthy": "সয়াবিন – সুস্থ",
        "Squash___Powdery_mildew": "স্কোয়াশ – পাতায় সাদা গুঁড়া ছত্রাক",
        "Strawberry___Leaf_scorch": "স্ট্রবেরি – পাতায় পোড়া দাগ",
        "Strawberry___healthy": "স্ট্রবেরি – সুস্থ",
        "Tomato___Bacterial_spot": "টমেটো – ব্যাকটেরিয়া দাগ",
        "Tomato___Early_blight": "টমেটো – আগাম পোড়া রোগ",
        "Tomato___Late_blight": "টমেটো – দেরিতে পোড়া রোগ",
        "Tomato___Leaf_Mold": "টমেটো – পাতার ছত্রাক রোগ",
        "Tomato___Septoria_leaf_spot": "টমেটো – সেপ্টোরিয়া দাগ",
        "Tomato___Spider_mites Two-spotted_spider_mite": "টমেটো – লাল মাকড় পোকা সংক্রমণ",
        "Tomato___Target_Spot": "টমেটো – লক্ষ্মণ চিহ্নযুক্ত দাগ",
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "টমেটো – হলুদ পাতার ভাঁজ ভাইরাস",
        "Tomato___Tomato_mosaic_virus": "টমেটো – মোজাইক ভাইরাস",
        "Tomato___healthy": "টমেটো – সুস্থ"        
    }
  }
};

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [language, setLanguage] = useState('en'); // en or bn

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setPrescriptionData(null);
      setShowPrescription(false);
    } else {
      setImage(null);
      setPreview(null);
      setResult(null);
      setPrescriptionData(null);
      setShowPrescription(false);
    }
  };

  // Fetch prescription details from API
  const fetchPrescription = async (diseaseName) => {
    try {
      const res = await fetch(`http://localhost:3000/diseases?diseaseName=${encodeURIComponent(diseaseName)}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || translations[language].errorFetching);
      }
      const data = await res.json();
      setPrescriptionData(data);
    } catch (error) {
      console.error("Prescription fetch error:", error.message);
      setPrescriptionData({ error: error.message });
    }
  };

  const handleDetect = async () => {
    if (!image) return;
    setLoading(true);
    setShowPrescription(false);
    setPrescriptionData(null);
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        if (data.prediction) {
          await fetchPrescription(data.prediction);
        }
      } else {
        setResult({
          error: data.error,
          confidence: null,
          prediction: null,
        });
      }
    } catch (error) {
      setResult(` Server error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Simple manual translation for prescription fields (only if backend sends only English)
  const translatePrescription = (data) => {
    if (!data) return null;
    if (language === 'bn') {
      // You can expand this dictionary or call an API for dynamic translation
      const dict = {
          // Pesticides
            "Mancozeb or Captan 50 WP": "ম্যানকোজেব বা ক্যাপটান ৫০ ডব্লিউপি",
            "Thiophanate-methyl or Captan": "থাইওফানেট-মিথাইল বা ক্যাপটান",
            "Myclobutanil or Propiconazole": "মাইকলোবুটানিল বা প্রোপিকোনাজোল",
            "None": "কোনও প্রয়োজন নেই",
            "Sulfur 80 WP or Potassium bicarbonate": "সালফার ৮০ ডব্লিউপি বা পটাশিয়াম বাইকার্বোনেট",
            "Strobilurin fungicides (Azoxystrobin) or Triazoles": "স্ট্রোবিলুরিন ফাঙ্গিসাইড (আজক্সিস্ট্রোবিন) বা ট্রিয়াজোল",
            "Azoxystrobin": "আজক্সিস্ট্রোবিন",
            "Propiconazole or Tebuconazole": "প্রোপিকোনাজোল বা টেবুকোনাজোল",
            "Chlorothalonil": "ক্লোরোথ্যালোনিল",
            "Imidacloprid (targets psyllid vector)": "ইমিডাক্লোপ্রিড (সাইলিড ভেক্টর লক্ষ্য করে)",
            "Copper hydroxide or Copper oxychloride": "কপার হাইড্রক্সাইড বা কপার অক্সিক্লোরাইড",
            "Copper hydroxide plus Mancozeb": "কপার হাইড্রক্সাইড এবং ম্যানকোজেব",
            "Metalaxyl or Mancozeb": "মেটালাক্সিল বা ম্যানকোজেব",
            "Sulfur or Neem oil": "সালফার বা নিম তেল",
            "Captan or Thiophanate-methyl": "ক্যাপটান বা থাইওফানেট-মিথাইল",
            "Copper hydroxide": "কপার হাইড্রক্সাইড",
            "Metalaxyl or Fluopicolide": "মেটালাক্সিল বা ফ্লুপিকোলাইড",
            "Sulfur or Copper-based fungicides": "সালফার বা কপার ভিত্তিক ফাঙ্গিসাইড",
            "Abamectin or Neem oil": "আবামেকটিন বা নিম তেল",
            "Imidacloprid": "ইমিডাক্লোপ্রিড",
            "Chlorothalonil or Mancozeb": "ক্লোরোথ্যালোনিল বা ম্যানকোজেব",
            "Myclobutanil or Mancozeb": "মাইকলোবুটানিল বা ম্যানকোজেব",

            // Treatments
            "Use resistant apple varieties; apply fungicide at bud break and repeat every 10–14 days during the growing season.":
              "প্রতিরোধী আপেল জাত ব্যবহার করুন; ফুল ফোটার সময় ফাঙ্গিসাইড প্রয়োগ করুন এবং প্রতি ১০-১৪ দিনে পুনরাবৃত্তি করুন।",
            "Remove mummified fruits and infected twigs; apply fungicide pre-bloom and during growing season.":
              "মৃত ফল এবং সংক্রমিত শাখা সরিয়ে ফেলুন; ফুল ফোটার আগে এবং বাড়ন্ত মরশুমে ফাঙ্গিসাইড প্রয়োগ করুন।",
            "Apply fungicide early in the spring; remove nearby cedar/juniper trees to reduce infection source.":
              "বসন্তের শুরুতেই ফাঙ্গিসাইড প্রয়োগ করুন; সংক্রমণের উৎস কমাতে কাছাকাছি সিডার/জুনিপার গাছ সরিয়ে ফেলুন।",
            "No treatment required. Maintain orchard hygiene.":
              "কোনও চিকিৎসার প্রয়োজন নেই। বাগানের পরিচ্ছন্নতা বজায় রাখুন।",
            "Maintain proper pruning and weed control.":
              "সঠিকভাবে ছাঁটাই এবং আগাছা নিয়ন্ত্রণ বজায় রাখুন।",
            "Apply sulfur-based fungicides and prune to improve airflow.":
              "সালফারভিত্তিক ফাঙ্গিসাইড প্রয়োগ করুন এবং বাতাস চলাচলের জন্য ছাঁটাই করুন।",
            "No treatment necessary; maintain good orchard practices.":
              "চিকিৎসার প্রয়োজন নেই; ভাল বাগান পরিচর্যা বজায় রাখুন।",
            "Practice crop rotation; apply fungicide at tasseling stage.":
              "ফসল পাল্টে লাগান; পুংফুল পর্যায়ে ফাঙ্গিসাইড প্রয়োগ করুন।",
            "Use resistant hybrids; apply fungicide if disease severity is high.":
              "প্রতিরোধী হাইব্রিড ব্যবহার করুন; রোগের মাত্রা বেশি হলে ফাঙ্গিসাইড প্রয়োগ করুন।",
            "Plant resistant varieties and use foliar fungicides under disease pressure.":
              "প্রতিরোধী জাত রোপণ করুন এবং রোগের চাপ থাকলে পাতা লাগানো ফাঙ্গিসাইড ব্যবহার করুন।",
            "Remove infected leaves; apply fungicide pre-bloom and during growing season.":
              "সংক্রমিত পাতা সরিয়ে ফেলুন; ফুল ফোটার আগে এবং বাড়ন্ত মরশুমে ফাঙ্গিসাইড প্রয়োগ করুন।",
            "No chemical control; remove and destroy infected vines.":
              "কোনও রাসায়নিক নিয়ন্ত্রণ নেই; সংক্রমিত লতা সরিয়ে নষ্ট করুন।",
            "Apply contact fungicides and improve canopy ventilation.":
              "কন্টাক্ট ফাঙ্গিসাইড প্রয়োগ করুন এবং গাছের ছত্রা বাতাস চলাচলের জন্য উন্নত করুন।",
            "No cure available; promptly remove infected trees to prevent spread.":
              "কোনও নিরাময় নেই; দ্রুত সংক্রমিত গাছ সরিয়ে ছড়ানো রোধ করুন।",
            "Use copper-based sprays; plant resistant varieties.":
              "কপার-ভিত্তিক স্প্রে ব্যবহার করুন; প্রতিরোধী জাত রোপণ করুন।",
            "Use disease-free seeds; apply copper-based sprays to manage bacterial spot.":
              "রোগমুক্ত বীজ ব্যবহার করুন; ব্যাকটেরিয়াল স্পট নিয়ন্ত্রণে কপার-ভিত্তিক স্প্রে প্রয়োগ করুন।",
            "Apply fungicides starting at flowering to prevent early blight.":
              "প্রস্ফুটনের সময় থেকে ফাঙ্গিসাইড প্রয়োগ শুরু করুন, আগাম ব্লাইট প্রতিরোধে।",
            "Use certified seed and systemic fungicides to prevent late blight.":
              "সার্টিফায়েড বীজ এবং সিস্টেমিক ফাঙ্গিসাইড ব্যবহার করুন, দেরী ব্লাইট প্রতিরোধে।",
            "Prune in early spring and monitor for pests.":
              "বসন্তের শুরুতে ছাঁটাই করুন এবং পোকামাকড় নজর রাখুন।",
            "Scout fields regularly for leaf spot and rust diseases.":
              "পাতার দাগ এবং জং রোগের জন্য নিয়মিত মাঠে নজর রাখুন।",
            "Apply fungicides at first signs of powdery mildew.":
              "পাতায় সাদা গুঁড়ো ছত্রাক রোগ লক্ষণ দেখা দিলে ফাঙ্গিসাইড প্রয়োগ করুন।",
            "Remove infected leaves and apply fungicides promptly.":
              "সংক্রমিত পাতা সরিয়ে দ্রুত ফাঙ্গিসাইড প্রয়োগ করুন।",
            "Apply copper sprays and rotate crops to manage bacterial spot.":
              "ব্যাকটেরিয়াল স্পট নিয়ন্ত্রণে কপার স্প্রে করুন এবং ফসল পাল্টে লাগান।",
            "Apply fungicide every 7–10 days; remove lower leaves to improve airflow.":
              "প্রতি ৭-১০ দিনে ফাঙ্গিসাইড প্রয়োগ করুন; বাতাস চলাচলের জন্য নিচের পাতা সরিয়ে ফেলুন।",
            "Use resistant varieties and apply systemic fungicides proactively.":
              "প্রতিরোধী জাত ব্যবহার করুন এবং সিস্টেমিক ফাঙ্গিসাইড আগেভাগেই প্রয়োগ করুন।",
            "Improve ventilation and apply sulfur or copper-based sprays.":
              "বাতাস চলাচল উন্নত করুন এবং গন্ধক বা কপার স্প্রে প্রয়োগ করুন।",
            "Spray neem oil or insecticidal soap to control spider mites.":
              "স্পাইডার মাইট নিয়ন্ত্রণে নিম তেল বা কীটনাশক সাবান স্প্রে করুন।",
            "Apply fungicides during early fruit set to prevent target spot.":
              "টার্গেট স্পট প্রতিরোধে শুরুতে ফাঙ্গিসাইড প্রয়োগ করুন।",
            "Use resistant varieties and control whitefly vectors.":
              "প্রতিরোধী জাত ব্যবহার করুন এবং হোয়াইটফ্লাই নিয়ন্ত্রণ করুন।",
            "Remove infected plants and sanitize tools to prevent spread.":
              "সংক্রমিত গাছ সরিয়ে ফেলুন এবং ছড়ানো রোধে সরঞ্জাম স্যানিটাইজ করুন।",
            "Regular pruning and fertilization to maintain tree health.":
              "গাছের সুস্থতা বজায় রাখতে নিয়মিত ছাঁটাই এবং সার প্রয়োগ করুন।",
            "Maintain good drainage and adequate sunlight.":
              "ভাল জল নিষ্কাশন এবং পর্যাপ্ত সূর্যালোক নিশ্চিত করুন।",
            "Maintain balanced fertilization and monitor plants weekly.":
              "সুষম সার প্রয়োগ করুন এবং সাপ্তাহিক গাছ পর্যবেক্ষণ করুন।",

            // Plant care advice
            "Spray 20 grams in 10 liters of water before bud break and repeat application every 10–14 days.":
              "ফুল ফোটার আগে ১০ লিটার পানিতে ২০ গ্রাম স্প্রে করুন এবং প্রতি ১০-১৪ দিনে পুনরায় প্রয়োগ করুন।",
            "Spray 25 grams per 10 liters of water every 7–14 days during pre-bloom and early season.":
              "প্রাক-ফুল এবং শুরুর মরশুমে প্রতি ১০ লিটার পানিতে ২৫ গ্রাম স্প্রে করুন, প্রতি ৭-১৪ দিনে।",
            "Spray every 10–14 days starting at bud swell until early summer.":
              "বাড ফুলে উঠা থেকে শুরু করে গ্রীষ্মের শুরু পর্যন্ত প্রতি ১০-১৪ দিনে স্প্রে করুন।",
            "Monitor regularly for early signs of disease.":
              "রোগের প্রাথমিক লক্ষণ নিয়মিত নজর রাখুন।",
            "Ensure adequate spacing and soil drainage.":
              "পর্যাপ্ত স্থান এবং মাটির জল নিষ্কাশন নিশ্চিত করুন।",
            "Spray early morning every 7–10 days starting at bud break.":
              "ফুল ফোটার সময় থেকে প্রতি ৭-১০ দিনে সকালবেলায় স্প্রে করুন।",
            "Continue regular monitoring.":
              "নিয়মিত পর্যবেক্ষণ চালিয়ে যান।",
            "Apply fungicide at tasseling and repeat if conditions favor disease.":
              "ট্যাসেলিং সময়ে ফাঙ্গিসাইড প্রয়োগ করুন এবং রোগের অনুকূল পরিস্থিতিতে পুনরায় স্প্রে করুন।",
            "Spray when rust pustules first appear and repeat every 7–14 days as needed.":
              "রস্ট পুষ্টুল প্রথম দেখা দিলে স্প্রে করুন এবং প্রয়োজন মতো প্রতি ৭-১৪ দিনে পুনরায় স্প্রে করুন।",
            "Scout fields regularly; apply fungicide at early signs of disease.":
              "মাঠ নিয়মিত পরীক্ষা করুন; রোগের প্রাথমিক লক্ষণ দেখলে ফাঙ্গিসাইড প্রয়োগ করুন।",
            "Spray every 7–10 days until berries reach pea size.":
              "বেড়ি মটর আকার পর্যন্ত প্রতি ৭-১০ দিনে স্প্রে করুন।",
            "Avoid pruning during wet weather to reduce spread.":
              "ভেজা আবহাওয়ায় ছাঁটাই এড়িয়ে ছড়ানো কমান।",
            "Begin spraying when new leaves emerge; repeat every 7–14 days if needed.":
              "নতুন পাতা বের হওয়ার সময় স্প্রে শুরু করুন; প্রয়োজন হলে প্রতি ৭-১৪ দিনে পুনরায় স্প্রে করুন।",
            "Apply systemic insecticide as per label instructions; maintain psyllid control programs.":
              "লেবেলের নির্দেশনা অনুযায়ী সিস্টেমিক কীটনাশক প্রয়োগ করুন; সাইলিড নিয়ন্ত্রণ প্রোগ্রাম বজায় রাখুন।",
            "Spray during early growing season; avoid overhead irrigation.":
              "বাড়ন্ত মরশুমের শুরুতে স্প্রে করুন; উপরে থেকে সেচ এড়ান।",
            "Spray every 7–10 days; avoid working in wet fields to prevent spread.":
              "প্রতি ৭-১০ দিনে স্প্রে করুন; ভেজা মাঠে কাজ এড়ান যাতে রোগ ছড়ানো না হয়।",
            "Spray every 7–10 days until disease pressure subsides; remove and destroy crop debris.":
              "রোগের চাপ কমা পর্যন্ত প্রতি ৭-১০ দিনে স্প্রে করুন; ফসলের অবশিষ্টাংশ সরিয়ে ধ্বংস করুন।",
            "Apply fungicide preventively in wet conditions; avoid overhead irrigation.":
              "ভেজা আবহাওয়ায় প্রতিরোধমূলক ফাঙ্গিসাইড প্রয়োগ করুন; উপরে থেকে সেচ এড়ান।",
            "Maintain good air circulation and remove diseased canes.":
              "ভাল বাতাস চলাচল নিশ্চিত করুন এবং সংক্রমিত ক্যান্স সরিয়ে ফেলুন।",
            "Practice crop rotation and field sanitation.":
              "ফসল পাল্টে লাগান এবং মাঠ পরিচ্ছন্নতা বজায় রাখুন।",
            "Spray every 7–10 days ensuring good airflow between plants.":
              "গাছের মাঝে ভাল বাতাস চলাচল নিশ্চিত করে প্রতি ৭-১০ দিনে স্প্রে করুন।",
            "Avoid wetting foliage during irrigation; spray every 7–14 days if needed.":
              "সেচের সময় পাতা ভিজানো থেকে বিরত থাকুন; প্রয়োজন হলে প্রতি ৭-১৪ দিনে স্প্রে করুন।",
            "Spray every 7–10 days during warm, wet conditions.":
              "উষ্ণ ও ভেজা আবহাওয়ায় প্রতি ৭-১০ দিনে স্প্রে করুন।",
            "Start spraying at first sign of disease and continue through season.":
              "রোগের প্রথম লক্ষণ দেখা দিলে স্প্রে শুরু করুন এবং সারা মরশুম ধরে চালিয়ে যান।",
            "Spray preventively especially during wet weather; avoid overhead irrigation.":
              "প্রতিরোধমূলক স্প্রে করুন বিশেষ করে ভেজা আবহাওয়ায়; উপরে থেকে সেচ এড়ান।",
            "Spray every 7–14 days; avoid wetting leaves while watering.":
              "প্রতি ৭-১৪ দিনে স্প্রে করুন; সেচের সময় পাতা ভেজানো থেকে বিরত থাকুন।",
            "Rotate crops and avoid overhead watering.":
              "ফসল পাল্টে লাগান এবং উপরে থেকে পানি দেওয়া এড়ান।",
            "Maintain high humidity and avoid water stress; spray every 7 days if infestation persists.":
              "উচ্চ আর্দ্রতা বজায় রাখুন এবং পানি সঙ্কট এড়ান; আক্রান্ত হলে প্রতি ৭ দিনে স্প্রে করুন।",
            "Remove and destroy infected leaves.":
              "সংক্রমিত পাতা সরিয়ে ধ্বংস করুন।",
            "Apply insecticide every 10–14 days; remove infected plants immediately.":
              "প্রতি ১০-১৪ দিনে কীটনাশক প্রয়োগ করুন; সংক্রমিত গাছ দ্রুত সরিয়ে ফেলুন।",
            "Control aphids; avoid smoking in the field.":
              "এফিড নিয়ন্ত্রণ করুন; মাঠে ধূমপান এড়ান।",
            "Ensure adequate watering and nutrient supply.":
              "পর্যাপ্ত পানি ও পুষ্টি সরবরাহ নিশ্চিত করুন।"
          };


      return {
        suggestedPesticide: dict[data.suggestedPesticide ] || data.suggestedPesticide ,
        treatment: dict[data.treatment ] || data.treatment ,
        plantCareAdvice: dict[data.plantCareAdvice ] || data.plantCareAdvice 
      };
    }
    return data; // if English, just return as is
  };

  const displayedPrescription = translatePrescription(prescriptionData);

  function convertToBanglaDigits(number) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().split('').map(d => (d === '.' ? '.' : banglaDigits[d])).join('');
}

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Language selector */}
      <div className="mb-4 flex justify-end">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-1"
        >
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
        </select>
      </div>

      <label className="block text-lg font-medium text-gray-700 mb-2">
        {translations[language].uploadLabel}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-6
                   file:rounded-full file:border-0
                   file:bg-green-100 file:text-green-700
                   hover:file:bg-green-200 transition mb-6"
      />

      {preview && (
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-sm rounded-xl shadow-lg mb-4 ring-1 ring-gray-300"
          />
          <button
            onClick={handleDetect}
            className="bg-green-600 text-white text-base font-medium px-6 py-2 rounded-full hover:bg-green-700 shadow-md transition"
            disabled={loading}
          >
            {loading ? translations[language].detectingButton : translations[language].detectButton}
          </button>

           {/* Prediction result and confidence */}
          {result && !result.error && (
            <div className="mt-4 text-center">
              <p>
                <strong>{translations[language].prediction}:</strong>{" "}
                <span className="text-black"> 
                {language === "bn"? translations.bn.diseaseDict[result.prediction] || result.prediction : result.prediction}</span>
              </p>

              {result?.confidence !== undefined && result?.confidence !== null && (
                <p>
                  <strong>{translations[language].confidence}:</strong>{" "}
                  <span className="text-black"> {language === "bn"
                  ? convertToBanglaDigits(result.confidence.toFixed(2))
                  : result.confidence.toFixed(2)}%</span>
                </p>
              )}

               {/* Prescription generate */}
              {!showPrescription && prescriptionData && !prescriptionData.error && (
                <button
                  onClick={() => setShowPrescription(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  {translations[language].generatePrescription}
                </button>
              )}

              {showPrescription && prescriptionData && !prescriptionData.error && (
                <div className="bg-gray-100 p-4 mt-4 rounded-md shadow text-left max-w-md mx-auto">
                  <h3 className="font-semibold text-green-700 mb-2">{translations[language].suggestedTreatment}</h3>
                  <p><strong>{translations[language].suggestedPesticide}:</strong> {displayedPrescription.suggestedPesticide}</p>
                  <p><strong>{translations[language].treatment}:</strong> {displayedPrescription.treatment}</p>
                  <p><strong>{translations[language].plantCareAdvice}:</strong> {displayedPrescription.plantCareAdvice}</p>
                </div>
              )}

              {prescriptionData?.error && (
                <p className="text-red-600 mt-4">{prescriptionData.error}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
