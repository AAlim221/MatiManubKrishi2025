// ✅ FILE: AllDiseaseAiinfo.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

function AllDiseaseAiinfo() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDisease, setEditDisease] = useState(null);
  const [language, setLanguage] = useState("en");
  const [editForm, setEditForm] = useState({});

  const t = {
    en: {
      add: "➕ Add Disease",
      title: "🦠 All AI Disease Information",
      search: "Search Disease",
      pesticide: "Suggested Pesticide",
      treatment: "Treatment",
      care: "Plant Care Advice",
      deleteSuccess: "Disease deleted successfully!",
      updateSuccess: "Disease updated successfully!",
      noMatch: "No matching disease found.",
      save: "💾 Save",
      cancel: "Cancel"
    },
    bn: {
      add: "➕ রোগ যোগ করুন",
      title: "🦠 সব রোগের তথ্য (AI ভিত্তিক)",
      search: "রোগ খুঁজুন",
      pesticide: "প্রস্তাবিত কীটনাশক",
      treatment: "চিকিৎসা",
      care: "গাছের যত্ন",
      deleteSuccess: "রোগ সফলভাবে মুছে ফেলা হয়েছে!",
      updateSuccess: "রোগ আপডেট সফল!",
      noMatch: "কোনও মিল খুঁজে পাওয়া যায়নি।",
      save: "💾 সংরক্ষণ করুন",
      cancel: "বাতিল"
    },
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const res = await axios.get("http://localhost:3000/diseases/all");
      setDiseases(res.data);
    } catch (err) {
      console.error("❌ Error fetching diseases:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this disease?")) {
      try {
        await axios.delete(`http://localhost:3000/diseases/${id}`);
        setDiseases((prev) => prev.filter((item) => item._id !== id));
        toast.success(t[language].deleteSuccess);
      } catch (error) {
        console.error("❌ Failed to delete:", error);
        toast.error("Failed to delete.");
      }
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Disease Info", 10, 10);
    diseases.forEach((d, i) => {
      doc.text(`${i + 1}. ${d.diseaseName}`, 10, 20 + i * 10);
    });
    doc.save("diseases.pdf");
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(diseases);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Diseases");
    XLSX.writeFile(wb, "diseases.xlsx");
  };

  const filteredDiseases = diseases.filter((d) =>
    d.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/diseases/${editDisease._id}`, editForm);
      toast.success(t[language].updateSuccess);
      setEditDisease(null);
      fetchDiseases();
    } catch (error) {
  console.error("❌ Failed to update disease:", error);
  toast.error("Failed to update.");
}

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 py-8">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <Link
            to="/admin/diseaseInfoAdd"
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700"
          >
            {t[language].add}
          </Link>

          <h1 className="text-3xl font-bold text-green-800 text-center flex-1">
            {t[language].title}
          </h1>

          <input
            type="text"
            placeholder={`🔍 ${t[language].search}`}
            className="px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-end mb-4 gap-4">
          <button onClick={handleExportPDF} className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            📄 Export PDF
          </button>
          <button onClick={handleExportExcel} className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            📊 Export Excel
          </button>
          <button
            onClick={() => setLanguage((prev) => (prev === "en" ? "bn" : "en"))}
            className="text-sm bg-green-200 px-3 py-1 rounded hover:bg-green-300"
          >
            🌐 {language === "en" ? "বাংলা" : "EN"}
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading diseases...</div>
        ) : filteredDiseases.length === 0 ? (
          <div className="text-center text-red-500">{t[language].noMatch}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDiseases.map((disease) => (
              <div
                key={disease._id}
                className="relative group bg-white border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditDisease(disease);
                      setEditForm(disease);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Disease"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(disease._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Disease"
                  >
                    🗑️
                  </button>
                </div>

                <h2 className="text-xl font-bold text-green-700 mb-2">
                  🦠 {disease.diseaseName.replace("___", " — ")}
                </h2>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>🧪 {t[language].pesticide}:</strong> {disease.suggestedPesticide || "N/A"}
                  </p>
                  <p>
                    <strong>🩺 {t[language].treatment}:</strong> {disease.treatment || "N/A"}
                  </p>
                  <p>
                    <strong>🌿 {t[language].care}:</strong> {disease.plantCareAdvice || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editDisease && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              onSubmit={handleEditSubmit}
              className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4"
            >
              <h2 className="text-xl font-bold">Edit Disease</h2>
              <input
                className="w-full border px-3 py-2"
                placeholder="Disease Name"
                value={editForm.diseaseName || ""}
                onChange={(e) => setEditForm({ ...editForm, diseaseName: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2"
                placeholder="Suggested Pesticide"
                value={editForm.suggestedPesticide || ""}
                onChange={(e) => setEditForm({ ...editForm, suggestedPesticide: e.target.value })}
              />
              <textarea
                className="w-full border px-3 py-2"
                placeholder="Treatment"
                value={editForm.treatment || ""}
                onChange={(e) => setEditForm({ ...editForm, treatment: e.target.value })}
              />
              <textarea
                className="w-full border px-3 py-2"
                placeholder="Plant Care Advice"
                value={editForm.plantCareAdvice || ""}
                onChange={(e) => setEditForm({ ...editForm, plantCareAdvice: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditDisease(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  {t[language].cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {t[language].save}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllDiseaseAiinfo;
