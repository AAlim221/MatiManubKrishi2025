from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os
import uuid
from pymongo import MongoClient
from dotenv import load_dotenv
import cv2

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Directory to save uploaded images
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load trained Keras model
model = tf.keras.models.load_model("trained_model.h5")

# MongoDB connection
MONGO_USER = os.environ.get("DB_USER")
MONGO_PASS = os.environ.get("DB_PASS")
mongo_uri = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.ygjzcip.mongodb.net/MatiManubKrishi?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client["MatiManubKrishi"]
disease_collection = db["DiseaseInfo"]

# Class names used by model
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

def strong_leaf_check(image_path, min_leaf_ratio=0.12, min_green_ratio=0.50, min_edge_ratio=0.01, min_leaf_pixels=1500):
    """
    Robust leaf detection function.
    
    Parameters:
    - image_path: Path to the image to check
    - min_leaf_ratio: Minimum proportion of the image covered by leaf pixels
    - min_green_ratio: Minimum proportion of green pixels in the leaf area
    - min_edge_ratio: Minimum proportion of edges to detect tiny/noisy leaves
    - min_leaf_pixels: Minimum number of leaf pixels required

    Returns:
    - True if image passes as a leaf, False otherwise
    """

    # 1️⃣ Load image and resize to 128x128 for consistent processing
    img = cv2.imread(image_path)
    img = cv2.resize(img, (128, 128))

    # 2️⃣ Convert image to HSV color space for easier color segmentation
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # 3️⃣ Create color masks for typical leaf colors (green, yellow, brown)
    mask_green = cv2.inRange(hsv, np.array([25, 40, 40]), np.array([90, 255, 255]))
    mask_yellow = cv2.inRange(hsv, np.array([10, 40, 40]), np.array([35, 255, 255]))
    mask_brown = cv2.inRange(hsv, np.array([5, 30, 20]), np.array([30, 255, 200]))

    # Combine masks to form a leaf mask
    leaf_mask = mask_green | mask_yellow | mask_brown

    # 4️⃣ Convert to grayscale and blur for contour detection
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # Apply Otsu's threshold to get binary image
    _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # 5️⃣ Find contours in the thresholded image
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # If contours exist, focus on the largest one (assumed to be the main leaf)
    if contours:
        largest_contour = max(contours, key=cv2.contourArea)
        mask_obj = np.zeros_like(gray)
        cv2.drawContours(mask_obj, [largest_contour], -1, 255, -1)

        # Apply largest contour mask to the leaf mask and green mask
        leaf_mask = cv2.bitwise_and(leaf_mask, leaf_mask, mask=mask_obj)
        mask_green = cv2.bitwise_and(mask_green, mask_green, mask=mask_obj)

    # 6️⃣ Count pixels
    leaf_pixels = np.sum(leaf_mask > 0)           # Total leaf-colored pixels
    green_pixels = np.sum(mask_green > 0)        # Green pixels inside leaf
    total_pixels = leaf_mask.size                 # Total pixels in image

    # 7️⃣ Compute ratios
    leaf_ratio = leaf_pixels / total_pixels if total_pixels > 0 else 0     # Leaf coverage
    green_ratio = green_pixels / leaf_pixels if leaf_pixels > 0 else 0    # Green proportion in leaf

    # 8️⃣ Edge detection using Canny
    edges = cv2.Canny(gray, 100, 200)
    if contours:
        edges = cv2.bitwise_and(edges, edges, mask=mask_obj)
    edge_ratio = np.sum(edges > 0) / total_pixels   # Proportion of edges in image

    # 9️⃣ Print debug info
    print(f"🍃 Leaf ratio: {leaf_ratio:.2f}, 🟢 Green ratio: {green_ratio:.2f}, ✂️ Edge ratio: {edge_ratio:.2f}, 🌿 Pixels: {leaf_pixels}")

    # 1️⃣0️⃣ Decision rules for detecting leaf
    if leaf_pixels < min_leaf_pixels:         # Reject if leaf area too small
        return False

    if leaf_ratio < min_leaf_ratio:           # Reject if leaf covers too little of the image
        return False

    if green_ratio < min_green_ratio:         # Reject if not enough green → probably not a leaf
        return False

    # Reject only if edge ratio is extremely low AND leaf is very tiny (noise filtering)
    if edge_ratio < min_edge_ratio and leaf_ratio < 0.10:
        return False

    # Passes all checks → it is a leaf
    return True

def preprocess_image(image_path):
    """
    Preprocess image for the CNN model and predict disease.
    Returns:
        result_index: predicted class index
        confidence: predicted confidence in %
    """
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(img)
    input_arr = np.expand_dims(input_arr, axis=0)
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    confidence = float(np.max(prediction)) * 100
    return result_index, confidence

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        # Save uploaded image
        file = request.files["image"]
        filename = f"{uuid.uuid4()}.jpg"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Leaf detection
        leaf_pass = strong_leaf_check(filepath)
        if not leaf_pass:
            return jsonify({"message": "Not a plant leaf !", "isLeaf": False}), 200

        # Disease prediction
        result_index, confidence = preprocess_image(filepath)

        # Confidence check
        if confidence < 52.0:
            return jsonify({"message": "Please upload a clear plant leaf image !", "isLeaf": False}), 200

        predicted_disease = class_name[result_index]

        # Lookup disease info in MongoDB
        disease_data = disease_collection.find_one({"diseaseName": predicted_disease})
        if disease_data:
            disease_data.pop("_id", None)
        else:
            disease_data = {"suggestedPesticide": "-", "treatment": "-", "plantCareAdvice": "-"}

        # Return results
        return jsonify({
            "prediction": predicted_disease,
            "confidence": confidence,
            "suggestedPesticide": disease_data.get("suggestedPesticide", "-"),
            "treatment": disease_data.get("treatment", "-"),
            "plantCareAdvice": disease_data.get("plantCareAdvice", "-"),
            "isLeaf": True
        }), 200

    except Exception as e:
        print("🔥 Exception:", str(e))
        return jsonify({"error": str(e), "isLeaf": False}), 500

# Health check endpoint
@app.route("/")
def home():
    return "🌱 Flask Prediction Server Running"

if __name__ == "__main__":
    app.run(debug=True, port=5050)
