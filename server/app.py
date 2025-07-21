from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import os
import uuid
import json


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model
model = tf.keras.models.load_model("trained_model.h5")

# Load disease-solution data
with open("DiseaseData/Disease_Soln.json", "r") as f:
    disease_solutions = json.load(f)

def preprocess_image(image_path):
    img = tf.keras.preprocessing.image.load_img(image_path,target_size=(128,128))
    input_arr =tf.keras.preprocessing.image.img_to_array(img)
    #convert image into batch
    input_arr=np.array([input_arr])
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    confidence = np.max(prediction) * 100
    return  result_index,confidence

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filename = f"{uuid.uuid4()}.jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        result_index,confidence = preprocess_image(filepath)
        #Define class
        class_name=['Apple___Apple_scab',
        'Apple___Black_rot',
        'Apple___Cedar_apple_rust',
        'Apple___healthy',
        'Blueberry___healthy',
        'Cherry_(including_sour)___Powdery_mildew',
        'Cherry_(including_sour)___healthy',
        'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
        'Corn_(maize)___Common_rust_',
        'Corn_(maize)___Northern_Leaf_Blight',
        'Corn_(maize)___healthy',
        'Grape___Black_rot',
        'Grape___Esca_(Black_Measles)',
        'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
        'Grape___healthy',
        'Orange___Haunglongbing_(Citrus_greening)',
        'Peach___Bacterial_spot',
        'Peach___healthy',
        'Pepper,_bell___Bacterial_spot',
        'Pepper,_bell___healthy',
        'Potato___Early_blight',
        'Potato___Late_blight',
        'Potato___healthy',
        'Raspberry___healthy',
        'Soybean___healthy',
        'Squash___Powdery_mildew',
        'Strawberry___Leaf_scorch',
        'Strawberry___healthy',
        'Tomato___Bacterial_spot',
        'Tomato___Early_blight',
        'Tomato___Late_blight',
        'Tomato___Leaf_Mold',
        'Tomato___Septoria_leaf_spot',
        'Tomato___Spider_mites Two-spotted_spider_mite',
        'Tomato___Target_Spot',
        'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
        'Tomato___Tomato_mosaic_virus',
        'Tomato___healthy']


        solution =  disease_solutions.get(class_name[result_index], {
        "prescription": "No data available.",
        "pesticide": "Unknown",
        "application_instructions": "Try manual inspection."
        })

        return jsonify({
            "prediction": class_name[result_index],
            "confidence": float(round(confidence, 4)),
            "prescription": solution["prescription"],
            "pesticide": solution["pesticide"],
            "application_instructions": solution["application_instructions"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def home():
    return "Flask is running "

if __name__ == "__main__":
    app.run(debug=True, port=5000)
