from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os
import uuid
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS configuration
CORS(app,
     resources={r"/*": {"origins": "http://localhost:5173"}},
     supports_credentials=True,
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"]
)

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load trained model
model = tf.keras.models.load_model("trained_model.h5")

# MongoDB connection
MONGO_USER = os.environ.get("DB_USER")
MONGO_PASS = os.environ.get("DB_PASS")

mongo_uri = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.ygjzcip.mongodb.net/MatiManubKrishi?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client["MatiManubKrishi"]
disease_collection = db["DiseaseInfo"]

# Disease class names
class_name = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust',
    'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
    'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Preprocess function
def preprocess_image(image_path):
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(img)
    input_arr = np.expand_dims(input_arr, axis=0)
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    confidence = float(np.max(prediction)) * 100
    return result_index, confidence

# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]
        filename = f"{uuid.uuid4()}.jpg"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        result_index, confidence = preprocess_image(filepath)
        predicted_disease = class_name[result_index]
        print("Predicted Disease:", predicted_disease)

        disease_data = disease_collection.find_one({"diseaseName": predicted_disease})
        print("Disease data from DB:", disease_data)

        if disease_data is None:
            return jsonify({
                "prediction": predicted_disease,
                "confidence": confidence,
                "suggestedPesticide": "-",
                "treatment": "-",
                "plantCareAdvice": "-"
            }), 200

        # Remove MongoDB ObjectId before returning
        disease_data.pop("_id", None)

        return jsonify({
            "prediction": predicted_disease,
            "confidence": confidence,
            "suggestedPesticide": disease_data.get("suggestedPesticide", "-"),
            "treatment": disease_data.get("treatment", "-"),
            "plantCareAdvice": disease_data.get("plantCareAdvice", "-")
        }), 200

    except Exception as e:
        print("🔥 Exception:", str(e))
        return jsonify({"error": str(e)}), 500

# Test route
@app.route("/")
def home():
    return "Flask Prediction Server Running"

# Run the server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
