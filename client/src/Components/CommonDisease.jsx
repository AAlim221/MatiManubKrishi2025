import React, { useEffect, useState } from "react";
import axios from "axios";

const CommonDisease = ({ t }) => {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/common-diseases") // Replace with actual URL if deployed
      .then((res) => setDiseases(res.data))
      .catch((err) => console.error("❌ Failed to fetch diseases", err));
  }, []);

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          {t ? t("home.diseaseTitle") : "Common Plant Diseases"}
        </h2>

        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-4">
            {diseases.map((disease, idx) => (
              <div
                key={idx}
                className="min-w-[300px] max-w-[300px] flex-shrink-0 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                {disease.image && (
                  <img
                    src={disease.image}
                    alt={disease.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {disease.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {t
                    ? t("home.diseaseDescription", {
                        disease: disease.name.toLowerCase(),
                      })
                    : `Learn how to identify and treat ${disease.name.toLowerCase()} in your crops.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonDisease;
