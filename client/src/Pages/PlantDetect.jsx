import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";



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
    errorFetching: "Error fetching prescription",
    invalidImage: "❌ Invalid image. Please upload a valid and clear leaf !!!",
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
    invalidImage: "❌ ছবিটি সঠিক নয়। অনুগ্রহ করে পাতার ছবি আপলোড করুন !!!",
backendErrorDict : {
  "Not a plant leaf !": "❌ সঠিক পাতার ছবি আপলোড করুন !",
  "Please upload a clear plant leaf image !":"❌ পাতার একটি স্পষ্ট ছবি আপলোড করুন !",
  },
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
const getTranslatedBackendMessage = (message, language) => {
  if (!message) return "";
  return translations[language]?.backendErrorDict?.[message] || message;
};

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
   const [pdfUrl, setPdfUrl] = useState(null); 
  const [showPrescription, setShowPrescription] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [language, setLanguage] = useState('en'); // en or bn
  const [showModal, setShowModal] = useState(false);
   const printRef = useRef();
  const navigate = useNavigate();
  const [pdfBase64ForMarket, setPdfBase64ForMarket] = useState(null);
const [isLeaf, setIsLeaf] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setPrescriptionData(null);
      setShowPrescription(false);
      setIsLeaf(false); // Reset isLeaf on new upload
    } else {
      setImage(null);
      setPreview(null);
      setResult(null);
      setPrescriptionData(null);
      setShowPrescription(false);
      setIsLeaf(false);
    }
  };

  
  const handleDetect = async () => {
  setLoading(true);
  const formData = new FormData();
  formData.append('image', image);

  try {
    const res = await fetch('http://localhost:5050/predict', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      setResult(data);
      setPrescriptionData({
      suggestedPesticide: data.suggestedPesticide,
      treatment: data.treatment,
      plantCareAdvice: data.plantCareAdvice
    });
 // ✅ store isLeaf from backend
      setIsLeaf(data.isLeaf || false);

      // reset showPrescription so button logic works correctly
      setShowPrescription(false);
  }
     else {
      setResult({ error: data.error });
     setIsLeaf(false);
      setShowPrescription(false);
    }
  } catch (err) {
    setResult({ error: err.message });
   setIsLeaf(false);
    setShowPrescription(false);
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

const generatePDF = () => {
  console.log('printRef.current:', printRef.current);
  if (!displayedPrescription) return;

  // Clean up old blob URL if exists to avoid memory leaks
  if (pdfUrl) {
    URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
  }


  if (language === "bn") {
    if (!printRef.current) {
      alert("Bangla content not ready for PDF.");
      console.error("printRef.current is null");
      return;
    }
      const printElement = printRef.current;

    // Temporarily force background and text color for canvas rendering
    const originalBackground = printElement.style.backgroundColor;
    const originalColor = printElement.style.color;

    printElement.style.backgroundColor = "#ffffff";
    printElement.style.color = "#000000";

    html2canvas(printElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      allowTaint: true,
      logging: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const margin = 20;

      pdf.addImage(imgData, "PNG", margin, margin, pdfWidth - 2 * margin, pdfHeight);
        const pdfBlob = pdf.output("blob");
         // Convert blob to base64 for Market page
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64data = reader.result.split(",")[1];
    setPdfBase64ForMarket(base64data);
  };
  reader.readAsDataURL(pdfBlob);
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url); //  for preview
        setShowModal(true); //  open modal
        pdf.save("plant_disease_prescription_bn.pdf");
        printElement.style.backgroundColor = originalBackground;
        printElement.style.color = originalColor;


    }).catch((err) => {
      console.error("PDF Generation Error in Bangla mode:", err);
      alert("Failed to generate Bangla PDF. Please try again.");
    });

  }else {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica");
      doc.setFontSize(16);
      doc.text(translations[language].suggestedTreatment, 10, 20);
      doc.setFontSize(12);
      const lineHeight = 10;
      let y = 40;
      const maxWidth = 180; // you can adjust width as needed

      // Suggested Pesticide
      const pesticideText = `${translations[language].suggestedPesticide}: ${displayedPrescription.suggestedPesticide || "-"}`;
      const pesticideLines = doc.splitTextToSize(pesticideText, maxWidth);
      pesticideLines.forEach(line => {
        doc.text(line, 10, y);
        y += lineHeight;
      });
      y += lineHeight; // extra spacing after block

      // Treatment
      const treatmentText = `${translations[language].treatment}: ${displayedPrescription.treatment || "-"}`;
      const treatmentLines = doc.splitTextToSize(treatmentText, maxWidth);
      treatmentLines.forEach(line => {
        doc.text(line, 10, y);
        y += lineHeight;
      });
      y += lineHeight;

      // Plant Care Advice
      const adviceText = `${translations[language].plantCareAdvice}: ${displayedPrescription.plantCareAdvice || "-"}`;
      const adviceLines = doc.splitTextToSize(adviceText, maxWidth);
      adviceLines.forEach(line => {
        doc.text(line, 10, y);
        y += lineHeight;
      });
      y += lineHeight;

     
      // Create blob & URL for preview
      const pdfBlob = doc.output("blob");
const url = URL.createObjectURL(pdfBlob);
setPdfUrl(url);

// generate base64 string to pass to Market
const pdfBase64 = doc.output("datauristring").split(",")[1];

setShowModal(true);

// save if needed
doc.save("plant_disease_prescription.pdf");

// store in state so you can use it in the button click
setPdfBase64ForMarket(pdfBase64);

    } catch (error) {
      console.error("English PDF Generation Error:", error);
      alert("Failed to generate English PDF.");
    }
  }
};


  function convertToBanglaDigits(number) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().split('').map(d => (d === '.' ? '.' : banglaDigits[d])).join('');
}
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden">

    {/* Fullscreen video background */}
  <div className="fixed inset-0 z-0 overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      style={{ filter: 'blur(4px) brightness(0.75)' }}
    >
      <source src="https://cdn.pixabay.com/video/2016/11/13/6338-191338827_large.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

    {/* Main content container */}
  <div className="relative w-full max-w-6xl h-[2000px] mx-auto rounded-3xl p-10 shadow-2xl backdrop-blur-md bg-white/80 z-10 overflow-y-auto overflow-x-hidden">



        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>

        {/* Upload Label */}
        <label className="block text-3xl font-extrabold text-green-900 mb-6 tracking-wide flex items-center gap-3 select-none
          drop-shadow-md
          bg-gradient-to-r from-green-900 to-green-200 bg-clip-text
          ">
          {translations[language].uploadLabel}
          <FaLeaf className="text-green-900 text-2xl animate-pulse" />
        </label>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-gray-700 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:bg-green-800 file:text-green-200 hover:file:bg-green-700 transition mb-6"
        />

        {/* Preview & Detection */}
        {preview && (
          <div className="flex flex-col items-center space-y-6  w-full max-w-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-sm rounded-xl shadow-lg border border-gray-200 max-w-full object-contain"
            />

            <button
              onClick={handleDetect}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 shadow-md transition disabled:bg-green-400"
              disabled={loading}
            >
              {loading
                ? translations[language].detectingButton
                : translations[language].detectButton}
            </button>

            {/* Result Display */}
            {result && !result.error && (
              <div className="w-full bg-gray-50 rounded-xl p-6 shadow-inner border border-gray-200 text-center min-h-[400px]">
                {isLeaf ? ( 
                  // ✅ Changed: Only show prediction + prescription if isLeaf true
                  <>
                    <p className="text-lg font-semibold text-gray-900">{translations[language].prediction}:</p>
                    <p className="text-2xl text-green-700 font-bold mb-2">
                      {language === "bn"
                        ? translations.bn.diseaseDict[result.prediction] || result.prediction
                        : result.prediction}
                    </p>
                {result?.confidence !== undefined && (
                  <p className="text-gray-700 mb-4">
                    {translations[language].confidence}:{" "}
                    <span className="font-medium text-black">
                      {language === "bn"
                        ? convertToBanglaDigits(result.confidence.toFixed(2))
                        : result.confidence.toFixed(2)}
                      %
                    </span>
                  </p>
                )}

                {/* Prescription Button */}
                 {!showPrescription && prescriptionData && (
                      <button onClick={() => setShowPrescription(true)} className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
                        {translations[language].generatePrescription}
                      </button>
                    )}
                  </>
                ) : (
                  //  Show message if not a leaf
                 <p className="text-red-600 text-xl font-semibold">
  {result.message 
     ? getTranslatedBackendMessage(result.message, language) 
     : translations[language].invalidImage
  }
</p>

                )}

              {/* Prescription Display */}
                {showPrescription && isLeaf && (
                  <>
                    <div
                      ref={printRef}
                      style={{
                        backgroundColor: "white",
                        padding: "1.5rem",
                        borderRadius: "0.75rem",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        fontFamily:
                          language === "bn"
                            ? "'Noto Sans Bengali', sans-serif"
                            : "Arial, sans-serif",
                        color: "#111",
                        marginTop: "1.5rem",
                        minHeight: "400px", 
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: "700",
                          color: "#15803d",
                          fontSize: "2rem",
                           margin: "2rem 0 2rem",
                        }}
                      >
                        {translations[language].suggestedTreatment}
                      </h3>
                      <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem"}}>
                       <strong>{translations[language].suggestedPesticide}:</strong>{" "}
                       {displayedPrescription.suggestedPesticide}
                      </p>
                      <p style={{  fontSize: "1.25rem",marginBottom: "0.5rem" }}>
                        <strong>{translations[language].treatment}:</strong>{" "}
                        {displayedPrescription.treatment}
                      </p>
                      <p style={{ fontSize: "1.25rem" }}>
                        <strong>{translations[language].plantCareAdvice}:</strong>{" "}
                        {displayedPrescription.plantCareAdvice}
                      </p>
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        onClick={generatePDF}
                        style={{
                          backgroundColor: "#15803d",
                          color: "white",
                          padding: "0.75rem 2rem",
                          borderRadius: "0.75rem",
                          fontWeight: "600",
                          marginTop: "1rem",
                          cursor: "pointer",
                        }}
                      >
                        {language === "bn"
                          ? "পিডিএফ ডাউনলোড করুন"
                          : "Generate PDF"}
                      </button>
                    </div>
                  </>
                )}

              {/* Error Message */}
              {prescriptionData?.error && (
                <p className="mt-6 text-red-600 font-semibold">
                  {prescriptionData.error}
                </p>
              )}

              {/* PDF Modal */}
                {showModal && pdfUrl && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-3xl">
                    <div className="bg-white w-[50vw] h-[80vh] rounded-3xl shadow-2xl p-8 relative flex flex-col border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">📄 PDF Preview</h2>
                        <button
                          onClick={() => setShowModal(false)}
                          className="text-red-500 hover:text-red-700 text-3xl leading-none"
                        >
                          &times;
                        </button>
                      </div>

                      <iframe
                        src={pdfUrl}
                        title="PDF Preview"
                        className="flex-1 w-full rounded-lg border"
                      />

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => {
                            setShowModal(false);
                            navigate("/market", {
                            state: {
                              pdfBase64: pdfBase64ForMarket,
                              language: language,
                            },
                          });
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                        >
                          🛍 Go to Market
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;